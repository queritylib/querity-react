import React from "react";
import {
  Condition,
  ConditionWrapper,
  LogicOperator,
  NotCondition,
  Operator,
  SimpleCondition,
} from "../../../models";
import { SimpleConditionWidget } from "./SimpleConditionWidget";
import { NotSwitchWidget } from "./NotSwitchWidget";
import "./ConditionWidget.css";
import { useComponents } from "../../../utils";

export const ConditionWidget = (props: {
  condition: Condition;
  showNot?: boolean;
  onChange: (condition: Condition) => void;
}) => {
  const { condition, showNot, onChange } = props;
  const { Button } = useComponents();

  if (condition instanceof SimpleCondition) {
    return (
      <>
        {showNot && (
          <NotSwitchWidget
            active={false}
            condition={condition}
            onChange={onChange}
          />
        )}
        <SimpleConditionWidget condition={condition} onChange={onChange} />
      </>
    );
  }
  if (condition instanceof ConditionWrapper) {
    const addCondition = () => {
      const newCondition = new SimpleCondition(
        "propertyName",
        Operator.EQUALS,
        "value"
      );
      const newConditions = [...condition.conditions, newCondition];
      onChange(new ConditionWrapper(newConditions, condition.operator));
    };
    const updateCondition = (cond: Condition, index: number) => {
      const newConditions = [...condition.conditions];
      newConditions[index] = cond;
      onChange(new ConditionWrapper(newConditions, condition.operator));
    };
    const removeCondition = (index: number) => {
      const newConditions = [...condition.conditions];
      newConditions.splice(index, 1);
      if (newConditions.length === 1) {
        onChange(newConditions[0]);
      } else {
        onChange(new ConditionWrapper(newConditions, condition.operator));
      }
    };
    return (
      <>
        {showNot && (
          <NotSwitchWidget
            active={false}
            condition={condition}
            onChange={onChange}
          />
        )}
        <div className="condition-wrapper">
          <select
            name="operator"
            value={condition.operator}
            onChange={(e) => {
              const newOperator =
                LogicOperator[e.target.value as keyof typeof LogicOperator];
              onChange(new ConditionWrapper(condition.conditions, newOperator));
            }}
          >
            {Object.values(LogicOperator).map((op: string) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          <Button onClick={addCondition}>+</Button>
          {condition.conditions.map((cond, index) => (
            <div
              key={`condition-${index}`} // eslint-disable-line react/no-array-index-key
              className="condition"
            >
              <ConditionWidget
                condition={cond}
                onChange={(c) => updateCondition(c, index)}
                showNot
              />
              <Button onClick={() => removeCondition(index)}>-</Button>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (condition instanceof NotCondition) {
    return (
      <>
        {showNot && (
          <NotSwitchWidget active condition={condition} onChange={onChange} />
        )}
        <ConditionWidget
          condition={condition.condition}
          showNot={false}
          onChange={(c) => {
            onChange(new NotCondition(c));
          }}
        />
      </>
    );
  }
  return (
    <div>
      <h3>Unknown condition type</h3>
      <pre>{typeof condition}</pre>
    </div>
  );
};
ConditionWidget.defaultProps = {
  showNot: true,
};
