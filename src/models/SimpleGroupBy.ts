import { PropertyExpression } from "./PropertyExpression";
import { PropertyReference } from "./PropertyReference";
import { GroupBy } from "./GroupBy";

/**
 * Represents a GROUP BY clause with property names and/or expressions.
 *
 * A SimpleGroupBy can contain:
 * - Simple property names (e.g., "category", "address.city")
 * - PropertyExpression for function-based grouping (e.g., UPPER(category), YEAR(orderDate))
 * - Both property names and expressions combined
 */
export class SimpleGroupBy implements GroupBy {
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
   * Creates a SimpleGroupBy with the given property names.
   */
  static of(...propertyNames: string[]): SimpleGroupBy {
    return new SimpleGroupBy(propertyNames, []);
  }

  /**
   * Creates a SimpleGroupBy with the given expressions.
   */
  static ofExpressions(...expressions: PropertyExpression[]): SimpleGroupBy {
    return new SimpleGroupBy([], expressions);
  }

  /**
   * Check if this group by uses expressions.
   */
  hasExpressions(): boolean {
    return this._expressions.length > 0;
  }

  /**
   * Check if this group by uses property names.
   */
  hasPropertyNames(): boolean {
    return this._propertyNames.length > 0;
  }

  /**
   * Get all grouping criteria as PropertyExpressions.
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
}
