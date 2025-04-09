import React from "react";
import { useComponents } from "../../../utils";

export const WrapButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const { Button } = useComponents();
  return (
    <Button className="wrap-button" title="wrap" onClick={onClick}>
      ( )
    </Button>
  );
};
