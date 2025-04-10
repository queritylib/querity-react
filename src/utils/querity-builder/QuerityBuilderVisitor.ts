import {
  Condition,
  ConditionWrapper,
  Direction,
  NotCondition,
  Pagination,
  Query,
  SimpleCondition,
  Sort,
} from "../../models";

export class QuerityBuilderVisitor {
  public static visit(query: Query): string {
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
    return QuerityBuilderVisitor.visitSimpleCondition(
      condition as SimpleCondition
    );
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
    const { propertyName } = condition;
    const operator = condition.operator.queryLanguageSymbol;
    const value = QuerityBuilderVisitor.visitValue(condition.value);
    return [propertyName, operator, value]
      .filter((v) => v !== null && v !== undefined)
      .join(" ");
  };

  private static readonly visitSorts = (
    sorts: Sort[] | undefined
  ): string | undefined => {
    if (!sorts || sorts.length === 0) return undefined;
    return `sort by ${sorts.map(QuerityBuilderVisitor.visitSort).join(",")}`;
  };

  private static readonly visitSort = (sort: Sort): string => {
    const { propertyName } = sort;
    const direction = QuerityBuilderVisitor.visitSortDirection(sort.direction);
    return [propertyName, direction]
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static readonly visitValue = (value: any): string => {
    if (value === null || value === undefined) return value;
    if (typeof value === "string") return `"${value}"`;
    if (Array.isArray(value))
      return `(${value.map(QuerityBuilderVisitor.visitValue).join(",")})`;
    return value.toString();
  };
}
