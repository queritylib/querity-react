// Generated from io/github/queritylib/querity/parser/QueryParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { QueryContext } from "./QueryParser.js";
import { WhereConditionContext } from "./QueryParser.js";
import { SelectClauseContext } from "./QueryParser.js";
import { SelectFieldsContext } from "./QueryParser.js";
import { SelectFieldContext } from "./QueryParser.js";
import { ConditionContext } from "./QueryParser.js";
import { ConditionWrapperContext } from "./QueryParser.js";
import { NotConditionContext } from "./QueryParser.js";
import { SimpleConditionContext } from "./QueryParser.js";
import { OperatorContext } from "./QueryParser.js";
import { SimpleValueContext } from "./QueryParser.js";
import { ArrayValueContext } from "./QueryParser.js";
import { PropertyExpressionContext } from "./QueryParser.js";
import { PropertyNameContext } from "./QueryParser.js";
import { FunctionCallContext } from "./QueryParser.js";
import { NullaryFunctionContext } from "./QueryParser.js";
import { FunctionNameContext } from "./QueryParser.js";
import { FunctionArgsContext } from "./QueryParser.js";
import { FunctionArgContext } from "./QueryParser.js";
import { SortFieldContext } from "./QueryParser.js";
import { SortFieldsContext } from "./QueryParser.js";
import { DirectionContext } from "./QueryParser.js";
import { GroupByClauseContext } from "./QueryParser.js";
import { GroupByFieldsContext } from "./QueryParser.js";
import { HavingClauseContext } from "./QueryParser.js";
import { PaginationParamsContext } from "./QueryParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `QueryParser`.
 */
export default class QueryParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `QueryParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.whereCondition`.
	 * @param ctx the parse tree
	 */
	enterWhereCondition?: (ctx: WhereConditionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.whereCondition`.
	 * @param ctx the parse tree
	 */
	exitWhereCondition?: (ctx: WhereConditionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.selectClause`.
	 * @param ctx the parse tree
	 */
	enterSelectClause?: (ctx: SelectClauseContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.selectClause`.
	 * @param ctx the parse tree
	 */
	exitSelectClause?: (ctx: SelectClauseContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.selectFields`.
	 * @param ctx the parse tree
	 */
	enterSelectFields?: (ctx: SelectFieldsContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.selectFields`.
	 * @param ctx the parse tree
	 */
	exitSelectFields?: (ctx: SelectFieldsContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.selectField`.
	 * @param ctx the parse tree
	 */
	enterSelectField?: (ctx: SelectFieldContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.selectField`.
	 * @param ctx the parse tree
	 */
	exitSelectField?: (ctx: SelectFieldContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.conditionWrapper`.
	 * @param ctx the parse tree
	 */
	enterConditionWrapper?: (ctx: ConditionWrapperContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.conditionWrapper`.
	 * @param ctx the parse tree
	 */
	exitConditionWrapper?: (ctx: ConditionWrapperContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.notCondition`.
	 * @param ctx the parse tree
	 */
	enterNotCondition?: (ctx: NotConditionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.notCondition`.
	 * @param ctx the parse tree
	 */
	exitNotCondition?: (ctx: NotConditionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.simpleCondition`.
	 * @param ctx the parse tree
	 */
	enterSimpleCondition?: (ctx: SimpleConditionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.simpleCondition`.
	 * @param ctx the parse tree
	 */
	exitSimpleCondition?: (ctx: SimpleConditionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperator?: (ctx: OperatorContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperator?: (ctx: OperatorContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.simpleValue`.
	 * @param ctx the parse tree
	 */
	enterSimpleValue?: (ctx: SimpleValueContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.simpleValue`.
	 * @param ctx the parse tree
	 */
	exitSimpleValue?: (ctx: SimpleValueContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.arrayValue`.
	 * @param ctx the parse tree
	 */
	enterArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.arrayValue`.
	 * @param ctx the parse tree
	 */
	exitArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.propertyExpression`.
	 * @param ctx the parse tree
	 */
	enterPropertyExpression?: (ctx: PropertyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.propertyExpression`.
	 * @param ctx the parse tree
	 */
	exitPropertyExpression?: (ctx: PropertyExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.propertyName`.
	 * @param ctx the parse tree
	 */
	enterPropertyName?: (ctx: PropertyNameContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.propertyName`.
	 * @param ctx the parse tree
	 */
	exitPropertyName?: (ctx: PropertyNameContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.nullaryFunction`.
	 * @param ctx the parse tree
	 */
	enterNullaryFunction?: (ctx: NullaryFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.nullaryFunction`.
	 * @param ctx the parse tree
	 */
	exitNullaryFunction?: (ctx: NullaryFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.functionName`.
	 * @param ctx the parse tree
	 */
	enterFunctionName?: (ctx: FunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.functionName`.
	 * @param ctx the parse tree
	 */
	exitFunctionName?: (ctx: FunctionNameContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.functionArgs`.
	 * @param ctx the parse tree
	 */
	enterFunctionArgs?: (ctx: FunctionArgsContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.functionArgs`.
	 * @param ctx the parse tree
	 */
	exitFunctionArgs?: (ctx: FunctionArgsContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.functionArg`.
	 * @param ctx the parse tree
	 */
	enterFunctionArg?: (ctx: FunctionArgContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.functionArg`.
	 * @param ctx the parse tree
	 */
	exitFunctionArg?: (ctx: FunctionArgContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.sortField`.
	 * @param ctx the parse tree
	 */
	enterSortField?: (ctx: SortFieldContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.sortField`.
	 * @param ctx the parse tree
	 */
	exitSortField?: (ctx: SortFieldContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.sortFields`.
	 * @param ctx the parse tree
	 */
	enterSortFields?: (ctx: SortFieldsContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.sortFields`.
	 * @param ctx the parse tree
	 */
	exitSortFields?: (ctx: SortFieldsContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.direction`.
	 * @param ctx the parse tree
	 */
	enterDirection?: (ctx: DirectionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.direction`.
	 * @param ctx the parse tree
	 */
	exitDirection?: (ctx: DirectionContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.groupByClause`.
	 * @param ctx the parse tree
	 */
	enterGroupByClause?: (ctx: GroupByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.groupByClause`.
	 * @param ctx the parse tree
	 */
	exitGroupByClause?: (ctx: GroupByClauseContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.groupByFields`.
	 * @param ctx the parse tree
	 */
	enterGroupByFields?: (ctx: GroupByFieldsContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.groupByFields`.
	 * @param ctx the parse tree
	 */
	exitGroupByFields?: (ctx: GroupByFieldsContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.havingClause`.
	 * @param ctx the parse tree
	 */
	enterHavingClause?: (ctx: HavingClauseContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.havingClause`.
	 * @param ctx the parse tree
	 */
	exitHavingClause?: (ctx: HavingClauseContext) => void;
	/**
	 * Enter a parse tree produced by `QueryParser.paginationParams`.
	 * @param ctx the parse tree
	 */
	enterPaginationParams?: (ctx: PaginationParamsContext) => void;
	/**
	 * Exit a parse tree produced by `QueryParser.paginationParams`.
	 * @param ctx the parse tree
	 */
	exitPaginationParams?: (ctx: PaginationParamsContext) => void;
}

