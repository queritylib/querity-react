import { Function, FUNCTION_METADATA, getMinimumArguments, isNullary, isVariadic } from "./Function";
import { FunctionArgument } from "./FunctionArgument";
import { PropertyExpression, isPropertyExpression } from "./PropertyExpression";
import { Literal } from "./Literal";

/**
 * Represents a function call in the Querity query language.
 *
 * A FunctionCall consists of:
 * - `function` - the function to invoke (from Function enum)
 * - `arguments` - the arguments to pass to the function
 *
 * Arguments can be:
 * - PropertyReference - a reference to a property/field
 * - FunctionCall - a nested function call
 * - Literal - literal values (strings, numbers, booleans)
 */
export class FunctionCall implements PropertyExpression {
  readonly argumentType = "function" as const;

  constructor(
    public readonly func: Function,
    public readonly args: FunctionArgument[] = [],
    public readonly alias?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (isNullary(this.func) && this.args.length > 0) {
      throw new Error(
        `Function ${this.func} does not accept any arguments, but ${this.args.length} were provided`
      );
    }

    const metadata = FUNCTION_METADATA[this.func];
    if (!isVariadic(this.func) && !isNullary(this.func) && this.args.length !== metadata.argumentCount) {
      throw new Error(
        `Function ${this.func} requires ${metadata.argumentCount} argument(s), but ${this.args.length} were provided`
      );
    }

    if (isVariadic(this.func)) {
      const minArgs = getMinimumArguments(this.func);
      if (this.args.length < minArgs) {
        throw new Error(
          `Function ${this.func} requires at least ${minArgs} argument(s), but ${this.args.length} were provided`
        );
      }
    }
  }

  /**
   * Creates a FunctionCall with the given function and arguments.
   */
  static of(func: Function, ...args: FunctionArgument[]): FunctionCall {
    return new FunctionCall(func, args);
  }

  /**
   * Creates a copy of this FunctionCall with the given alias.
   */
  as(alias: string): FunctionCall {
    return new FunctionCall(this.func, this.args, alias);
  }

  /**
   * Checks if this function call has an alias.
   */
  hasAlias(): boolean {
    return this.alias !== undefined && this.alias.length > 0;
  }

  toExpressionString(): string {
    if (isNullary(this.func)) {
      return this.func;
    }
    const argsString = this.args.map((arg) => this.argumentToString(arg)).join(", ");
    const expression = `${this.func}(${argsString})`;
    return this.hasAlias() ? `${expression} AS ${this.alias}` : expression;
  }

  private argumentToString(arg: FunctionArgument): string {
    if (isPropertyExpression(arg)) {
      return arg.toExpressionString();
    }
    if (arg instanceof Literal) {
      return arg.toString();
    }
    return String(arg);
  }
}
