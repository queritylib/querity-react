import React from "react";
import { useComponents } from "../../../utils";

export const RemoveButton = (props: {
  onClick: () => void;
  title?: string;
}) => {
  const { onClick, title } = props;
  const { Button } = useComponents();
  return (
    <Button className="remove-button" title={title} onClick={onClick}>
      –
    </Button>
  );
};

RemoveButton.defaultProps = {
  title: "remove",
};
