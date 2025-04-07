import { Condition } from "./Condition";

export class NotCondition implements Condition {
  constructor(public condition: Condition) {
    this.condition = condition;
  }
}
