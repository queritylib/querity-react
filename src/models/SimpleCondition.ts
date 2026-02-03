import { Operator } from "./Operator";
import { PropertyExpression } from "./PropertyExpression";
import { PropertyReference } from "./PropertyReference";
import { FieldReference, isFieldReference } from "./FieldReference";

/**
 * Set of operators that don't support field-to-field comparison.
 */
const FIELD_REFERENCE_UNSUPPORTED_OPERATORS = new Set([
  Operator.STARTS_WITH,
  Operator.ENDS_WITH,
  Operator.CONTAINS,
  Operator.IS_NULL,
  Operator.IS_NOT_NULL,
  Operator.IN,
  Operator.NOT_IN,
]);

/**
 * Represents a simple filter condition comparing a property or expression to a value or another field.
 *
 * A SimpleCondition consists of:
 * - `propertyName` - the property/field to filter on (supports nested paths like "address.city")
 * - `leftExpression` - alternatively, a PropertyExpression for function-based filtering
 * - `operator` - the comparison operator (defaults to EQUALS)
 * - `value` - the value to compare against, or a FieldReference for field-to-field comparisons
 */
export class SimpleCondition {
  /**
   * The property name for simple property-based conditions.
   * Either this or `leftExpression` must be set, but not both.
   */
  public readonly propertyName?: string;

  /**
   * The left-side expression for function-based conditions.
   * Either this or `propertyName` must be set, but not both.
   */
  public readonly leftExpression?: PropertyExpression;

  public readonly operator: Operator;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly value?: any[] | any | FieldReference;

  constructor(
    propertyNameOrExpression: string | PropertyExpression,
    operator: Operator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any[] | any | FieldReference
  ) {
    if (typeof propertyNameOrExpression === "string") {
      this.propertyName = propertyNameOrExpression;
      this.leftExpression = undefined;
    } else {
      // If it's a PropertyReference, extract the property name for backward compatibility
      if (propertyNameOrExpression instanceof PropertyReference) {
        this.propertyName = propertyNameOrExpression.propertyName;
        this.leftExpression = undefined;
      } else {
        this.propertyName = undefined;
        this.leftExpression = propertyNameOrExpression;
      }
    }

    this.operator = operator;
    this.value = value;
    this.validate();
  }

  private validate(): void {
    if (this.propertyName === undefined && this.leftExpression === undefined) {
      throw new Error("Either propertyName or leftExpression must be set");
    }

    if (this.operator.requiredValuesCount !== this.getValuesCount()) {
      throw new Error(
        `The operator ${this.operator.name} requires ${this.operator.requiredValuesCount} value(s)`
      );
    }

    if (
      isFieldReference(this.value) &&
      FIELD_REFERENCE_UNSUPPORTED_OPERATORS.has(this.operator)
    ) {
      throw new Error(
        `The operator ${this.operator.name} does not support field-to-field comparison`
      );
    }
  }

  private getValuesCount(): number {
    return this.value === null || this.value === undefined ? 0 : 1;
  }

  /**
   * Check if this condition uses a function expression on the left side.
   */
  hasLeftExpression(): boolean {
    return this.leftExpression !== undefined;
  }

  /**
   * Get the effective left-side expression.
   * If a leftExpression is set, returns it. Otherwise, wraps the propertyName
   * in a PropertyReference.
   */
  getEffectiveLeftExpression(): PropertyExpression {
    return this.leftExpression ?? PropertyReference.of(this.propertyName!);
  }

  /**
   * Check if the value is a reference to another field.
   */
  isFieldReference(): boolean {
    return isFieldReference(this.value);
  }

  /**
   * Get the value as a FieldReference.
   */
  getFieldReference(): FieldReference | undefined {
    return this.isFieldReference() ? (this.value as FieldReference) : undefined;
  }

  /**
   * Factory method for simple property-based conditions (backward compatible).
   */
  static of(
    propertyName: string,
    operator: Operator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
  ): SimpleCondition {
    return new SimpleCondition(propertyName, operator, value);
  }

  /**
   * Factory method for expression-based conditions.
   */
  static ofExpression(
    expression: PropertyExpression,
    operator: Operator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
  ): SimpleCondition {
    return new SimpleCondition(expression, operator, value);
  }
}
