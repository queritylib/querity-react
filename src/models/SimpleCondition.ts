import { Condition } from "./Condition";
import { Operator } from "./Operator";

export class SimpleCondition implements Condition {
  constructor(
    public propertyName: string,
    public operator: Operator,
    public value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) {
    this.propertyName = propertyName;
    this.operator = operator;
    this.value = value;
  }
}
