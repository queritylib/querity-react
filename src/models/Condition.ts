import { ConditionWrapper } from "./ConditionWrapper";
import { NotCondition } from "./NotCondition";
import { SimpleCondition } from "./SimpleCondition";

export type Condition = SimpleCondition | ConditionWrapper | NotCondition;
