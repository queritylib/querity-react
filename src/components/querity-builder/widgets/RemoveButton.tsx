import React from "react";
import { useComponents } from "../../../utils";

export const RemoveButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const { Button } = useComponents();
  return (
    <Button className="remove-button" title="remove" onClick={onClick}>
      –
    </Button>
  );
};
