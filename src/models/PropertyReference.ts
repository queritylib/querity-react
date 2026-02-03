import { PropertyExpression } from "./PropertyExpression";

/**
 * Represents a simple reference to a property/field name.
 *
 * This is a PropertyExpression that wraps a property name string,
 * allowing property names to be used alongside function calls in a uniform way.
 */
export class PropertyReference implements PropertyExpression {
  readonly argumentType = "property" as const;

  constructor(
    public readonly propertyName: string,
    public readonly alias?: string
  ) {}

  /**
   * Creates a PropertyReference for the given property name.
   */
  static of(propertyName: string): PropertyReference {
    return new PropertyReference(propertyName);
  }

  /**
   * Creates a copy of this PropertyReference with the given alias.
   */
  as(alias: string): PropertyReference {
    return new PropertyReference(this.propertyName, alias);
  }

  /**
   * Checks if this property reference has an alias.
   */
  hasAlias(): boolean {
    return this.alias !== undefined && this.alias.length > 0;
  }

  toExpressionString(): string {
    return this.propertyName;
  }
}
