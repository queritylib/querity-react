import { Query } from "../../models";
import { QuerityBuilderVisitor } from "./QuerityBuilderVisitor";

export class QuerityBuilder {
  public static buildQuery(query: Query): string {
    return QuerityBuilderVisitor.visit(query);
  }
}
