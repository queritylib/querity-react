import QueryParserVisitor from "../querity-antlr4/QueryParserVisitor";
import {
  ArrayValueContext,
  ConditionContext,
  ConditionWrapperContext,
  DirectionContext,
  NotConditionContext,
  OperatorContext,
  PaginationParamsContext,
  QueryContext,
  SimpleConditionContext,
  SimpleValueContext,
  SortFieldContext,
  SortFieldsContext,
} from "../querity-antlr4/QueryParser";
import {
  Condition,
  ConditionWrapper,
  Direction,
  LogicOperator,
  NotCondition,
  Operator,
  Pagination,
  Query,
  SimpleCondition,
  Sort,
} from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class QuerityParserVisitor extends QueryParserVisitor<any> {
  visitQuery: (ctx: QueryContext) => Query = (ctx: QueryContext) => {
    const filter = ctx.condition()
      ? this.visitCondition(ctx.condition())
      : undefined;
    const pagination = ctx.paginationParams()
      ? QuerityParserVisitor.visitPaginationParams(ctx.paginationParams())
      : undefined;
    const sort = ctx.sortFields()
      ? QuerityParserVisitor.visitSortFields(ctx.sortFields())
      : [];
    const distinct = ctx.DISTINCT() != null;

    return new Query(filter, pagination, sort, distinct);
  };

  visitCondition: (ctx: ConditionContext) => Condition = (
    ctx: ConditionContext
  ) => {
    if (ctx.conditionWrapper()) {
      return this.visitConditionWrapper(ctx.conditionWrapper());
    }
    if (ctx.notCondition()) {
      return this.visitNotCondition(ctx.notCondition());
    }
    return QuerityParserVisitor.visitSimpleCondition(ctx.simpleCondition());
  };

  static readonly visitOperator: (ctx: OperatorContext) => Operator = (
    ctx: OperatorContext
  ) => {
    if (ctx.GTE() != null) {
      return Operator.GREATER_THAN_EQUALS;
    }
    if (ctx.LTE() != null) {
      return Operator.LESSER_THAN_EQUALS;
    }
    if (ctx.GT() != null) {
      return Operator.GREATER_THAN;
    }
    if (ctx.LT() != null) {
      return Operator.LESSER_THAN;
    }
    if (ctx.EQ() != null) {
      return Operator.EQUALS;
    }
    if (ctx.NEQ() != null) {
      return Operator.NOT_EQUALS;
    }
    if (ctx.STARTS_WITH() != null) {
      return Operator.STARTS_WITH;
    }
    if (ctx.ENDS_WITH() != null) {
      return Operator.ENDS_WITH;
    }
    if (ctx.CONTAINS() != null) {
      return Operator.CONTAINS;
    }
    if (ctx.IS_NULL() != null) {
      return Operator.IS_NULL;
    }
    if (ctx.IS_NOT_NULL() != null) {
      return Operator.IS_NOT_NULL;
    }
    if (ctx.IN() != null) {
      return Operator.IN;
    }
    if (ctx.NOT_IN() != null) {
      return Operator.NOT_IN;
    }
    throw new Error(`Unknown operator ${ctx.getText()}`);
  };

  visitConditionWrapper: (ctx: ConditionWrapperContext) => ConditionWrapper = (
    ctx: ConditionWrapperContext
  ) => {
    const conditions = ctx
      .condition_list()
      .map((condition) => this.visitCondition(condition));
    const operator = ctx.AND() ? LogicOperator.AND : LogicOperator.OR;
    return new ConditionWrapper(conditions, operator);
  };

  visitNotCondition: (ctx: NotConditionContext) => NotCondition = (
    ctx: NotConditionContext
  ) => {
    const condition = this.visitCondition(ctx.condition());
    return new NotCondition(condition);
  };

  static readonly visitSimpleCondition: (
    ctx: SimpleConditionContext
  ) => SimpleCondition = (ctx: SimpleConditionContext) => {
    const propertyName = ctx.PROPERTY().getText();
    const operator = QuerityParserVisitor.visitOperator(ctx.operator());
    let value;
    if (operator.requiredValuesCount > 0) {
      if (ctx.arrayValue() != null) {
        value = QuerityParserVisitor.visitArrayValue(ctx.arrayValue());
      } else if (ctx.simpleValue() != null) {
        value = QuerityParserVisitor.visitSimpleValue(ctx.simpleValue());
      }
    }
    return new SimpleCondition(propertyName, operator, value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static readonly visitArrayValue: (ctx: ArrayValueContext) => any[] = (
    ctx: ArrayValueContext
  ) => {
    if (!ctx.simpleValue_list()) return [];
    return ctx
      .simpleValue_list()
      .map((simpleValue) => QuerityParserVisitor.visitSimpleValue(simpleValue));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static readonly visitSimpleValue: (ctx: SimpleValueContext) => any = (
    ctx: SimpleValueContext
  ) => {
    if (ctx.INT_VALUE() != null) {
      return parseInt(ctx.INT_VALUE().getText(), 10);
    }
    if (ctx.DECIMAL_VALUE() != null) {
      return parseFloat(ctx.DECIMAL_VALUE().getText());
    }
    if (ctx.BOOLEAN_VALUE() != null) {
      return ctx.BOOLEAN_VALUE().getText() === "true";
    }
    return ctx.STRING_VALUE().getText().replaceAll('"', ""); // Remove quotes if present
  };

  static readonly visitDirection: (ctx: DirectionContext) => Direction = (
    ctx: DirectionContext
  ) => {
    if (ctx.ASC() != null) {
      return Direction.ASC;
    }
    if (ctx.DESC() != null) {
      return Direction.DESC;
    }
    throw new Error(`Unknown direction ${ctx.getText()}`);
  };

  static readonly visitSortField: (ctx: SortFieldContext) => Sort = (
    ctx: SortFieldContext
  ) => {
    const field = ctx.PROPERTY().getText();
    const direction = ctx.direction()
      ? QuerityParserVisitor.visitDirection(ctx.direction())
      : Direction.ASC;
    return new Sort(field, direction);
  };

  static readonly visitSortFields: (ctx: SortFieldsContext) => Sort[] = (
    ctx: SortFieldsContext
  ) => {
    const sortFields = ctx.sortField_list();
    return sortFields.map((sortField) =>
      QuerityParserVisitor.visitSortField(sortField)
    );
  };

  static readonly visitPaginationParams: (
    ctx: PaginationParamsContext
  ) => Pagination = (ctx: PaginationParamsContext) => {
    const page = ctx.INT_VALUE(0).getText();
    const size = ctx.INT_VALUE(1).getText();
    return new Pagination(parseInt(page, 10), parseInt(size, 10));
  };
}
