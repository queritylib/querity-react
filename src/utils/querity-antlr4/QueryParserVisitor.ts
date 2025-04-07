// Generated from io/github/queritylib/querity/parser/QueryParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { QueryContext } from "./QueryParser.js";
import { ConditionContext } from "./QueryParser.js";
import { OperatorContext } from "./QueryParser.js";
import { ConditionWrapperContext } from "./QueryParser.js";
import { NotConditionContext } from "./QueryParser.js";
import { SimpleConditionContext } from "./QueryParser.js";
import { DirectionContext } from "./QueryParser.js";
import { SortFieldContext } from "./QueryParser.js";
import { SortFieldsContext } from "./QueryParser.js";
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
	 * Visit a parse tree produced by `QueryParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `QueryParser.operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperator?: (ctx: OperatorContext) => Result;
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
	 * Visit a parse tree produced by `QueryParser.direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirection?: (ctx: DirectionContext) => Result;
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
	 * Visit a parse tree produced by `QueryParser.paginationParams`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPaginationParams?: (ctx: PaginationParamsContext) => Result;
}

