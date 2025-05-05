import { Condition } from "./Condition"; // eslint-disable-line import/no-cycle

export class NotCondition {
  constructor(public condition: Condition) {
    this.condition = condition;
  }
}
