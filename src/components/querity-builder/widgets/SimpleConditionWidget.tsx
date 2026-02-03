import React from "react";
import { Condition, Operator, SimpleCondition } from "../../../models";
import { useComponents } from "../../../utils";
import { ArrayInput } from "./ArrayInput";

export const SimpleConditionWidget = (props: {
  condition: SimpleCondition;
  onChange: (condition: Condition) => void;
}) => {
  const { condition, onChange } = props;
  const { Input, Select } = useComponents();

  return (
    <>
      <Input
        name="propertyName"
        placeholder="Property Name"
        value={condition.propertyName ?? ""}
        onChange={(e) => {
          const newCondition = new SimpleCondition(
            e.target.value,
            condition.operator,
            condition.value
          );
          onChange(newCondition);
        }}
      />
      <Select
        name="operator"
        value={condition.operator.name}
        onChange={(e) => {
          const operator = Operator.getOperator(e.target.value);
          let newValue = condition.value;

          if (operator.requiredType === "none") {
            newValue = undefined;
          }
          if (operator.requiredType === "array") {
            if (!Array.isArray(newValue)) {
              newValue = [newValue ?? ""];
            }
          }
          if (operator.requiredType === "single") {
            if (newValue === undefined || newValue === null) {
              newValue = "";
            } else if (Array.isArray(newValue)) {
              [newValue] = newValue; // keep first element
            }
          }

          const newCondition = new SimpleCondition(
            condition.propertyName ?? "",
            operator,
            newValue
          );
          onChange(newCondition);
        }}
      >
        {Object.values(Operator).map((op: Operator) => (
          <option key={op.name} value={op.name}>
            {op.queryLanguageSymbol}
          </option>
        ))}
      </Select>
      <span className="value">
        {condition.operator.requiredValuesCount > 0 &&
          (condition.operator.requiredType === "array" ? (
            <ArrayInput
              name="value"
              placeholder="Value"
              value={condition.value}
              onChange={(value) => {
                const newCondition = new SimpleCondition(
                  condition.propertyName ?? "",
                  condition.operator,
                  value
                );
                onChange(newCondition);
              }}
            />
          ) : (
            <Input
              name="value"
              placeholder="Value"
              value={condition.value}
              onChange={(e) => {
                const newCondition = new SimpleCondition(
                  condition.propertyName ?? "",
                  condition.operator,
                  e.target.value
                );
                onChange(newCondition);
              }}
            />
          ))}
      </span>
    </>
  );
};
