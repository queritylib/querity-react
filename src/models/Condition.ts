import type { ConditionWrapper } from "./ConditionWrapper";
import type { NotCondition } from "./NotCondition";
import type { SimpleCondition } from "./SimpleCondition";

export type Condition = SimpleCondition | ConditionWrapper | NotCondition;
