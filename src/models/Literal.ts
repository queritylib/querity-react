import { FunctionArgument } from "./FunctionArgument";

/**
 * Represents a literal value for use in function arguments.
 *
 * Literal values can be strings, numbers, or booleans.
 */
export class Literal implements FunctionArgument {
  readonly argumentType = "literal" as const;

  constructor(public readonly value: string | number | boolean) {}

  /**
   * Creates a Literal wrapping the given value.
   */
  static of(value: string | number | boolean): Literal {
    return new Literal(value);
  }

  toString(): string {
    if (typeof this.value === "string") {
      return `"${this.value}"`;
    }
    return String(this.value);
  }
}
