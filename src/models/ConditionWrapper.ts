import { Condition } from "./Condition";
import { LogicOperator } from "./LogicOperator";

export class ConditionWrapper implements Condition {
  constructor(public conditions: Condition[], public operator: LogicOperator) {
    this.conditions = conditions;
    this.operator = operator;
  }
}
