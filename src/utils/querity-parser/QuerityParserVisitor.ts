import QueryParserVisitor from "../querity-antlr4/QueryParserVisitor";
import {
  ArrayValueContext,
  ConditionContext,
  ConditionWrapperContext,
  DirectionContext,
  FunctionArgContext,
  FunctionArgsContext,
  FunctionCallContext,
  FunctionNameContext,
  GroupByClauseContext,
  GroupByFieldsContext,
  HavingClauseContext,
  NotConditionContext,
  NullaryFunctionContext,
  OperatorContext,
  PaginationParamsContext,
  PropertyExpressionContext,
  PropertyNameContext,
  QueryContext,
  SelectClauseContext,
  SelectFieldContext,
  SelectFieldsContext,
  SimpleConditionContext,
  SimpleValueContext,
  SortFieldContext,
  SortFieldsContext,
  WhereConditionContext,
} from "../querity-antlr4/QueryParser";
import {
  AdvancedQuery,
  Condition,
  ConditionWrapper,
  Direction,
  FieldReference,
  Function,
  FunctionArgument,
  FunctionCall,
  GroupBy,
  Literal,
  LogicOperator,
  NotCondition,
  Operator,
  Pagination,
  PropertyExpression,
  PropertyReference,
  Query,
  Select,
  SimpleCondition,
  SimpleGroupBy,
  SimpleSelect,
  Sort,
} from "../../models";

/**
 * Union type for query result - can be either Query or AdvancedQuery
 */
export type QueryDefinition = Query | AdvancedQuery;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class QuerityParserVisitor extends QueryParserVisitor<any> {
  visitQuery: (ctx: QueryContext) => QueryDefinition = (ctx: QueryContext) => {
    const distinct = ctx.DISTINCT() != null;
    const select = ctx.selectClause()
      ? this.visitSelectClause(ctx.selectClause())
      : undefined;
    const filter = ctx.whereCondition()
      ? this.visitWhereCondition(ctx.whereCondition())
      : undefined;
    const groupBy = ctx.groupByClause()
      ? this.visitGroupByClause(ctx.groupByClause())
      : undefined;
    const having = ctx.havingClause()
      ? this.visitHavingClause(ctx.havingClause())
      : undefined;
    const sort = ctx.sortFields()
      ? this.visitSortFields(ctx.sortFields())
      : [];
    const pagination = ctx.paginationParams()
      ? QuerityParserVisitor.visitPaginationParams(ctx.paginationParams())
      : undefined;

    // If query has projection features (select, groupBy, having), return AdvancedQuery
    if (select !== undefined || groupBy !== undefined || having !== undefined) {
      return new AdvancedQuery(
        filter,
        pagination,
        sort,
        distinct,
        select,
        groupBy,
        having
      );
    }

    // Otherwise return simple Query
    return new Query(filter, pagination, sort, distinct);
  };

  visitWhereCondition: (ctx: WhereConditionContext) => Condition = (
    ctx: WhereConditionContext
  ) => {
    return this.visitCondition(ctx.condition());
  };

  visitSelectClause: (ctx: SelectClauseContext) => Select = (
    ctx: SelectClauseContext
  ) => {
    return this.visitSelectFields(ctx.selectFields());
  };

  visitSelectFields: (ctx: SelectFieldsContext) => SimpleSelect = (
    ctx: SelectFieldsContext
  ) => {
    const expressions: PropertyExpression[] = [];
    for (const fieldCtx of ctx.selectField_list()) {
      const expr = this.visitSelectField(fieldCtx);
      expressions.push(expr);
    }

    // Check if all expressions are simple PropertyReferences (no functions or aliases)
    const allSimpleProperties = expressions.every(
      (e) => e instanceof PropertyReference && !e.hasAlias()
    );

    if (allSimpleProperties) {
      // Use propertyNames for backward compatibility
      const propertyNames = expressions.map(
        (e) => (e as PropertyReference).propertyName
      );
      return SimpleSelect.of(...propertyNames);
    } else {
      // Use expressions when functions are involved
      return SimpleSelect.ofExpressions(...expressions);
    }
  };

  visitSelectField: (ctx: SelectFieldContext) => PropertyExpression = (
    ctx: SelectFieldContext
  ) => {
    let expr = this.visitPropertyExpression(ctx.propertyExpression());

    // Handle alias if present
    if (ctx.AS() != null && ctx._alias != null) {
      const alias = QuerityParserVisitor.visitPropertyName(ctx._alias);
      if (expr instanceof FunctionCall) {
        return expr.as(alias);
      }
      if (expr instanceof PropertyReference) {
        return expr.as(alias);
      }
    }
    return expr;
  };

  visitGroupByClause: (ctx: GroupByClauseContext) => GroupBy = (
    ctx: GroupByClauseContext
  ) => {
    return this.visitGroupByFields(ctx.groupByFields());
  };

  visitGroupByFields: (ctx: GroupByFieldsContext) => SimpleGroupBy = (
    ctx: GroupByFieldsContext
  ) => {
    const expressions: PropertyExpression[] = [];
    for (const exprCtx of ctx.propertyExpression_list()) {
      const expr = this.visitPropertyExpression(exprCtx);
      expressions.push(expr);
    }

    // Check if all expressions are simple PropertyReferences (no functions)
    const allSimpleProperties = expressions.every(
      (e) => e instanceof PropertyReference
    );

    if (allSimpleProperties) {
      // Use propertyNames for backward compatibility
      const propertyNames = expressions.map(
        (e) => (e as PropertyReference).propertyName
      );
      return SimpleGroupBy.of(...propertyNames);
    } else {
      // Use expressions when functions are involved
      return SimpleGroupBy.ofExpressions(...expressions);
    }
  };

  visitHavingClause: (ctx: HavingClauseContext) => Condition = (
    ctx: HavingClauseContext
  ) => {
    return this.visitCondition(ctx.condition());
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
    return this.visitSimpleCondition(ctx.simpleCondition());
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

  visitSimpleCondition: (ctx: SimpleConditionContext) => SimpleCondition = (
    ctx: SimpleConditionContext
  ) => {
    const leftExpr = this.visitPropertyExpression(ctx.propertyExpression());
    const operator = QuerityParserVisitor.visitOperator(ctx.operator());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = undefined;

    if (operator.requiredValuesCount > 0) {
      if (ctx.arrayValue() != null) {
        value = QuerityParserVisitor.visitArrayValue(ctx.arrayValue());
      } else if (ctx.simpleValue() != null) {
        value = QuerityParserVisitor.visitSimpleValue(ctx.simpleValue());
      } else if (ctx._valueProperty != null) {
        // Use property name as field reference (field-to-field comparison)
        const fieldName = QuerityParserVisitor.visitPropertyName(ctx._valueProperty);
        value = FieldReference.of(fieldName);
      }
    }

    // Determine if we should use propertyName or leftExpression
    // If leftExpr is PropertyReference, use propertyName for backward compatibility
    if (leftExpr instanceof PropertyReference) {
      return SimpleCondition.of(leftExpr.propertyName, operator, value);
    } else {
      return SimpleCondition.ofExpression(leftExpr, operator, value);
    }
  };

  visitPropertyExpression: (ctx: PropertyExpressionContext) => PropertyExpression = (
    ctx: PropertyExpressionContext
  ) => {
    if (ctx.propertyName() != null) {
      const name = QuerityParserVisitor.visitPropertyName(ctx.propertyName());
      return PropertyReference.of(name);
    } else {
      return this.visitFunctionCall(ctx.functionCall());
    }
  };

  visitFunctionCall: (ctx: FunctionCallContext) => FunctionCall = (
    ctx: FunctionCallContext
  ) => {
    if (ctx.nullaryFunction() != null) {
      return this.visitNullaryFunction(ctx.nullaryFunction());
    }

    const func = this.visitFunctionName(ctx.functionName());
    const args: FunctionArgument[] = [];

    if (ctx.functionArgs() != null) {
      const argsResult = this.visitFunctionArgs(ctx.functionArgs());
      args.push(...argsResult);
    }

    return FunctionCall.of(func, ...args);
  };

  visitNullaryFunction: (ctx: NullaryFunctionContext) => FunctionCall = (
    ctx: NullaryFunctionContext
  ) => {
    let func: Function;
    if (ctx.CURRENT_DATE_FUNC() != null) {
      func = Function.CURRENT_DATE;
    } else if (ctx.CURRENT_TIME_FUNC() != null) {
      func = Function.CURRENT_TIME;
    } else {
      func = Function.CURRENT_TIMESTAMP;
    }
    return FunctionCall.of(func);
  };

  visitFunctionName: (ctx: FunctionNameContext) => Function = (
    ctx: FunctionNameContext
  ) => {
    const functionName = ctx.getText().toUpperCase();
    const func = Function[functionName as keyof typeof Function];
    if (func === undefined) {
      throw new Error(`Unsupported function: ${functionName}`);
    }
    return func;
  };

  visitFunctionArgs: (ctx: FunctionArgsContext) => FunctionArgument[] = (
    ctx: FunctionArgsContext
  ) => {
    const args: FunctionArgument[] = [];
    for (const argCtx of ctx.functionArg_list()) {
      args.push(this.visitFunctionArg(argCtx));
    }
    return args;
  };

  visitFunctionArg: (ctx: FunctionArgContext) => FunctionArgument = (
    ctx: FunctionArgContext
  ) => {
    if (ctx.propertyExpression() != null) {
      return this.visitPropertyExpression(ctx.propertyExpression());
    } else {
      // Wrap raw values in Literal for type safety
      const value = QuerityParserVisitor.visitSimpleValue(ctx.simpleValue());
      return Literal.of(value);
    }
  };

  static readonly visitPropertyName: (ctx: PropertyNameContext) => string = (
    ctx: PropertyNameContext
  ) => {
    if (ctx.PROPERTY() != null) {
      return ctx.PROPERTY().getText();
    }
    // Handle backtick-escaped property names
    return QuerityParserVisitor.unescapeBacktickProperty(
      ctx.BACKTICK_PROPERTY().getText()
    );
  };

  private static unescapeBacktickProperty(text: string): string {
    const raw = text.substring(1, text.length - 1);
    let result = "";
    let escaped = false;
    for (let i = 0; i < raw.length; i++) {
      const current = raw.charAt(i);
      if (escaped) {
        result += current;
        escaped = false;
      } else if (current === "\\" && i + 1 < raw.length) {
        escaped = true;
      } else {
        result += current;
      }
    }
    return result;
  }

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

  visitSortField: (ctx: SortFieldContext) => Sort = (ctx: SortFieldContext) => {
    const expr = this.visitPropertyExpression(ctx.propertyExpression());
    const direction = ctx.direction()
      ? QuerityParserVisitor.visitDirection(ctx.direction())
      : Direction.ASC;

    // If expr is PropertyReference, use propertyName for backward compatibility
    if (expr instanceof PropertyReference) {
      return Sort.of(expr.propertyName, direction);
    } else {
      return Sort.ofExpression(expr, direction);
    }
  };

  visitSortFields: (ctx: SortFieldsContext) => Sort[] = (
    ctx: SortFieldsContext
  ) => {
    const sortFields = ctx.sortField_list();
    return sortFields.map((sortField) => this.visitSortField(sortField));
  };

  static readonly visitPaginationParams: (
    ctx: PaginationParamsContext
  ) => Pagination = (ctx: PaginationParamsContext) => {
    const page = ctx.INT_VALUE(0).getText();
    const size = ctx.INT_VALUE(1).getText();
    return new Pagination(parseInt(page, 10), parseInt(size, 10));
  };
}
