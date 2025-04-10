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
        value={condition.propertyName}
        onChange={(e) => {
          condition.propertyName = e.target.value;
          onChange(condition);
        }}
      />
      <Select
        name="operator"
        value={condition.operator.name}
        onChange={(e) => {
          const operator = Operator.getOperator(e.target.value);
          condition.operator = operator;
          if (operator.requiredType === "none") {
            condition.value = undefined;
          }
          if (operator.requiredType === "array") {
            if (!Array.isArray(condition.value))
              condition.value = [condition.value || ""];
          }
          if (operator.requiredType === "single") {
            if (!condition.value) condition.value = "";
            if (Array.isArray(condition.value))
              [condition.value] = condition.value; // keep first element
          }
          onChange(condition);
        }}
      >
        {Object.values(Operator).map((op: Operator) => (
          <option key={op.name} value={op.name}>
            {op.queryLanguageSymbol}
          </option>
        ))}
      </Select>
      {condition.operator.requiredValuesCount > 0 &&
        (condition.operator.requiredType === "array" ? (
          <ArrayInput
            name="value"
            placeholder="Value"
            value={condition.value}
            onChange={(value) => {
              condition.value = value;
              onChange(condition);
            }}
          />
        ) : (
          <Input
            name="value"
            placeholder="Value"
            value={condition.value}
            onChange={(e) => {
              condition.value = e.target.value;
              onChange(condition);
            }}
          />
        ))}
    </>
  );
};
