import React from "react";
import { Condition, NotCondition } from "../../../models";
import "./NotSwitchWidget.css";

export const NotSwitchWidget = (props: {
  active: boolean;
  condition: Condition;
  onChange: (condition: Condition) => void;
}) => {
  const { active, condition, onChange } = props;
  return (
    <span className="not">
      <input
        type="checkbox"
        name="isNot"
        checked={active}
        onChange={(e) => {
          if (active && condition instanceof NotCondition) {
            onChange(condition.condition);
          } else {
            onChange(new NotCondition(condition));
          }
        }}
      />{" "}
      not
    </span>
  );
};
