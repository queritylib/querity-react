import { Operator } from "./Operator";

export class SimpleCondition {
  constructor(
    public propertyName: string,
    public operator: Operator,
    public value?: any[] | any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) {
    this.propertyName = propertyName;
    this.operator = operator;
    this.value = value;
  }
}
