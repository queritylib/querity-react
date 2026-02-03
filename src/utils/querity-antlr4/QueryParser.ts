// Generated from io/github/queritylib/querity/parser/QueryParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import QueryParserListener from "./QueryParserListener.js";
import QueryParserVisitor from "./QueryParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class QueryParser extends Parser {
	public static readonly DISTINCT = 1;
	public static readonly AND = 2;
	public static readonly OR = 3;
	public static readonly NOT = 4;
	public static readonly SELECT = 5;
	public static readonly SORT = 6;
	public static readonly ASC = 7;
	public static readonly DESC = 8;
	public static readonly PAGINATION = 9;
	public static readonly AS = 10;
	public static readonly GROUP_BY = 11;
	public static readonly HAVING = 12;
	public static readonly WHERE = 13;
	public static readonly NEQ = 14;
	public static readonly LTE = 15;
	public static readonly GTE = 16;
	public static readonly EQ = 17;
	public static readonly LT = 18;
	public static readonly GT = 19;
	public static readonly STARTS_WITH = 20;
	public static readonly ENDS_WITH = 21;
	public static readonly CONTAINS = 22;
	public static readonly IS_NULL = 23;
	public static readonly IS_NOT_NULL = 24;
	public static readonly IN = 25;
	public static readonly NOT_IN = 26;
	public static readonly LPAREN = 27;
	public static readonly RPAREN = 28;
	public static readonly COMMA = 29;
	public static readonly ABS_FUNC = 30;
	public static readonly SQRT_FUNC = 31;
	public static readonly MOD_FUNC = 32;
	public static readonly CONCAT_FUNC = 33;
	public static readonly SUBSTRING_FUNC = 34;
	public static readonly TRIM_FUNC = 35;
	public static readonly LTRIM_FUNC = 36;
	public static readonly RTRIM_FUNC = 37;
	public static readonly LOWER_FUNC = 38;
	public static readonly UPPER_FUNC = 39;
	public static readonly LENGTH_FUNC = 40;
	public static readonly LOCATE_FUNC = 41;
	public static readonly CURRENT_DATE_FUNC = 42;
	public static readonly CURRENT_TIME_FUNC = 43;
	public static readonly CURRENT_TIMESTAMP_FUNC = 44;
	public static readonly COALESCE_FUNC = 45;
	public static readonly NULLIF_FUNC = 46;
	public static readonly COUNT_FUNC = 47;
	public static readonly SUM_FUNC = 48;
	public static readonly AVG_FUNC = 49;
	public static readonly MIN_FUNC = 50;
	public static readonly MAX_FUNC = 51;
	public static readonly INT_VALUE = 52;
	public static readonly DECIMAL_VALUE = 53;
	public static readonly BOOLEAN_VALUE = 54;
	public static readonly STRING_VALUE = 55;
	public static readonly BACKTICK_PROPERTY = 56;
	public static readonly PROPERTY = 57;
	public static readonly WS = 58;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_query = 0;
	public static readonly RULE_whereCondition = 1;
	public static readonly RULE_selectClause = 2;
	public static readonly RULE_selectFields = 3;
	public static readonly RULE_selectField = 4;
	public static readonly RULE_condition = 5;
	public static readonly RULE_conditionWrapper = 6;
	public static readonly RULE_notCondition = 7;
	public static readonly RULE_simpleCondition = 8;
	public static readonly RULE_operator = 9;
	public static readonly RULE_simpleValue = 10;
	public static readonly RULE_arrayValue = 11;
	public static readonly RULE_propertyExpression = 12;
	public static readonly RULE_propertyName = 13;
	public static readonly RULE_functionCall = 14;
	public static readonly RULE_nullaryFunction = 15;
	public static readonly RULE_functionName = 16;
	public static readonly RULE_functionArgs = 17;
	public static readonly RULE_functionArg = 18;
	public static readonly RULE_sortField = 19;
	public static readonly RULE_sortFields = 20;
	public static readonly RULE_direction = 21;
	public static readonly RULE_groupByClause = 22;
	public static readonly RULE_groupByFields = 23;
	public static readonly RULE_havingClause = 24;
	public static readonly RULE_paginationParams = 25;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'!='", "'<='", 
                                                            "'>='", "'='", 
                                                            "'<'", "'>'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'('", 
                                                            "')'", "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "DISTINCT", 
                                                             "AND", "OR", 
                                                             "NOT", "SELECT", 
                                                             "SORT", "ASC", 
                                                             "DESC", "PAGINATION", 
                                                             "AS", "GROUP_BY", 
                                                             "HAVING", "WHERE", 
                                                             "NEQ", "LTE", 
                                                             "GTE", "EQ", 
                                                             "LT", "GT", 
                                                             "STARTS_WITH", 
                                                             "ENDS_WITH", 
                                                             "CONTAINS", 
                                                             "IS_NULL", 
                                                             "IS_NOT_NULL", 
                                                             "IN", "NOT_IN", 
                                                             "LPAREN", "RPAREN", 
                                                             "COMMA", "ABS_FUNC", 
                                                             "SQRT_FUNC", 
                                                             "MOD_FUNC", 
                                                             "CONCAT_FUNC", 
                                                             "SUBSTRING_FUNC", 
                                                             "TRIM_FUNC", 
                                                             "LTRIM_FUNC", 
                                                             "RTRIM_FUNC", 
                                                             "LOWER_FUNC", 
                                                             "UPPER_FUNC", 
                                                             "LENGTH_FUNC", 
                                                             "LOCATE_FUNC", 
                                                             "CURRENT_DATE_FUNC", 
                                                             "CURRENT_TIME_FUNC", 
                                                             "CURRENT_TIMESTAMP_FUNC", 
                                                             "COALESCE_FUNC", 
                                                             "NULLIF_FUNC", 
                                                             "COUNT_FUNC", 
                                                             "SUM_FUNC", 
                                                             "AVG_FUNC", 
                                                             "MIN_FUNC", 
                                                             "MAX_FUNC", 
                                                             "INT_VALUE", 
                                                             "DECIMAL_VALUE", 
                                                             "BOOLEAN_VALUE", 
                                                             "STRING_VALUE", 
                                                             "BACKTICK_PROPERTY", 
                                                             "PROPERTY", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"query", "whereCondition", "selectClause", "selectFields", "selectField", 
		"condition", "conditionWrapper", "notCondition", "simpleCondition", "operator", 
		"simpleValue", "arrayValue", "propertyExpression", "propertyName", "functionCall", 
		"nullaryFunction", "functionName", "functionArgs", "functionArg", "sortField", 
		"sortFields", "direction", "groupByClause", "groupByFields", "havingClause", 
		"paginationParams",
	];
	public get grammarFileName(): string { return "QueryParser.g4"; }
	public get literalNames(): (string | null)[] { return QueryParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return QueryParser.symbolicNames; }
	public get ruleNames(): string[] { return QueryParser.ruleNames; }
	public get serializedATN(): number[] { return QueryParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, QueryParser._ATN, QueryParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, QueryParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 52;
				this.match(QueryParser.DISTINCT);
				}
			}

			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 55;
				this.selectClause();
				}
			}

			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3221233692) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 51380223) !== 0)) {
				{
				this.state = 58;
				this.whereCondition();
				}
			}

			this.state = 62;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 61;
				this.groupByClause();
				}
			}

			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===12) {
				{
				this.state = 64;
				this.havingClause();
				}
			}

			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 67;
				this.match(QueryParser.SORT);
				this.state = 68;
				this.sortFields();
				}
			}

			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 71;
				this.match(QueryParser.PAGINATION);
				this.state = 72;
				this.paginationParams();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public whereCondition(): WhereConditionContext {
		let localctx: WhereConditionContext = new WhereConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, QueryParser.RULE_whereCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 76;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 75;
				this.match(QueryParser.WHERE);
				}
			}

			this.state = 78;
			this.condition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectClause(): SelectClauseContext {
		let localctx: SelectClauseContext = new SelectClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, QueryParser.RULE_selectClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 80;
			this.match(QueryParser.SELECT);
			this.state = 81;
			this.selectFields();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectFields(): SelectFieldsContext {
		let localctx: SelectFieldsContext = new SelectFieldsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, QueryParser.RULE_selectFields);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 83;
			this.selectField();
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 84;
				this.match(QueryParser.COMMA);
				this.state = 85;
				this.selectField();
				}
				}
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectField(): SelectFieldContext {
		let localctx: SelectFieldContext = new SelectFieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, QueryParser.RULE_selectField);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 91;
			this.propertyExpression();
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===10) {
				{
				this.state = 92;
				this.match(QueryParser.AS);
				this.state = 93;
				localctx._alias = this.propertyName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let localctx: ConditionContext = new ConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, QueryParser.RULE_condition);
		try {
			this.state = 99;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 56:
			case 57:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 96;
				this.simpleCondition();
				}
				break;
			case 2:
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 97;
				this.conditionWrapper();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 98;
				this.notCondition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conditionWrapper(): ConditionWrapperContext {
		let localctx: ConditionWrapperContext = new ConditionWrapperContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, QueryParser.RULE_conditionWrapper);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 101;
			_la = this._input.LA(1);
			if(!(_la===2 || _la===3)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 102;
			this.match(QueryParser.LPAREN);
			this.state = 103;
			this.condition();
			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 104;
				this.match(QueryParser.COMMA);
				this.state = 105;
				this.condition();
				}
				}
				this.state = 110;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 111;
			this.match(QueryParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public notCondition(): NotConditionContext {
		let localctx: NotConditionContext = new NotConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, QueryParser.RULE_notCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 113;
			this.match(QueryParser.NOT);
			this.state = 114;
			this.match(QueryParser.LPAREN);
			this.state = 115;
			this.condition();
			this.state = 116;
			this.match(QueryParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simpleCondition(): SimpleConditionContext {
		let localctx: SimpleConditionContext = new SimpleConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, QueryParser.RULE_simpleCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 118;
			this.propertyExpression();
			this.state = 119;
			this.operator();
			this.state = 123;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 52:
			case 53:
			case 54:
			case 55:
				{
				this.state = 120;
				this.simpleValue();
				}
				break;
			case 27:
				{
				this.state = 121;
				this.arrayValue();
				}
				break;
			case 56:
			case 57:
				{
				this.state = 122;
				localctx._valueProperty = this.propertyName();
				}
				break;
			case -1:
			case 6:
			case 9:
			case 11:
			case 12:
			case 28:
			case 29:
				break;
			default:
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operator(): OperatorContext {
		let localctx: OperatorContext = new OperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, QueryParser.RULE_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 125;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 134201344) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simpleValue(): SimpleValueContext {
		let localctx: SimpleValueContext = new SimpleValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, QueryParser.RULE_simpleValue);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 127;
			_la = this._input.LA(1);
			if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayValue(): ArrayValueContext {
		let localctx: ArrayValueContext = new ArrayValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, QueryParser.RULE_arrayValue);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 129;
			this.match(QueryParser.LPAREN);
			this.state = 130;
			this.simpleValue();
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 131;
				this.match(QueryParser.COMMA);
				this.state = 132;
				this.simpleValue();
				}
				}
				this.state = 137;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 138;
			this.match(QueryParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public propertyExpression(): PropertyExpressionContext {
		let localctx: PropertyExpressionContext = new PropertyExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, QueryParser.RULE_propertyExpression);
		try {
			this.state = 142;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
			case 57:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 140;
				this.propertyName();
				}
				break;
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 141;
				this.functionCall();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public propertyName(): PropertyNameContext {
		let localctx: PropertyNameContext = new PropertyNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, QueryParser.RULE_propertyName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 144;
			_la = this._input.LA(1);
			if(!(_la===56 || _la===57)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let localctx: FunctionCallContext = new FunctionCallContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, QueryParser.RULE_functionCall);
		let _la: number;
		try {
			this.state = 154;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 146;
				this.functionName();
				this.state = 147;
				this.match(QueryParser.LPAREN);
				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 268435455) !== 0)) {
					{
					this.state = 148;
					this.functionArgs();
					}
				}

				this.state = 151;
				this.match(QueryParser.RPAREN);
				}
				break;
			case 42:
			case 43:
			case 44:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 153;
				this.nullaryFunction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nullaryFunction(): NullaryFunctionContext {
		let localctx: NullaryFunctionContext = new NullaryFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, QueryParser.RULE_nullaryFunction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 156;
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionName(): FunctionNameContext {
		let localctx: FunctionNameContext = new FunctionNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, QueryParser.RULE_functionName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 158;
			_la = this._input.LA(1);
			if(!(((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 4165631) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionArgs(): FunctionArgsContext {
		let localctx: FunctionArgsContext = new FunctionArgsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, QueryParser.RULE_functionArgs);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			this.functionArg();
			this.state = 165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 161;
				this.match(QueryParser.COMMA);
				this.state = 162;
				this.functionArg();
				}
				}
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionArg(): FunctionArgContext {
		let localctx: FunctionArgContext = new FunctionArgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, QueryParser.RULE_functionArg);
		try {
			this.state = 170;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 56:
			case 57:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 168;
				this.propertyExpression();
				}
				break;
			case 52:
			case 53:
			case 54:
			case 55:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 169;
				this.simpleValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sortField(): SortFieldContext {
		let localctx: SortFieldContext = new SortFieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, QueryParser.RULE_sortField);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 172;
			this.propertyExpression();
			this.state = 174;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7 || _la===8) {
				{
				this.state = 173;
				this.direction();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sortFields(): SortFieldsContext {
		let localctx: SortFieldsContext = new SortFieldsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, QueryParser.RULE_sortFields);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.sortField();
			this.state = 181;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 177;
				this.match(QueryParser.COMMA);
				this.state = 178;
				this.sortField();
				}
				}
				this.state = 183;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public direction(): DirectionContext {
		let localctx: DirectionContext = new DirectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, QueryParser.RULE_direction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
			_la = this._input.LA(1);
			if(!(_la===7 || _la===8)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public groupByClause(): GroupByClauseContext {
		let localctx: GroupByClauseContext = new GroupByClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, QueryParser.RULE_groupByClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.match(QueryParser.GROUP_BY);
			this.state = 187;
			this.groupByFields();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public groupByFields(): GroupByFieldsContext {
		let localctx: GroupByFieldsContext = new GroupByFieldsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, QueryParser.RULE_groupByFields);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this.propertyExpression();
			this.state = 194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29) {
				{
				{
				this.state = 190;
				this.match(QueryParser.COMMA);
				this.state = 191;
				this.propertyExpression();
				}
				}
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public havingClause(): HavingClauseContext {
		let localctx: HavingClauseContext = new HavingClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, QueryParser.RULE_havingClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 197;
			this.match(QueryParser.HAVING);
			this.state = 198;
			this.condition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public paginationParams(): PaginationParamsContext {
		let localctx: PaginationParamsContext = new PaginationParamsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, QueryParser.RULE_paginationParams);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 200;
			this.match(QueryParser.INT_VALUE);
			this.state = 201;
			this.match(QueryParser.COMMA);
			this.state = 202;
			this.match(QueryParser.INT_VALUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,58,205,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,1,0,3,0,54,8,0,1,0,3,0,57,8,0,1,0,3,0,60,8,0,1,0,3,0,63,8,
	0,1,0,3,0,66,8,0,1,0,1,0,3,0,70,8,0,1,0,1,0,3,0,74,8,0,1,1,3,1,77,8,1,1,
	1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,5,3,87,8,3,10,3,12,3,90,9,3,1,4,1,4,1,4,3,
	4,95,8,4,1,5,1,5,1,5,3,5,100,8,5,1,6,1,6,1,6,1,6,1,6,5,6,107,8,6,10,6,12,
	6,110,9,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,3,8,124,8,8,1,
	9,1,9,1,10,1,10,1,11,1,11,1,11,1,11,5,11,134,8,11,10,11,12,11,137,9,11,
	1,11,1,11,1,12,1,12,3,12,143,8,12,1,13,1,13,1,14,1,14,1,14,3,14,150,8,14,
	1,14,1,14,1,14,3,14,155,8,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,5,17,164,
	8,17,10,17,12,17,167,9,17,1,18,1,18,3,18,171,8,18,1,19,1,19,3,19,175,8,
	19,1,20,1,20,1,20,5,20,180,8,20,10,20,12,20,183,9,20,1,21,1,21,1,22,1,22,
	1,22,1,23,1,23,1,23,5,23,193,8,23,10,23,12,23,196,9,23,1,24,1,24,1,24,1,
	25,1,25,1,25,1,25,1,25,0,0,26,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
	32,34,36,38,40,42,44,46,48,50,0,7,1,0,2,3,1,0,14,26,1,0,52,55,1,0,56,57,
	1,0,42,44,2,0,30,41,45,51,1,0,7,8,203,0,53,1,0,0,0,2,76,1,0,0,0,4,80,1,
	0,0,0,6,83,1,0,0,0,8,91,1,0,0,0,10,99,1,0,0,0,12,101,1,0,0,0,14,113,1,0,
	0,0,16,118,1,0,0,0,18,125,1,0,0,0,20,127,1,0,0,0,22,129,1,0,0,0,24,142,
	1,0,0,0,26,144,1,0,0,0,28,154,1,0,0,0,30,156,1,0,0,0,32,158,1,0,0,0,34,
	160,1,0,0,0,36,170,1,0,0,0,38,172,1,0,0,0,40,176,1,0,0,0,42,184,1,0,0,0,
	44,186,1,0,0,0,46,189,1,0,0,0,48,197,1,0,0,0,50,200,1,0,0,0,52,54,5,1,0,
	0,53,52,1,0,0,0,53,54,1,0,0,0,54,56,1,0,0,0,55,57,3,4,2,0,56,55,1,0,0,0,
	56,57,1,0,0,0,57,59,1,0,0,0,58,60,3,2,1,0,59,58,1,0,0,0,59,60,1,0,0,0,60,
	62,1,0,0,0,61,63,3,44,22,0,62,61,1,0,0,0,62,63,1,0,0,0,63,65,1,0,0,0,64,
	66,3,48,24,0,65,64,1,0,0,0,65,66,1,0,0,0,66,69,1,0,0,0,67,68,5,6,0,0,68,
	70,3,40,20,0,69,67,1,0,0,0,69,70,1,0,0,0,70,73,1,0,0,0,71,72,5,9,0,0,72,
	74,3,50,25,0,73,71,1,0,0,0,73,74,1,0,0,0,74,1,1,0,0,0,75,77,5,13,0,0,76,
	75,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,79,3,10,5,0,79,3,1,0,0,0,80,81,
	5,5,0,0,81,82,3,6,3,0,82,5,1,0,0,0,83,88,3,8,4,0,84,85,5,29,0,0,85,87,3,
	8,4,0,86,84,1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,7,1,0,
	0,0,90,88,1,0,0,0,91,94,3,24,12,0,92,93,5,10,0,0,93,95,3,26,13,0,94,92,
	1,0,0,0,94,95,1,0,0,0,95,9,1,0,0,0,96,100,3,16,8,0,97,100,3,12,6,0,98,100,
	3,14,7,0,99,96,1,0,0,0,99,97,1,0,0,0,99,98,1,0,0,0,100,11,1,0,0,0,101,102,
	7,0,0,0,102,103,5,27,0,0,103,108,3,10,5,0,104,105,5,29,0,0,105,107,3,10,
	5,0,106,104,1,0,0,0,107,110,1,0,0,0,108,106,1,0,0,0,108,109,1,0,0,0,109,
	111,1,0,0,0,110,108,1,0,0,0,111,112,5,28,0,0,112,13,1,0,0,0,113,114,5,4,
	0,0,114,115,5,27,0,0,115,116,3,10,5,0,116,117,5,28,0,0,117,15,1,0,0,0,118,
	119,3,24,12,0,119,123,3,18,9,0,120,124,3,20,10,0,121,124,3,22,11,0,122,
	124,3,26,13,0,123,120,1,0,0,0,123,121,1,0,0,0,123,122,1,0,0,0,123,124,1,
	0,0,0,124,17,1,0,0,0,125,126,7,1,0,0,126,19,1,0,0,0,127,128,7,2,0,0,128,
	21,1,0,0,0,129,130,5,27,0,0,130,135,3,20,10,0,131,132,5,29,0,0,132,134,
	3,20,10,0,133,131,1,0,0,0,134,137,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,
	0,136,138,1,0,0,0,137,135,1,0,0,0,138,139,5,28,0,0,139,23,1,0,0,0,140,143,
	3,26,13,0,141,143,3,28,14,0,142,140,1,0,0,0,142,141,1,0,0,0,143,25,1,0,
	0,0,144,145,7,3,0,0,145,27,1,0,0,0,146,147,3,32,16,0,147,149,5,27,0,0,148,
	150,3,34,17,0,149,148,1,0,0,0,149,150,1,0,0,0,150,151,1,0,0,0,151,152,5,
	28,0,0,152,155,1,0,0,0,153,155,3,30,15,0,154,146,1,0,0,0,154,153,1,0,0,
	0,155,29,1,0,0,0,156,157,7,4,0,0,157,31,1,0,0,0,158,159,7,5,0,0,159,33,
	1,0,0,0,160,165,3,36,18,0,161,162,5,29,0,0,162,164,3,36,18,0,163,161,1,
	0,0,0,164,167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,35,1,0,0,0,167,
	165,1,0,0,0,168,171,3,24,12,0,169,171,3,20,10,0,170,168,1,0,0,0,170,169,
	1,0,0,0,171,37,1,0,0,0,172,174,3,24,12,0,173,175,3,42,21,0,174,173,1,0,
	0,0,174,175,1,0,0,0,175,39,1,0,0,0,176,181,3,38,19,0,177,178,5,29,0,0,178,
	180,3,38,19,0,179,177,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,181,182,1,
	0,0,0,182,41,1,0,0,0,183,181,1,0,0,0,184,185,7,6,0,0,185,43,1,0,0,0,186,
	187,5,11,0,0,187,188,3,46,23,0,188,45,1,0,0,0,189,194,3,24,12,0,190,191,
	5,29,0,0,191,193,3,24,12,0,192,190,1,0,0,0,193,196,1,0,0,0,194,192,1,0,
	0,0,194,195,1,0,0,0,195,47,1,0,0,0,196,194,1,0,0,0,197,198,5,12,0,0,198,
	199,3,10,5,0,199,49,1,0,0,0,200,201,5,52,0,0,201,202,5,29,0,0,202,203,5,
	52,0,0,203,51,1,0,0,0,22,53,56,59,62,65,69,73,76,88,94,99,108,123,135,142,
	149,154,165,170,174,181,194];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QueryParser.__ATN) {
			QueryParser.__ATN = new ATNDeserializer().deserialize(QueryParser._serializedATN);
		}

		return QueryParser.__ATN;
	}


	static DecisionsToDFA = QueryParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class QueryContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DISTINCT(): TerminalNode {
		return this.getToken(QueryParser.DISTINCT, 0);
	}
	public selectClause(): SelectClauseContext {
		return this.getTypedRuleContext(SelectClauseContext, 0) as SelectClauseContext;
	}
	public whereCondition(): WhereConditionContext {
		return this.getTypedRuleContext(WhereConditionContext, 0) as WhereConditionContext;
	}
	public groupByClause(): GroupByClauseContext {
		return this.getTypedRuleContext(GroupByClauseContext, 0) as GroupByClauseContext;
	}
	public havingClause(): HavingClauseContext {
		return this.getTypedRuleContext(HavingClauseContext, 0) as HavingClauseContext;
	}
	public SORT(): TerminalNode {
		return this.getToken(QueryParser.SORT, 0);
	}
	public sortFields(): SortFieldsContext {
		return this.getTypedRuleContext(SortFieldsContext, 0) as SortFieldsContext;
	}
	public PAGINATION(): TerminalNode {
		return this.getToken(QueryParser.PAGINATION, 0);
	}
	public paginationParams(): PaginationParamsContext {
		return this.getTypedRuleContext(PaginationParamsContext, 0) as PaginationParamsContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_query;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterQuery) {
	 		listener.enterQuery(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitQuery) {
	 		listener.exitQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitQuery) {
			return visitor.visitQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereConditionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
	}
	public WHERE(): TerminalNode {
		return this.getToken(QueryParser.WHERE, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_whereCondition;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterWhereCondition) {
	 		listener.enterWhereCondition(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitWhereCondition) {
	 		listener.exitWhereCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitWhereCondition) {
			return visitor.visitWhereCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectClauseContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SELECT(): TerminalNode {
		return this.getToken(QueryParser.SELECT, 0);
	}
	public selectFields(): SelectFieldsContext {
		return this.getTypedRuleContext(SelectFieldsContext, 0) as SelectFieldsContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_selectClause;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSelectClause) {
	 		listener.enterSelectClause(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSelectClause) {
	 		listener.exitSelectClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSelectClause) {
			return visitor.visitSelectClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectFieldsContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public selectField_list(): SelectFieldContext[] {
		return this.getTypedRuleContexts(SelectFieldContext) as SelectFieldContext[];
	}
	public selectField(i: number): SelectFieldContext {
		return this.getTypedRuleContext(SelectFieldContext, i) as SelectFieldContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_selectFields;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSelectFields) {
	 		listener.enterSelectFields(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSelectFields) {
	 		listener.exitSelectFields(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSelectFields) {
			return visitor.visitSelectFields(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectFieldContext extends ParserRuleContext {
	public _alias!: PropertyNameContext;
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyExpression(): PropertyExpressionContext {
		return this.getTypedRuleContext(PropertyExpressionContext, 0) as PropertyExpressionContext;
	}
	public AS(): TerminalNode {
		return this.getToken(QueryParser.AS, 0);
	}
	public propertyName(): PropertyNameContext {
		return this.getTypedRuleContext(PropertyNameContext, 0) as PropertyNameContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_selectField;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSelectField) {
	 		listener.enterSelectField(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSelectField) {
	 		listener.exitSelectField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSelectField) {
			return visitor.visitSelectField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public simpleCondition(): SimpleConditionContext {
		return this.getTypedRuleContext(SimpleConditionContext, 0) as SimpleConditionContext;
	}
	public conditionWrapper(): ConditionWrapperContext {
		return this.getTypedRuleContext(ConditionWrapperContext, 0) as ConditionWrapperContext;
	}
	public notCondition(): NotConditionContext {
		return this.getTypedRuleContext(NotConditionContext, 0) as NotConditionContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_condition;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterCondition) {
	 		listener.enterCondition(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitCondition) {
	 		listener.exitCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionWrapperContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(QueryParser.LPAREN, 0);
	}
	public condition_list(): ConditionContext[] {
		return this.getTypedRuleContexts(ConditionContext) as ConditionContext[];
	}
	public condition(i: number): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, i) as ConditionContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(QueryParser.RPAREN, 0);
	}
	public AND(): TerminalNode {
		return this.getToken(QueryParser.AND, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(QueryParser.OR, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_conditionWrapper;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterConditionWrapper) {
	 		listener.enterConditionWrapper(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitConditionWrapper) {
	 		listener.exitConditionWrapper(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitConditionWrapper) {
			return visitor.visitConditionWrapper(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NotConditionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NOT(): TerminalNode {
		return this.getToken(QueryParser.NOT, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(QueryParser.LPAREN, 0);
	}
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(QueryParser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_notCondition;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterNotCondition) {
	 		listener.enterNotCondition(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitNotCondition) {
	 		listener.exitNotCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitNotCondition) {
			return visitor.visitNotCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleConditionContext extends ParserRuleContext {
	public _valueProperty!: PropertyNameContext;
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyExpression(): PropertyExpressionContext {
		return this.getTypedRuleContext(PropertyExpressionContext, 0) as PropertyExpressionContext;
	}
	public operator(): OperatorContext {
		return this.getTypedRuleContext(OperatorContext, 0) as OperatorContext;
	}
	public simpleValue(): SimpleValueContext {
		return this.getTypedRuleContext(SimpleValueContext, 0) as SimpleValueContext;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
	public propertyName(): PropertyNameContext {
		return this.getTypedRuleContext(PropertyNameContext, 0) as PropertyNameContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_simpleCondition;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSimpleCondition) {
	 		listener.enterSimpleCondition(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSimpleCondition) {
	 		listener.exitSimpleCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSimpleCondition) {
			return visitor.visitSimpleCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEQ(): TerminalNode {
		return this.getToken(QueryParser.NEQ, 0);
	}
	public LTE(): TerminalNode {
		return this.getToken(QueryParser.LTE, 0);
	}
	public GTE(): TerminalNode {
		return this.getToken(QueryParser.GTE, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(QueryParser.EQ, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(QueryParser.LT, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(QueryParser.GT, 0);
	}
	public STARTS_WITH(): TerminalNode {
		return this.getToken(QueryParser.STARTS_WITH, 0);
	}
	public ENDS_WITH(): TerminalNode {
		return this.getToken(QueryParser.ENDS_WITH, 0);
	}
	public CONTAINS(): TerminalNode {
		return this.getToken(QueryParser.CONTAINS, 0);
	}
	public IS_NULL(): TerminalNode {
		return this.getToken(QueryParser.IS_NULL, 0);
	}
	public IS_NOT_NULL(): TerminalNode {
		return this.getToken(QueryParser.IS_NOT_NULL, 0);
	}
	public IN(): TerminalNode {
		return this.getToken(QueryParser.IN, 0);
	}
	public NOT_IN(): TerminalNode {
		return this.getToken(QueryParser.NOT_IN, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_operator;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterOperator) {
	 		listener.enterOperator(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitOperator) {
	 		listener.exitOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitOperator) {
			return visitor.visitOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleValueContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INT_VALUE(): TerminalNode {
		return this.getToken(QueryParser.INT_VALUE, 0);
	}
	public DECIMAL_VALUE(): TerminalNode {
		return this.getToken(QueryParser.DECIMAL_VALUE, 0);
	}
	public BOOLEAN_VALUE(): TerminalNode {
		return this.getToken(QueryParser.BOOLEAN_VALUE, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(QueryParser.STRING_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_simpleValue;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSimpleValue) {
	 		listener.enterSimpleValue(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSimpleValue) {
	 		listener.exitSimpleValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSimpleValue) {
			return visitor.visitSimpleValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayValueContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(QueryParser.LPAREN, 0);
	}
	public simpleValue_list(): SimpleValueContext[] {
		return this.getTypedRuleContexts(SimpleValueContext) as SimpleValueContext[];
	}
	public simpleValue(i: number): SimpleValueContext {
		return this.getTypedRuleContext(SimpleValueContext, i) as SimpleValueContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(QueryParser.RPAREN, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_arrayValue;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterArrayValue) {
	 		listener.enterArrayValue(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitArrayValue) {
	 		listener.exitArrayValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitArrayValue) {
			return visitor.visitArrayValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyExpressionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyName(): PropertyNameContext {
		return this.getTypedRuleContext(PropertyNameContext, 0) as PropertyNameContext;
	}
	public functionCall(): FunctionCallContext {
		return this.getTypedRuleContext(FunctionCallContext, 0) as FunctionCallContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_propertyExpression;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterPropertyExpression) {
	 		listener.enterPropertyExpression(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitPropertyExpression) {
	 		listener.exitPropertyExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitPropertyExpression) {
			return visitor.visitPropertyExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyNameContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PROPERTY(): TerminalNode {
		return this.getToken(QueryParser.PROPERTY, 0);
	}
	public BACKTICK_PROPERTY(): TerminalNode {
		return this.getToken(QueryParser.BACKTICK_PROPERTY, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_propertyName;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterPropertyName) {
	 		listener.enterPropertyName(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitPropertyName) {
	 		listener.exitPropertyName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitPropertyName) {
			return visitor.visitPropertyName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public functionName(): FunctionNameContext {
		return this.getTypedRuleContext(FunctionNameContext, 0) as FunctionNameContext;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(QueryParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(QueryParser.RPAREN, 0);
	}
	public functionArgs(): FunctionArgsContext {
		return this.getTypedRuleContext(FunctionArgsContext, 0) as FunctionArgsContext;
	}
	public nullaryFunction(): NullaryFunctionContext {
		return this.getTypedRuleContext(NullaryFunctionContext, 0) as NullaryFunctionContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_functionCall;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterFunctionCall) {
	 		listener.enterFunctionCall(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitFunctionCall) {
	 		listener.exitFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitFunctionCall) {
			return visitor.visitFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullaryFunctionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CURRENT_DATE_FUNC(): TerminalNode {
		return this.getToken(QueryParser.CURRENT_DATE_FUNC, 0);
	}
	public CURRENT_TIME_FUNC(): TerminalNode {
		return this.getToken(QueryParser.CURRENT_TIME_FUNC, 0);
	}
	public CURRENT_TIMESTAMP_FUNC(): TerminalNode {
		return this.getToken(QueryParser.CURRENT_TIMESTAMP_FUNC, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_nullaryFunction;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterNullaryFunction) {
	 		listener.enterNullaryFunction(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitNullaryFunction) {
	 		listener.exitNullaryFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitNullaryFunction) {
			return visitor.visitNullaryFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionNameContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ABS_FUNC(): TerminalNode {
		return this.getToken(QueryParser.ABS_FUNC, 0);
	}
	public SQRT_FUNC(): TerminalNode {
		return this.getToken(QueryParser.SQRT_FUNC, 0);
	}
	public MOD_FUNC(): TerminalNode {
		return this.getToken(QueryParser.MOD_FUNC, 0);
	}
	public CONCAT_FUNC(): TerminalNode {
		return this.getToken(QueryParser.CONCAT_FUNC, 0);
	}
	public SUBSTRING_FUNC(): TerminalNode {
		return this.getToken(QueryParser.SUBSTRING_FUNC, 0);
	}
	public TRIM_FUNC(): TerminalNode {
		return this.getToken(QueryParser.TRIM_FUNC, 0);
	}
	public LTRIM_FUNC(): TerminalNode {
		return this.getToken(QueryParser.LTRIM_FUNC, 0);
	}
	public RTRIM_FUNC(): TerminalNode {
		return this.getToken(QueryParser.RTRIM_FUNC, 0);
	}
	public LOWER_FUNC(): TerminalNode {
		return this.getToken(QueryParser.LOWER_FUNC, 0);
	}
	public UPPER_FUNC(): TerminalNode {
		return this.getToken(QueryParser.UPPER_FUNC, 0);
	}
	public LENGTH_FUNC(): TerminalNode {
		return this.getToken(QueryParser.LENGTH_FUNC, 0);
	}
	public LOCATE_FUNC(): TerminalNode {
		return this.getToken(QueryParser.LOCATE_FUNC, 0);
	}
	public COALESCE_FUNC(): TerminalNode {
		return this.getToken(QueryParser.COALESCE_FUNC, 0);
	}
	public NULLIF_FUNC(): TerminalNode {
		return this.getToken(QueryParser.NULLIF_FUNC, 0);
	}
	public COUNT_FUNC(): TerminalNode {
		return this.getToken(QueryParser.COUNT_FUNC, 0);
	}
	public SUM_FUNC(): TerminalNode {
		return this.getToken(QueryParser.SUM_FUNC, 0);
	}
	public AVG_FUNC(): TerminalNode {
		return this.getToken(QueryParser.AVG_FUNC, 0);
	}
	public MIN_FUNC(): TerminalNode {
		return this.getToken(QueryParser.MIN_FUNC, 0);
	}
	public MAX_FUNC(): TerminalNode {
		return this.getToken(QueryParser.MAX_FUNC, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_functionName;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterFunctionName) {
	 		listener.enterFunctionName(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitFunctionName) {
	 		listener.exitFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitFunctionName) {
			return visitor.visitFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionArgsContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public functionArg_list(): FunctionArgContext[] {
		return this.getTypedRuleContexts(FunctionArgContext) as FunctionArgContext[];
	}
	public functionArg(i: number): FunctionArgContext {
		return this.getTypedRuleContext(FunctionArgContext, i) as FunctionArgContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_functionArgs;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterFunctionArgs) {
	 		listener.enterFunctionArgs(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitFunctionArgs) {
	 		listener.exitFunctionArgs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitFunctionArgs) {
			return visitor.visitFunctionArgs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionArgContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyExpression(): PropertyExpressionContext {
		return this.getTypedRuleContext(PropertyExpressionContext, 0) as PropertyExpressionContext;
	}
	public simpleValue(): SimpleValueContext {
		return this.getTypedRuleContext(SimpleValueContext, 0) as SimpleValueContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_functionArg;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterFunctionArg) {
	 		listener.enterFunctionArg(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitFunctionArg) {
	 		listener.exitFunctionArg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitFunctionArg) {
			return visitor.visitFunctionArg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortFieldContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyExpression(): PropertyExpressionContext {
		return this.getTypedRuleContext(PropertyExpressionContext, 0) as PropertyExpressionContext;
	}
	public direction(): DirectionContext {
		return this.getTypedRuleContext(DirectionContext, 0) as DirectionContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_sortField;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSortField) {
	 		listener.enterSortField(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSortField) {
	 		listener.exitSortField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSortField) {
			return visitor.visitSortField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortFieldsContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sortField_list(): SortFieldContext[] {
		return this.getTypedRuleContexts(SortFieldContext) as SortFieldContext[];
	}
	public sortField(i: number): SortFieldContext {
		return this.getTypedRuleContext(SortFieldContext, i) as SortFieldContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_sortFields;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterSortFields) {
	 		listener.enterSortFields(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitSortFields) {
	 		listener.exitSortFields(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitSortFields) {
			return visitor.visitSortFields(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectionContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASC(): TerminalNode {
		return this.getToken(QueryParser.ASC, 0);
	}
	public DESC(): TerminalNode {
		return this.getToken(QueryParser.DESC, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_direction;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterDirection) {
	 		listener.enterDirection(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitDirection) {
	 		listener.exitDirection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitDirection) {
			return visitor.visitDirection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByClauseContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GROUP_BY(): TerminalNode {
		return this.getToken(QueryParser.GROUP_BY, 0);
	}
	public groupByFields(): GroupByFieldsContext {
		return this.getTypedRuleContext(GroupByFieldsContext, 0) as GroupByFieldsContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_groupByClause;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterGroupByClause) {
	 		listener.enterGroupByClause(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitGroupByClause) {
	 		listener.exitGroupByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitGroupByClause) {
			return visitor.visitGroupByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByFieldsContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public propertyExpression_list(): PropertyExpressionContext[] {
		return this.getTypedRuleContexts(PropertyExpressionContext) as PropertyExpressionContext[];
	}
	public propertyExpression(i: number): PropertyExpressionContext {
		return this.getTypedRuleContext(PropertyExpressionContext, i) as PropertyExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(QueryParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_groupByFields;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterGroupByFields) {
	 		listener.enterGroupByFields(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitGroupByFields) {
	 		listener.exitGroupByFields(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitGroupByFields) {
			return visitor.visitGroupByFields(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HavingClauseContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public HAVING(): TerminalNode {
		return this.getToken(QueryParser.HAVING, 0);
	}
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_havingClause;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterHavingClause) {
	 		listener.enterHavingClause(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitHavingClause) {
	 		listener.exitHavingClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitHavingClause) {
			return visitor.visitHavingClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PaginationParamsContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INT_VALUE_list(): TerminalNode[] {
	    	return this.getTokens(QueryParser.INT_VALUE);
	}
	public INT_VALUE(i: number): TerminalNode {
		return this.getToken(QueryParser.INT_VALUE, i);
	}
	public COMMA(): TerminalNode {
		return this.getToken(QueryParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return QueryParser.RULE_paginationParams;
	}
	public enterRule(listener: QueryParserListener): void {
	    if(listener.enterPaginationParams) {
	 		listener.enterPaginationParams(this);
		}
	}
	public exitRule(listener: QueryParserListener): void {
	    if(listener.exitPaginationParams) {
	 		listener.exitPaginationParams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryParserVisitor<Result>): Result {
		if (visitor.visitPaginationParams) {
			return visitor.visitPaginationParams(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
