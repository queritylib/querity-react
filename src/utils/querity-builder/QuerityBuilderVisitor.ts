import {
  Condition,
  ConditionWrapper,
  Direction,
  NotCondition,
  Pagination,
  Query,
  SimpleCondition,
  Sort,
  AdvancedQuery,
  SimpleSelect,
  SimpleGroupBy,
  Select,
  GroupBy,
  PropertyExpression,
  PropertyReference,
  FunctionCall,
  FieldReference,
  isFieldReference,
  isPropertyExpression,
  isNullary,
  Literal,
} from "../../models";

export class QuerityBuilderVisitor {
  /**
   * Visit a Query or AdvancedQuery and produce a query string.
   */
  public static visit(query: Query | AdvancedQuery): string {
    if (query instanceof AdvancedQuery) {
      return QuerityBuilderVisitor.visitAdvancedQuery(query);
    }
    return QuerityBuilderVisitor.visitQuery(query);
  }

  private static readonly visitQuery = (query: Query): string => {
    const filter = QuerityBuilderVisitor.visitCondition(query.filter);
    const sort = QuerityBuilderVisitor.visitSorts(query.sort);
    const pagination = QuerityBuilderVisitor.visitPagination(query.pagination);
    const distinct = query.distinct ? "distinct" : undefined;
    return [distinct, filter, sort, pagination]
      .filter((v) => v !== null && v !== undefined)
      .join(" ");
  };

  private static readonly visitAdvancedQuery = (query: AdvancedQuery): string => {
    const select = QuerityBuilderVisitor.visitSelect(query.select);
    const filter = QuerityBuilderVisitor.visitCondition(query.filter);
    const groupBy = QuerityBuilderVisitor.visitGroupBy(query.groupBy);
    const having = QuerityBuilderVisitor.visitHaving(query.having);
    const sort = QuerityBuilderVisitor.visitSorts(query.sort);
    const pagination = QuerityBuilderVisitor.visitPagination(query.pagination);
    const distinct = query.distinct ? "distinct" : undefined;

    return [select, distinct, filter, groupBy, having, sort, pagination]
      .filter((v) => v !== null && v !== undefined && v !== "")
      .join(" ");
  };

  private static readonly visitSelect = (
    select: Select | undefined
  ): string | undefined => {
    if (!select) return undefined;

    if (select instanceof SimpleSelect) {
      return QuerityBuilderVisitor.visitSimpleSelect(select);
    }

    // Fallback for generic Select interface
    return undefined;
  };

  private static readonly visitSimpleSelect = (select: SimpleSelect): string => {
    const parts: string[] = [];

    // Render property names first
    for (const name of select.propertyNames) {
      parts.push(QuerityBuilderVisitor.escapePropertyName(name));
    }

    // Render expressions
    for (const expr of select.expressions) {
      parts.push(QuerityBuilderVisitor.visitPropertyExpressionWithAlias(expr));
    }

    return `select ${parts.join(", ")}`;
  };

  private static readonly visitGroupBy = (
    groupBy: GroupBy | undefined
  ): string | undefined => {
    if (!groupBy) return undefined;

    if (groupBy instanceof SimpleGroupBy) {
      return QuerityBuilderVisitor.visitSimpleGroupBy(groupBy);
    }

    // Fallback for generic GroupBy interface
    return undefined;
  };

  private static readonly visitSimpleGroupBy = (groupBy: SimpleGroupBy): string => {
    const parts: string[] = [];

    // Render property names first
    for (const name of groupBy.propertyNames) {
      parts.push(QuerityBuilderVisitor.escapePropertyName(name));
    }

    // Render expressions
    for (const expr of groupBy.expressions) {
      parts.push(QuerityBuilderVisitor.visitPropertyExpression(expr));
    }

    return `group by ${parts.join(", ")}`;
  };

  private static readonly visitHaving = (
    having: Condition | undefined
  ): string | undefined => {
    if (!having) return undefined;
    const conditionStr = QuerityBuilderVisitor.visitCondition(having);
    return conditionStr ? `having ${conditionStr}` : undefined;
  };

  private static readonly visitCondition = (
    condition: Condition | undefined
  ): string | undefined => {
    if (!condition) return undefined;
    if (condition instanceof ConditionWrapper) {
      return QuerityBuilderVisitor.visitConditionWrapper(condition);
    }
    if (condition instanceof NotCondition) {
      return QuerityBuilderVisitor.visitNotCondition(condition);
    }
    return QuerityBuilderVisitor.visitSimpleCondition(condition);
  };

  private static readonly visitConditionWrapper = (
    condition: ConditionWrapper
  ): string => {
    const operator = condition.operator.toLowerCase();
    return `${operator}(${QuerityBuilderVisitor.visitConditions(
      condition.conditions
    )})`;
  };

  private static readonly visitConditions = (conditions: Condition[]): string =>
    conditions.map(QuerityBuilderVisitor.visitCondition).join(",");

  private static readonly visitNotCondition = (
    condition: NotCondition
  ): string =>
    `not(${QuerityBuilderVisitor.visitCondition(condition.condition)})`;

  private static readonly visitSimpleCondition = (
    condition: SimpleCondition
  ): string => {
    // Determine the left side: either propertyName or leftExpression
    let leftSide: string;
    
    // Handle both SimpleCondition instances and plain objects
    if (typeof condition.hasLeftExpression === "function" && condition.hasLeftExpression()) {
      leftSide = QuerityBuilderVisitor.visitPropertyExpression(
        condition.getEffectiveLeftExpression()
      );
    } else if (condition.propertyName) {
      leftSide = QuerityBuilderVisitor.escapePropertyName(condition.propertyName);
    } else {
      // Fallback for unexpected cases
      leftSide = "";
    }

    const operator = condition.operator.queryLanguageSymbol;
    const value = QuerityBuilderVisitor.visitValue(condition.value);

    return [leftSide, operator, value]
      .filter((v) => v !== null && v !== undefined && v !== "")
      .join(" ");
  };

  /**
   * Visit a PropertyExpression and return its string representation.
   * Does NOT include alias.
   */
  private static readonly visitPropertyExpression = (
    expr: PropertyExpression
  ): string => {
    if (expr instanceof PropertyReference) {
      return QuerityBuilderVisitor.escapePropertyName(expr.propertyName);
    }
    if (expr instanceof FunctionCall) {
      return QuerityBuilderVisitor.visitFunctionCall(expr);
    }
    // Fallback: use toExpressionString
    return expr.toExpressionString();
  };

  /**
   * Visit a PropertyExpression and include alias if present.
   * Used for SELECT expressions.
   */
  private static readonly visitPropertyExpressionWithAlias = (
    expr: PropertyExpression
  ): string => {
    const base = QuerityBuilderVisitor.visitPropertyExpression(expr);

    // Check for alias
    if (expr instanceof PropertyReference && expr.hasAlias()) {
      return `${base} as ${expr.alias}`;
    }
    if (expr instanceof FunctionCall && expr.hasAlias()) {
      return `${base} as ${expr.alias}`;
    }

    return base;
  };

  private static readonly visitFunctionCall = (func: FunctionCall): string => {
    // For nullary functions (like CURRENT_DATE), no parentheses
    if (isNullary(func.func)) {
      return func.func;
    }

    const argsString = func.args
      .map((arg) => QuerityBuilderVisitor.visitFunctionArgument(arg))
      .join(", ");

    return `${func.func}(${argsString})`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static readonly visitFunctionArgument = (arg: any): string => {
    if (isPropertyExpression(arg)) {
      return QuerityBuilderVisitor.visitPropertyExpression(arg);
    }
    if (arg instanceof Literal) {
      return arg.toString();
    }
    // Fallback for primitive values
    if (typeof arg === "string") {
      return `"${arg}"`;
    }
    return String(arg);
  };

  private static readonly visitSorts = (
    sorts: Sort[] | undefined
  ): string | undefined => {
    if (!sorts || sorts.length === 0) return undefined;
    return `sort by ${sorts.map(QuerityBuilderVisitor.visitSort).join(",")}`;
  };

  private static readonly visitSort = (sort: Sort): string => {
    let sortExpr: string;

    if (sort.hasExpression()) {
      sortExpr = QuerityBuilderVisitor.visitPropertyExpression(
        sort.getEffectiveExpression()
      );
    } else {
      sortExpr = QuerityBuilderVisitor.escapePropertyName(sort.propertyName!);
    }

    const direction = QuerityBuilderVisitor.visitSortDirection(sort.direction);
    return [sortExpr, direction]
      .filter((v) => v !== null && v !== undefined)
      .join(" ");
  };

  private static readonly visitSortDirection = (
    direction: Direction
  ): string | undefined => {
    if (!direction) return undefined;
    return direction.toLowerCase();
  };

  private static readonly visitPagination = (
    pagination: Pagination | undefined
  ): string | undefined => {
    if (!pagination) return undefined;
    return `page ${pagination.page},${pagination.pageSize}`;
  };

  /**
   * Visit a value, handling FieldReference and other types.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static readonly visitValue = (value: any): string | undefined => {
    if (value === null || value === undefined) return undefined;

    // Handle FieldReference
    if (isFieldReference(value)) {
      return `${(value as FieldReference).fieldName}`;
    }

    if (typeof value === "string") return `"${value}"`;
    if (Array.isArray(value))
      return `(${value.map(QuerityBuilderVisitor.visitValue).join(",")})`;
    return value.toString();
  };

  /**
   * Escape a property name if it contains special characters.
   * Uses backticks for escaping.
   */
  private static readonly escapePropertyName = (name: string): string => {
    // If the property name contains spaces, special chars, or is a reserved word,
    // wrap it in backticks
    if (QuerityBuilderVisitor.needsEscaping(name)) {
      return `\`${name}\``;
    }
    return name;
  };

  /**
   * Check if a property name needs escaping.
   */
  private static readonly needsEscaping = (name: string): boolean => {
    // Check for special characters that would require escaping
    // Allow: letters, numbers, underscores, dots (for nested paths)
    const validPattern = /^[a-zA-Z_][a-zA-Z0-9_.]*$/;
    return !validPattern.test(name);
  };
}
