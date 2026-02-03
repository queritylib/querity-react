import { PropertyExpression } from "./PropertyExpression";
import { PropertyReference } from "./PropertyReference";
import { FunctionCall } from "./FunctionCall";
import { Select } from "./Select";

/**
 * Represents a selection of properties or expressions for projection queries.
 *
 * A SimpleSelect can contain:
 * - Simple property names (e.g., "firstName", "address.city")
 * - PropertyExpression for function-based projections (e.g., UPPER(name), COUNT(id))
 * - Both property names and expressions combined
 */
export class SimpleSelect implements Select {
  private readonly _propertyNames: string[];
  private readonly _expressions: PropertyExpression[];

  constructor(propertyNames?: string[], expressions?: PropertyExpression[]) {
    this._propertyNames = propertyNames ?? [];
    this._expressions = expressions ?? [];

    if (this._propertyNames.length === 0 && this._expressions.length === 0) {
      throw new Error("Either propertyNames or expressions must be set");
    }
  }

  /**
   * Returns a copy of the property names list.
   */
  get propertyNames(): string[] {
    return [...this._propertyNames];
  }

  /**
   * Returns a copy of the expressions list.
   */
  get expressions(): PropertyExpression[] {
    return [...this._expressions];
  }

  /**
   * Creates a SimpleSelect with the given property names.
   */
  static of(...propertyNames: string[]): SimpleSelect {
    return new SimpleSelect(propertyNames, []);
  }

  /**
   * Creates a SimpleSelect with the given expressions.
   */
  static ofExpressions(...expressions: PropertyExpression[]): SimpleSelect {
    return new SimpleSelect([], expressions);
  }

  /**
   * Check if this select uses expressions.
   */
  hasExpressions(): boolean {
    return this._expressions.length > 0;
  }

  /**
   * Check if this select uses property names.
   */
  hasPropertyNames(): boolean {
    return this._propertyNames.length > 0;
  }

  /**
   * Get all selections as PropertyExpressions.
   * Combines both propertyNames (converted to PropertyReferences) and expressions
   * into a single list.
   *
   * Ordering: PropertyNames come first (in their original order),
   * followed by expressions (in their original order).
   */
  getEffectiveExpressions(): PropertyExpression[] {
    const result: PropertyExpression[] = [];

    // Add property names as PropertyReferences
    for (const name of this._propertyNames) {
      result.push(PropertyReference.of(name));
    }

    // Add expressions
    result.push(...this._expressions);

    return result;
  }

  /**
   * Get the alias names for all selections.
   * For expressions with aliases, returns the alias. For property names or
   * expressions without aliases, returns the property name or a generated name.
   */
  getAliasNames(): string[] {
    const result: string[] = [];

    // Add property names directly as aliases
    result.push(...this._propertyNames);

    // Add expression aliases
    for (const expr of this._expressions) {
      result.push(this.getExpressionAlias(expr));
    }

    return result;
  }

  private getExpressionAlias(expr: PropertyExpression): string {
    if (expr instanceof FunctionCall && expr.hasAlias()) {
      return expr.alias!;
    }
    if (expr instanceof PropertyReference) {
      if (expr.hasAlias()) {
        return expr.alias!;
      }
      return expr.propertyName;
    }
    // For function calls without alias, generate a name
    return expr.toExpressionString().replace(/[^a-zA-Z0-9]/g, "_");
  }
}
