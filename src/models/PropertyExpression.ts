import { FunctionArgument } from "./FunctionArgument";

/**
 * Marker interface for property expressions that can be used in conditions, sorts, and selects.
 *
 * A PropertyExpression represents either:
 * - A simple property reference (e.g., "lastName", "address.city") via PropertyReference
 * - A function call (e.g., "UPPER(lastName)", "LENGTH(name)") via FunctionCall
 */
export interface PropertyExpression extends FunctionArgument {
  /**
   * Returns a string representation of this expression.
   */
  toExpressionString(): string;
}

/**
 * Type guard to check if a value is a PropertyExpression.
 */
export function isPropertyExpression(value: unknown): value is PropertyExpression {
  return (
    value !== null &&
    typeof value === "object" &&
    "toExpressionString" in value &&
    typeof (value as PropertyExpression).toExpressionString === "function"
  );
}
