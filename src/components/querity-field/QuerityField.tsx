import React, { useCallback, useEffect, useState } from "react";
import { QuerityFieldProps } from "./QuerityField.types";
import { QuerityParser, useComponents } from "../../utils";

export const QuerityField = (props: QuerityFieldProps) => {
  const { value, placeholder, className, onChange, onEnter, onInvalidQuery } =
    props;
  const [query, setQuery] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parserError, setParserError] = useState<string>();
  const { Input } = useComponents();

  const queryChanged = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      if (onChange) onChange(newQuery);
      try {
        QuerityParser.parseQuery(newQuery);
        setIsValid(true);
      } catch (e) {
        setIsValid(false);
        setParserError((e as Error).message);
      }
    },
    [onChange]
  );

  const enterPressed = () => {
    if (isValid) {
      if (onEnter) onEnter(query);
    } else if (onInvalidQuery) onInvalidQuery(new Error(parserError));
  };

  useEffect(() => {
    if (value) queryChanged(value);
  }, [value, queryChanged]);

  return (
    <Input
      data-testid="querity-field"
      type="text"
      value={value}
      onChange={(e) => queryChanged(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && enterPressed()}
      placeholder={placeholder}
      className={`querity-field ${className}`}
      aria-invalid={!isValid}
    />
  );
};
