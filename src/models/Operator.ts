export class Operator {
  static readonly EQUALS = new Operator("EQUALS", 1, "=");

  static readonly NOT_EQUALS = new Operator("NOT_EQUALS", 1, "!=");

  static readonly STARTS_WITH = new Operator("STARTS_WITH", 1, "starts with");

  static readonly ENDS_WITH = new Operator("ENDS_WITH", 1, "ends with");

  static readonly CONTAINS = new Operator("CONTAINS", 1, "contains");

  static readonly GREATER_THAN = new Operator("GREATER_THAN", 1, ">");

  static readonly GREATER_THAN_EQUALS = new Operator(
    "GREATER_THAN_EQUALS",
    1,
    ">="
  );

  static readonly LESSER_THAN = new Operator("LESSER_THAN", 1, "<");

  static readonly LESSER_THAN_EQUALS = new Operator(
    "LESSER_THAN_EQUALS",
    1,
    "<="
  );

  static readonly IS_NULL = new Operator("IS_NULL", 0, "is null");

  static readonly IS_NOT_NULL = new Operator("IS_NOT_NULL", 0, "is not null");

  private constructor(
    public name: string,
    public requiredValuesCount: number,
    public queryLanguageSymbol: string
  ) {
    this.name = name;
    this.requiredValuesCount = requiredValuesCount;
    this.queryLanguageSymbol = queryLanguageSymbol;
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
