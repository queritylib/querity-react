import React from "react";
import { useComponents } from "../../../utils";

export const ClearButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const { Button } = useComponents();
  return (
    <Button className="clear-button" title="clear" onClick={onClick}>
      x
    </Button>
  );
};
