// Generated from io/github/queritylib/querity/parser/QueryLexer.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class QueryLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"DISTINCT", "AND", "OR", "NOT", "SORT", "ASC", "DESC", "PAGINATION", "NEQ", 
		"LTE", "GTE", "EQ", "LT", "GT", "STARTS_WITH", "ENDS_WITH", "CONTAINS", 
		"IS_NULL", "IS_NOT_NULL", "LPAREN", "RPAREN", "COMMA", "INT_VALUE", "DECIMAL_VALUE", 
		"BOOLEAN_VALUE", "PROPERTY", "STRING_VALUE", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, QueryLexer._ATN, QueryLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "QueryLexer.g4"; }

	public get literalNames(): (string | null)[] { return QueryLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return QueryLexer.symbolicNames; }
	public get ruleNames(): string[] { return QueryLexer.ruleNames; }

	public get serializedATN(): number[] { return QueryLexer._serializedATN; }

	public get channelNames(): string[] { return QueryLexer.channelNames; }

	public get modeNames(): string[] { return QueryLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,28,223,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,
	1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,
	1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,
	1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,
	15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
	1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,
	18,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,20,1,20,1,21,1,21,1,22,4,22,173,
	8,22,11,22,12,22,174,1,23,4,23,178,8,23,11,23,12,23,179,1,23,1,23,4,23,
	184,8,23,11,23,12,23,185,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,
	24,197,8,24,1,25,1,25,5,25,201,8,25,10,25,12,25,204,9,25,1,26,1,26,1,26,
	1,26,5,26,210,8,26,10,26,12,26,213,9,26,1,26,1,26,1,27,4,27,218,8,27,11,
	27,12,27,219,1,27,1,27,0,0,28,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,
	10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,43,
	22,45,23,47,24,49,25,51,26,53,27,55,28,1,0,5,1,0,48,57,3,0,65,90,95,95,
	97,122,5,0,46,46,48,57,65,90,95,95,97,122,2,0,34,34,92,92,3,0,9,10,13,13,
	32,32,230,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,
	11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,
	0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,
	33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,
	0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,
	55,1,0,0,0,1,57,1,0,0,0,3,66,1,0,0,0,5,70,1,0,0,0,7,73,1,0,0,0,9,77,1,0,
	0,0,11,85,1,0,0,0,13,89,1,0,0,0,15,94,1,0,0,0,17,99,1,0,0,0,19,102,1,0,
	0,0,21,105,1,0,0,0,23,108,1,0,0,0,25,110,1,0,0,0,27,112,1,0,0,0,29,114,
	1,0,0,0,31,126,1,0,0,0,33,136,1,0,0,0,35,145,1,0,0,0,37,153,1,0,0,0,39,
	165,1,0,0,0,41,167,1,0,0,0,43,169,1,0,0,0,45,172,1,0,0,0,47,177,1,0,0,0,
	49,196,1,0,0,0,51,198,1,0,0,0,53,205,1,0,0,0,55,217,1,0,0,0,57,58,5,100,
	0,0,58,59,5,105,0,0,59,60,5,115,0,0,60,61,5,116,0,0,61,62,5,105,0,0,62,
	63,5,110,0,0,63,64,5,99,0,0,64,65,5,116,0,0,65,2,1,0,0,0,66,67,5,97,0,0,
	67,68,5,110,0,0,68,69,5,100,0,0,69,4,1,0,0,0,70,71,5,111,0,0,71,72,5,114,
	0,0,72,6,1,0,0,0,73,74,5,110,0,0,74,75,5,111,0,0,75,76,5,116,0,0,76,8,1,
	0,0,0,77,78,5,115,0,0,78,79,5,111,0,0,79,80,5,114,0,0,80,81,5,116,0,0,81,
	82,5,32,0,0,82,83,5,98,0,0,83,84,5,121,0,0,84,10,1,0,0,0,85,86,5,97,0,0,
	86,87,5,115,0,0,87,88,5,99,0,0,88,12,1,0,0,0,89,90,5,100,0,0,90,91,5,101,
	0,0,91,92,5,115,0,0,92,93,5,99,0,0,93,14,1,0,0,0,94,95,5,112,0,0,95,96,
	5,97,0,0,96,97,5,103,0,0,97,98,5,101,0,0,98,16,1,0,0,0,99,100,5,33,0,0,
	100,101,5,61,0,0,101,18,1,0,0,0,102,103,5,60,0,0,103,104,5,61,0,0,104,20,
	1,0,0,0,105,106,5,62,0,0,106,107,5,61,0,0,107,22,1,0,0,0,108,109,5,61,0,
	0,109,24,1,0,0,0,110,111,5,60,0,0,111,26,1,0,0,0,112,113,5,62,0,0,113,28,
	1,0,0,0,114,115,5,115,0,0,115,116,5,116,0,0,116,117,5,97,0,0,117,118,5,
	114,0,0,118,119,5,116,0,0,119,120,5,115,0,0,120,121,5,32,0,0,121,122,5,
	119,0,0,122,123,5,105,0,0,123,124,5,116,0,0,124,125,5,104,0,0,125,30,1,
	0,0,0,126,127,5,101,0,0,127,128,5,110,0,0,128,129,5,100,0,0,129,130,5,115,
	0,0,130,131,5,32,0,0,131,132,5,119,0,0,132,133,5,105,0,0,133,134,5,116,
	0,0,134,135,5,104,0,0,135,32,1,0,0,0,136,137,5,99,0,0,137,138,5,111,0,0,
	138,139,5,110,0,0,139,140,5,116,0,0,140,141,5,97,0,0,141,142,5,105,0,0,
	142,143,5,110,0,0,143,144,5,115,0,0,144,34,1,0,0,0,145,146,5,105,0,0,146,
	147,5,115,0,0,147,148,5,32,0,0,148,149,5,110,0,0,149,150,5,117,0,0,150,
	151,5,108,0,0,151,152,5,108,0,0,152,36,1,0,0,0,153,154,5,105,0,0,154,155,
	5,115,0,0,155,156,5,32,0,0,156,157,5,110,0,0,157,158,5,111,0,0,158,159,
	5,116,0,0,159,160,5,32,0,0,160,161,5,110,0,0,161,162,5,117,0,0,162,163,
	5,108,0,0,163,164,5,108,0,0,164,38,1,0,0,0,165,166,5,40,0,0,166,40,1,0,
	0,0,167,168,5,41,0,0,168,42,1,0,0,0,169,170,5,44,0,0,170,44,1,0,0,0,171,
	173,7,0,0,0,172,171,1,0,0,0,173,174,1,0,0,0,174,172,1,0,0,0,174,175,1,0,
	0,0,175,46,1,0,0,0,176,178,7,0,0,0,177,176,1,0,0,0,178,179,1,0,0,0,179,
	177,1,0,0,0,179,180,1,0,0,0,180,181,1,0,0,0,181,183,5,46,0,0,182,184,7,
	0,0,0,183,182,1,0,0,0,184,185,1,0,0,0,185,183,1,0,0,0,185,186,1,0,0,0,186,
	48,1,0,0,0,187,188,5,116,0,0,188,189,5,114,0,0,189,190,5,117,0,0,190,197,
	5,101,0,0,191,192,5,102,0,0,192,193,5,97,0,0,193,194,5,108,0,0,194,195,
	5,115,0,0,195,197,5,101,0,0,196,187,1,0,0,0,196,191,1,0,0,0,197,50,1,0,
	0,0,198,202,7,1,0,0,199,201,7,2,0,0,200,199,1,0,0,0,201,204,1,0,0,0,202,
	200,1,0,0,0,202,203,1,0,0,0,203,52,1,0,0,0,204,202,1,0,0,0,205,211,5,34,
	0,0,206,210,8,3,0,0,207,208,5,92,0,0,208,210,9,0,0,0,209,206,1,0,0,0,209,
	207,1,0,0,0,210,213,1,0,0,0,211,209,1,0,0,0,211,212,1,0,0,0,212,214,1,0,
	0,0,213,211,1,0,0,0,214,215,5,34,0,0,215,54,1,0,0,0,216,218,7,4,0,0,217,
	216,1,0,0,0,218,219,1,0,0,0,219,217,1,0,0,0,219,220,1,0,0,0,220,221,1,0,
	0,0,221,222,6,27,0,0,222,56,1,0,0,0,9,0,174,179,185,196,202,209,211,219,
	1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QueryLexer.__ATN) {
			QueryLexer.__ATN = new ATNDeserializer().deserialize(QueryLexer._serializedATN);
		}

		return QueryLexer.__ATN;
	}


	static DecisionsToDFA = QueryLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}