import type { Condition } from "./Condition";
import { LogicOperator } from "./LogicOperator";

export class ConditionWrapper {
  constructor(public conditions: Condition[], public operator: LogicOperator) {
    this.conditions = conditions;
    this.operator = operator;
  }
}
