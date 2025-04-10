import React from "react";
import { useComponents } from "../../../utils";

export const AddButton = (props: { onClick: () => void; title?: string }) => {
  const { onClick, title } = props;
  const { Button } = useComponents();
  return (
    <Button className="add-button" title={title} onClick={onClick}>
      +
    </Button>
  );
};

AddButton.defaultProps = {
  title: "add",
};
