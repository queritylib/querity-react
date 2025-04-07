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
	public static readonly SORT = 5;
	public static readonly ASC = 6;
	public static readonly DESC = 7;
	public static readonly PAGINATION = 8;
	public static readonly NEQ = 9;
	public static readonly LTE = 10;
	public static readonly GTE = 11;
	public static readonly EQ = 12;
	public static readonly LT = 13;
	public static readonly GT = 14;
	public static readonly STARTS_WITH = 15;
	public static readonly ENDS_WITH = 16;
	public static readonly CONTAINS = 17;
	public static readonly IS_NULL = 18;
	public static readonly IS_NOT_NULL = 19;
	public static readonly LPAREN = 20;
	public static readonly RPAREN = 21;
	public static readonly COMMA = 22;
	public static readonly INT_VALUE = 23;
	public static readonly DECIMAL_VALUE = 24;
	public static readonly BOOLEAN_VALUE = 25;
	public static readonly PROPERTY = 26;
	public static readonly STRING_VALUE = 27;
	public static readonly WS = 28;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_query = 0;
	public static readonly RULE_condition = 1;
	public static readonly RULE_operator = 2;
	public static readonly RULE_conditionWrapper = 3;
	public static readonly RULE_notCondition = 4;
	public static readonly RULE_simpleCondition = 5;
	public static readonly RULE_direction = 6;
	public static readonly RULE_sortField = 7;
	public static readonly RULE_sortFields = 8;
	public static readonly RULE_paginationParams = 9;
	public static readonly literalNames: (string | null)[] = [ null, "'distinct'", 
                                                            "'and'", "'or'", 
                                                            "'not'", "'sort by'", 
                                                            "'asc'", "'desc'", 
                                                            "'page'", "'!='", 
                                                            "'<='", "'>='", 
                                                            "'='", "'<'", 
                                                            "'>'", "'starts with'", 
                                                            "'ends with'", 
                                                            "'contains'", 
                                                            "'is null'", 
                                                            "'is not null'", 
                                                            "'('", "')'", 
                                                            "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "DISTINCT", 
                                                             "AND", "OR", 
                                                             "NOT", "SORT", 
                                                             "ASC", "DESC", 
                                                             "PAGINATION", 
                                                             "NEQ", "LTE", 
                                                             "GTE", "EQ", 
                                                             "LT", "GT", 
                                                             "STARTS_WITH", 
                                                             "ENDS_WITH", 
                                                             "CONTAINS", 
                                                             "IS_NULL", 
                                                             "IS_NOT_NULL", 
                                                             "LPAREN", "RPAREN", 
                                                             "COMMA", "INT_VALUE", 
                                                             "DECIMAL_VALUE", 
                                                             "BOOLEAN_VALUE", 
                                                             "PROPERTY", 
                                                             "STRING_VALUE", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"query", "condition", "operator", "conditionWrapper", "notCondition", 
		"simpleCondition", "direction", "sortField", "sortFields", "paginationParams",
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
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 20;
				this.match(QueryParser.DISTINCT);
				}
			}

			this.state = 24;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 67108892) !== 0)) {
				{
				this.state = 23;
				this.condition();
				}
			}

			this.state = 28;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 26;
				this.match(QueryParser.SORT);
				this.state = 27;
				this.sortFields();
				}
			}

			this.state = 32;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 30;
				this.match(QueryParser.PAGINATION);
				this.state = 31;
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
	public condition(): ConditionContext {
		let localctx: ConditionContext = new ConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, QueryParser.RULE_condition);
		try {
			this.state = 37;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 34;
				this.simpleCondition();
				}
				break;
			case 2:
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 35;
				this.conditionWrapper();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 36;
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
	public operator(): OperatorContext {
		let localctx: OperatorContext = new OperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, QueryParser.RULE_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 39;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1048064) !== 0))) {
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
	public conditionWrapper(): ConditionWrapperContext {
		let localctx: ConditionWrapperContext = new ConditionWrapperContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, QueryParser.RULE_conditionWrapper);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 41;
			_la = this._input.LA(1);
			if(!(_la===2 || _la===3)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 42;
			this.match(QueryParser.LPAREN);
			this.state = 43;
			this.condition();
			this.state = 48;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 44;
				this.match(QueryParser.COMMA);
				this.state = 45;
				this.condition();
				}
				}
				this.state = 50;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 51;
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
		this.enterRule(localctx, 8, QueryParser.RULE_notCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 53;
			this.match(QueryParser.NOT);
			this.state = 54;
			this.match(QueryParser.LPAREN);
			this.state = 55;
			this.condition();
			this.state = 56;
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
		this.enterRule(localctx, 10, QueryParser.RULE_simpleCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 58;
			this.match(QueryParser.PROPERTY);
			this.state = 59;
			this.operator();
			this.state = 61;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 192937984) !== 0)) {
				{
				this.state = 60;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 192937984) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
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
	public direction(): DirectionContext {
		let localctx: DirectionContext = new DirectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, QueryParser.RULE_direction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 63;
			_la = this._input.LA(1);
			if(!(_la===6 || _la===7)) {
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
	public sortField(): SortFieldContext {
		let localctx: SortFieldContext = new SortFieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, QueryParser.RULE_sortField);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 65;
			this.match(QueryParser.PROPERTY);
			this.state = 67;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6 || _la===7) {
				{
				this.state = 66;
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
		this.enterRule(localctx, 16, QueryParser.RULE_sortFields);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 69;
			this.sortField();
			this.state = 74;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 70;
				this.match(QueryParser.COMMA);
				this.state = 71;
				this.sortField();
				}
				}
				this.state = 76;
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
	public paginationParams(): PaginationParamsContext {
		let localctx: PaginationParamsContext = new PaginationParamsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, QueryParser.RULE_paginationParams);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 77;
			this.match(QueryParser.INT_VALUE);
			this.state = 78;
			this.match(QueryParser.COMMA);
			this.state = 79;
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

	public static readonly _serializedATN: number[] = [4,1,28,82,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,
	0,3,0,22,8,0,1,0,3,0,25,8,0,1,0,1,0,3,0,29,8,0,1,0,1,0,3,0,33,8,0,1,1,1,
	1,1,1,3,1,38,8,1,1,2,1,2,1,3,1,3,1,3,1,3,1,3,5,3,47,8,3,10,3,12,3,50,9,
	3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,3,5,62,8,5,1,6,1,6,1,7,1,7,3,
	7,68,8,7,1,8,1,8,1,8,5,8,73,8,8,10,8,12,8,76,9,8,1,9,1,9,1,9,1,9,1,9,0,
	0,10,0,2,4,6,8,10,12,14,16,18,0,4,1,0,9,19,1,0,2,3,2,0,23,25,27,27,1,0,
	6,7,81,0,21,1,0,0,0,2,37,1,0,0,0,4,39,1,0,0,0,6,41,1,0,0,0,8,53,1,0,0,0,
	10,58,1,0,0,0,12,63,1,0,0,0,14,65,1,0,0,0,16,69,1,0,0,0,18,77,1,0,0,0,20,
	22,5,1,0,0,21,20,1,0,0,0,21,22,1,0,0,0,22,24,1,0,0,0,23,25,3,2,1,0,24,23,
	1,0,0,0,24,25,1,0,0,0,25,28,1,0,0,0,26,27,5,5,0,0,27,29,3,16,8,0,28,26,
	1,0,0,0,28,29,1,0,0,0,29,32,1,0,0,0,30,31,5,8,0,0,31,33,3,18,9,0,32,30,
	1,0,0,0,32,33,1,0,0,0,33,1,1,0,0,0,34,38,3,10,5,0,35,38,3,6,3,0,36,38,3,
	8,4,0,37,34,1,0,0,0,37,35,1,0,0,0,37,36,1,0,0,0,38,3,1,0,0,0,39,40,7,0,
	0,0,40,5,1,0,0,0,41,42,7,1,0,0,42,43,5,20,0,0,43,48,3,2,1,0,44,45,5,22,
	0,0,45,47,3,2,1,0,46,44,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,48,49,1,0,0,
	0,49,51,1,0,0,0,50,48,1,0,0,0,51,52,5,21,0,0,52,7,1,0,0,0,53,54,5,4,0,0,
	54,55,5,20,0,0,55,56,3,2,1,0,56,57,5,21,0,0,57,9,1,0,0,0,58,59,5,26,0,0,
	59,61,3,4,2,0,60,62,7,2,0,0,61,60,1,0,0,0,61,62,1,0,0,0,62,11,1,0,0,0,63,
	64,7,3,0,0,64,13,1,0,0,0,65,67,5,26,0,0,66,68,3,12,6,0,67,66,1,0,0,0,67,
	68,1,0,0,0,68,15,1,0,0,0,69,74,3,14,7,0,70,71,5,22,0,0,71,73,3,14,7,0,72,
	70,1,0,0,0,73,76,1,0,0,0,74,72,1,0,0,0,74,75,1,0,0,0,75,17,1,0,0,0,76,74,
	1,0,0,0,77,78,5,23,0,0,78,79,5,22,0,0,79,80,5,23,0,0,80,19,1,0,0,0,9,21,
	24,28,32,37,48,61,67,74];

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
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
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
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PROPERTY(): TerminalNode {
		return this.getToken(QueryParser.PROPERTY, 0);
	}
	public operator(): OperatorContext {
		return this.getTypedRuleContext(OperatorContext, 0) as OperatorContext;
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


export class SortFieldContext extends ParserRuleContext {
	constructor(parser?: QueryParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PROPERTY(): TerminalNode {
		return this.getToken(QueryParser.PROPERTY, 0);
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
