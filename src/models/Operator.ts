export class Operator {
  static readonly EQUALS = new Operator("EQUALS", 1, "=", "single");

  static readonly NOT_EQUALS = new Operator("NOT_EQUALS", 1, "!=", "single");

  static readonly STARTS_WITH = new Operator(
    "STARTS_WITH",
    1,
    "starts with",
    "single"
  );

  static readonly ENDS_WITH = new Operator(
    "ENDS_WITH",
    1,
    "ends with",
    "single"
  );

  static readonly CONTAINS = new Operator("CONTAINS", 1, "contains", "single");

  static readonly GREATER_THAN = new Operator("GREATER_THAN", 1, ">", "single");

  static readonly GREATER_THAN_EQUALS = new Operator(
    "GREATER_THAN_EQUALS",
    1,
    ">=",
    "single"
  );

  static readonly LESSER_THAN = new Operator("LESSER_THAN", 1, "<", "single");

  static readonly LESSER_THAN_EQUALS = new Operator(
    "LESSER_THAN_EQUALS",
    1,
    "<=",
    "single"
  );

  static readonly IS_NULL = new Operator("IS_NULL", 0, "is null", "none");

  static readonly IS_NOT_NULL = new Operator(
    "IS_NOT_NULL",
    0,
    "is not null",
    "none"
  );

  static readonly IN = new Operator("IN", 1, "in", "array");

  static readonly NOT_IN = new Operator("NOT_IN", 1, "not in", "array");

  private constructor(
    public name: string,
    public requiredValuesCount: number,
    public queryLanguageSymbol: string,
    public requiredType: "array" | "single" | "none"
  ) {
    this.name = name;
    this.requiredValuesCount = requiredValuesCount;
    this.queryLanguageSymbol = queryLanguageSymbol;
    this.requiredType = requiredType;
  }

  toJSON(): string {
    return this.name;
  }

  static getOperator(name: string) {
    const operator = Object.values(Operator).find((op) => op.name === name);
    if (!operator) {
      throw new Error(`Operator ${name} not found`);
    }
    return operator;
  }
}
