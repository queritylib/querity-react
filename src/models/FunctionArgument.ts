/**
 * Represents a valid argument for function calls in Querity.
 *
 * This interface restricts what can be passed to functions:
 * - PropertyExpression - property references and nested function calls
 * - Literal - literal values (strings, numbers, booleans)
 */
export interface FunctionArgument {
  /**
   * Type discriminator for FunctionArgument implementations.
   */
  readonly argumentType: "property" | "function" | "literal";
}
