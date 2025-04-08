import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Condition, NotCondition } from "../../../models";
import { useComponents } from "../../../utils";
import "./NotSwitchWidget.css";

export const NotSwitchWidget = (props: {
  active: boolean;
  condition: Condition;
  onChange: (condition: Condition) => void;
}) => {
  const { active, condition, onChange } = props;
  const { Checkbox } = useComponents();

  return (
    <span className="not">
      <Checkbox
        id={uuidv4()}
        label="not"
        name="isNot"
        checked={active}
        onChange={(e) => {
          if (active && condition instanceof NotCondition) {
            onChange(condition.condition);
          } else {
            onChange(new NotCondition(condition));
          }
        }}
      />
    </span>
  );
};
