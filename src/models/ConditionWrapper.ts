import { Condition } from "./Condition"; // eslint-disable-line import/no-cycle
import { LogicOperator } from "./LogicOperator";

export class ConditionWrapper {
  constructor(public conditions: Condition[], public operator: LogicOperator) {
    this.conditions = conditions;
    this.operator = operator;
  }
}
