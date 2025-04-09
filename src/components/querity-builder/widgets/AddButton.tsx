import React from "react";
import { useComponents } from "../../../utils";

export const AddButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const { Button } = useComponents();
  return (
    <Button className="add-button" title="add" onClick={onClick}>
      +
    </Button>
  );
};
