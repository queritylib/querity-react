import { PropertyExpression } from "./PropertyExpression";
import { PropertyReference } from "./PropertyReference";

export enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Represents a sort specification for query results.
 *
 * A Sort can be based on:
 * - A simple property name (e.g., "lastName", "address.city")
 * - A PropertyExpression for function-based sorting (e.g., LENGTH(name), UPPER(lastName))
 */
export class Sort {
  /**
   * The property name for simple property-based sorting.
   * Either this or `expression` must be set, but not both.
   */
  public readonly propertyName?: string;

  /**
   * The expression for function-based sorting.
   * Either this or `propertyName` must be set, but not both.
   */
  public readonly expression?: PropertyExpression;

  public readonly direction: Direction;

  constructor(
    propertyNameOrExpression: string | PropertyExpression,
    direction: Direction
  ) {
    if (typeof propertyNameOrExpression === "string") {
      this.propertyName = propertyNameOrExpression;
      this.expression = undefined;
    } else {
      // If it's a PropertyReference, extract the property name for backward compatibility
      if (propertyNameOrExpression instanceof PropertyReference) {
        this.propertyName = propertyNameOrExpression.propertyName;
        this.expression = undefined;
      } else {
        this.propertyName = undefined;
        this.expression = propertyNameOrExpression;
      }
    }
    this.direction = direction;
  }

  /**
   * Check if this sort uses a function expression.
   */
  hasExpression(): boolean {
    return this.expression !== undefined;
  }

  /**
   * Get the effective expression.
   * If an expression is set, returns it. Otherwise, wraps the propertyName
   * in a PropertyReference.
   */
  getEffectiveExpression(): PropertyExpression {
    return this.expression ?? PropertyReference.of(this.propertyName!);
  }

  /**
   * Factory method for simple property-based sorting (backward compatible).
   */
  static of(propertyName: string, direction: Direction): Sort {
    return new Sort(propertyName, direction);
  }

  /**
   * Factory method for expression-based sorting.
   */
  static ofExpression(
    expression: PropertyExpression,
    direction: Direction
  ): Sort {
    return new Sort(expression, direction);
  }
}
