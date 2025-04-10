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
import { AddButton } from "./AddButton";
import { RemoveButton } from "./RemoveButton";
import { WrapButton } from "./WrapButton";
import "./ConditionWidget.css";

export const ConditionWidget = (props: {
  condition: Condition;
  showNot?: boolean;
  onChange: (condition: Condition) => void;
  onRemove?: () => void;
}) => {
  const { condition, showNot, onChange, onRemove } = props;

  const wrapCondition = () => {
    const newCondition = new SimpleCondition(
      "propertyName",
      Operator.EQUALS,
      "value"
    );
    const newConditions = [condition, newCondition];
    onChange(new ConditionWrapper(newConditions, LogicOperator.AND));
  };

  const removeCondition = () => {
    if (onRemove) {
      onRemove();
    }
  };

  if (condition instanceof SimpleCondition) {
    return (
      <>
        <WrapButton onClick={wrapCondition} />
        {showNot && (
          <NotSwitchWidget
            active={false}
            condition={condition}
            onChange={onChange}
          />
        )}
        <SimpleConditionWidget condition={condition} onChange={onChange} />
        <RemoveButton title="remove condition" onClick={removeCondition} />
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
    const updateConditionAtIndex = (cond: Condition, index: number) => {
      const newConditions = [...condition.conditions];
      newConditions[index] = cond;
      onChange(new ConditionWrapper(newConditions, condition.operator));
    };
    const removeConditionAtIndex = (index: number) => {
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
        <WrapButton onClick={wrapCondition} />
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
          <AddButton title="add condition" onClick={addCondition} />
          <RemoveButton title="remove condition" onClick={removeCondition} />
          {condition.conditions.map((cond, index) => (
            <div
              key={`condition-${index}`} // eslint-disable-line react/no-array-index-key
              className="condition"
            >
              <ConditionWidget
                condition={cond}
                onChange={(c) => updateConditionAtIndex(c, index)}
                showNot
                onRemove={() => removeConditionAtIndex(index)}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
  if (condition instanceof NotCondition) {
    return (
      <>
        <WrapButton onClick={wrapCondition} />
        {showNot && (
          <NotSwitchWidget active condition={condition} onChange={onChange} />
        )}
        <ConditionWidget
          condition={condition.condition}
          showNot={false}
          onChange={(c) => {
            onChange(new NotCondition(c));
          }}
          onRemove={removeCondition}
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
