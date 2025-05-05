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
import { useComponents } from "../../../utils";

export const ConditionWidget = (props: {
  condition: Condition;
  onChange: (condition: Condition) => void;
  onRemove?: () => void;
}) => {
  const { condition, onChange, onRemove } = props;
  const { Button } = useComponents();

  const isNot = condition instanceof NotCondition;
  const baseCondition = isNot ? condition.condition : condition;

  const onNotSwitch = () => {
    if (!isNot) onChange(new NotCondition(baseCondition));
    else onChange(baseCondition);
  };

  const internalOnChange = (cond: Condition) => {
    if (!isNot) onChange(cond);
    else onChange(new NotCondition(cond));
  };

  const wrapCondition = () => {
    const newCondition = new SimpleCondition(
      "propertyName",
      Operator.EQUALS,
      "value"
    );
    const newConditions = [baseCondition, newCondition];
    internalOnChange(new ConditionWrapper(newConditions, LogicOperator.AND));
  };

  const removeCondition = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const renderSimpleCondition = (cond: SimpleCondition) => (
    <div className={`condition-group ${isNot ? "not-condition-group" : ""}`}>
      <div className="simple-condition">
        <SimpleConditionWidget condition={cond} onChange={internalOnChange} />
        <span>
          <Button
            className="wrap-btn"
            title="Wrap in group"
            onClick={wrapCondition}
          >
            &#8635;
          </Button>
          <Button className="remove-btn" onClick={removeCondition}>
            &times;
          </Button>
        </span>
      </div>
    </div>
  );

  const renderConditionWrapper = (cond: ConditionWrapper) => {
    const addCondition = () => {
      const newCondition = new SimpleCondition(
        "propertyName",
        Operator.EQUALS,
        "value"
      );
      const newConditions = [...cond.conditions, newCondition];
      internalOnChange(new ConditionWrapper(newConditions, cond.operator));
    };
    const updateConditionAtIndex = (c: Condition, index: number) => {
      const newConditions = [...cond.conditions];
      newConditions[index] = c;
      internalOnChange(new ConditionWrapper(newConditions, cond.operator));
    };
    const removeConditionAtIndex = (index: number) => {
      const newConditions = [...cond.conditions];
      newConditions.splice(index, 1);
      if (newConditions.length === 1) {
        // avoid not(not(condition))
        if (isNot && newConditions[0] instanceof NotCondition) {
          onChange(newConditions[0].condition);
        } else {
          internalOnChange(newConditions[0]);
        }
      } else {
        internalOnChange(new ConditionWrapper(newConditions, cond.operator));
      }
    };
    return (
      <div className={`condition-group ${isNot ? "not-condition-group" : ""}`}>
        <div className="group-header">
          <div className="logic-selector">
            {/* eslint-disable-next-line  jsx-a11y/label-has-associated-control */}
            <label>
              <span>Logic:</span>
              <select
                name="operator"
                value={cond.operator}
                onChange={(e) => {
                  const newOperator =
                    LogicOperator[e.target.value as keyof typeof LogicOperator];
                  internalOnChange(
                    new ConditionWrapper(cond.conditions, newOperator)
                  );
                }}
              >
                {Object.values(LogicOperator).map((op: string) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <Button className="wrap-group-btn" onClick={wrapCondition}>
              &#8635; Wrap in group
            </Button>
            <Button className="remove-group-btn" onClick={removeCondition}>
              &times;
            </Button>
          </div>
        </div>

        {cond.conditions.map((c, index) => (
          <ConditionWidget
            key={`condition-${index}`} // eslint-disable-line react/no-array-index-key
            condition={c}
            onChange={(updatedCond) =>
              updateConditionAtIndex(updatedCond, index)
            }
            onRemove={() => removeConditionAtIndex(index)}
          />
        ))}
        <Button className="add-condition-btn" onClick={addCondition}>
          + Add condition
        </Button>
      </div>
    );
  };

  const renderBaseCondition = () => {
    if (baseCondition instanceof SimpleCondition)
      return renderSimpleCondition(baseCondition);
    if (baseCondition instanceof ConditionWrapper)
      return renderConditionWrapper(baseCondition);
    return null;
  };

  return (
    <div className="condition">
      <NotSwitchWidget
        active={isNot}
        condition={baseCondition}
        onChange={onNotSwitch}
      />
      {renderBaseCondition()}
    </div>
  );
};
