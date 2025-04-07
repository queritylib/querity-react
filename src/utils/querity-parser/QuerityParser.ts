import { CharStream, CommonTokenStream } from "antlr4";
import QueryParser from "../querity-antlr4/QueryParser";
import QueryLexer from "../querity-antlr4/QueryLexer";
import { QuerityParserVisitor } from "./QuerityParserVisitor";
import { Query } from "../../models";

export class QuerityParser {
  static parseQuery(input: string): Query {
    const chars = new CharStream(input);
    const lexer = new QueryLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new QueryParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError: (recognizer, offendingSymbol, line, column, msg) => {
        throw new Error(`Syntax error at line ${line}:${column} - ${msg}`);
      },
    });
    const tree = parser.query();
    const visitor = new QuerityParserVisitor();
    return visitor.visit(tree);
  }
}
