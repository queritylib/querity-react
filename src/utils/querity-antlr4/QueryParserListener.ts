// Generated from io/github/queritylib/querity/parser/QueryParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { QueryContext } from "./QueryParser.js";
import { ConditionContext } from "./QueryParser.js";
import { OperatorContext } from "./QueryParser.js";
import { ConditionWrapperContext } from "./QueryParser.js";
import { NotConditionContext } from "./QueryParser.js";
import { SimpleValueContext } from "./QueryParser.js";
import { ArrayValueContext } from "./QueryParser.js";
import { SimpleConditionContext } from "./QueryParser.js";
import { DirectionContext } from "./QueryParser.js";
import { SortFieldContext } from "./QueryParser.js";
import { SortFieldsContext } from "./QueryParser.js";
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

