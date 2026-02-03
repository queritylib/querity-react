/**
 * Represents a reference to another field in the same entity.
 * Used in SimpleCondition to compare one field against another field
 * instead of comparing against a literal value.
 *
 * In the Querity query language, field references use the `$` prefix:
 * - `startDate < $endDate`
 * - `firstName = $lastName`
 */
export class FieldReference {
  constructor(public readonly fieldName: string) {}

  /**
   * Creates a FieldReference for the given field name.
   */
  static of(fieldName: string): FieldReference {
    return new FieldReference(fieldName);
  }
}

/**
 * Type guard to check if a value is a FieldReference.
 */
export function isFieldReference(value: unknown): value is FieldReference {
  return value instanceof FieldReference;
}
