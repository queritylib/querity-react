import { Condition } from "./Condition";

export class NotCondition {
  constructor(public condition: Condition) {
    this.condition = condition;
  }
}
