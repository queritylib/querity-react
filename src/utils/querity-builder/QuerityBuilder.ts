import { Query, AdvancedQuery } from "../../models";
import { QuerityBuilderVisitor } from "./QuerityBuilderVisitor";

export class QuerityBuilder {
  /**
   * Build a query string from a Query or AdvancedQuery object.
   */
  public static buildQuery(query: Query | AdvancedQuery): string {
    return QuerityBuilderVisitor.visit(query);
  }
}
