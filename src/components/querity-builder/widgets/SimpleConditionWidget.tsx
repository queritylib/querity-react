import React from "react";
import { SimpleCondition, Operator, Condition } from "../../../models";
import { useComponents } from "../../../utils";

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
          condition.operator = Operator.getOperator(e.target.value);
          onChange(condition);
        }}
      >
        {Object.values(Operator).map((op: Operator) => (
          <option key={op.name} value={op.name}>
            {op.queryLanguageSymbol}
          </option>
        ))}
      </Select>
      {condition.operator.requiredValuesCount > 0 && (
        <Input
          name="value"
          placeholder="Value"
          value={condition.value}
          onChange={(e) => {
            condition.value = e.target.value;
            onChange(condition);
          }}
        />
      )}
    </>
  );
};
