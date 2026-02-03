// Generated from io/github/queritylib/querity/parser/QueryParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QueryParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class QueryParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QueryParser.query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery?: (ctx: QueryContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.whereCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereCondition?: (ctx: WhereConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.selectClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectClause?: (ctx: SelectClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.selectFields`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectFields?: (ctx: SelectFieldsContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.selectField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectField?: (ctx: SelectFieldContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.conditionWrapper`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionWrapper?: (ctx: ConditionWrapperContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.notCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotCondition?: (ctx: NotConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.simpleCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleCondition?: (ctx: SimpleConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperator?: (ctx: OperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.simpleValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleValue?: (ctx: SimpleValueContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.arrayValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayValue?: (ctx: ArrayValueContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.propertyExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyExpression?: (ctx: PropertyExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.propertyName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyName?: (ctx: PropertyNameContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.functionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCall?: (ctx: FunctionCallContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.nullaryFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullaryFunction?: (ctx: NullaryFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.functionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionName?: (ctx: FunctionNameContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.functionArgs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionArgs?: (ctx: FunctionArgsContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.functionArg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionArg?: (ctx: FunctionArgContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.sortField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortField?: (ctx: SortFieldContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.sortFields`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortFields?: (ctx: SortFieldsContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirection?: (ctx: DirectionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.groupByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByClause?: (ctx: GroupByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.groupByFields`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByFields?: (ctx: GroupByFieldsContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.havingClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHavingClause?: (ctx: HavingClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.paginationParams`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPaginationParams?: (ctx: PaginationParamsContext) => Result;
}

