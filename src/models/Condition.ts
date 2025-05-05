import { ConditionWrapper } from "./ConditionWrapper"; // eslint-disable-line import/no-cycle
import { NotCondition } from "./NotCondition"; // eslint-disable-line import/no-cycle
import { SimpleCondition } from "./SimpleCondition";

export type Condition = SimpleCondition | ConditionWrapper | NotCondition;
