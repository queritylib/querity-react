import React, { useEffect } from "react";
import { useComponents } from "../../../utils";
import { AddButton } from "./AddButton";
import { RemoveButton } from "./RemoveButton";

export const ArrayInput = (props: {
  name: string;
  placeholder: string;
  value: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onChange: (value: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  const { name, placeholder, value, onChange } = props;
  const [values, setValues] = React.useState(value);
  const { Input } = useComponents();

  useEffect(() => {
    setValues(value);
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateValues = (newValues: any[]) => {
    setValues(newValues);
    onChange(newValues);
  };

  const addValue = () => {
    const newValues = [...values, ""];
    updateValues(newValues);
  };

  const removeValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    updateValues(newValues);
  };

  return (
    <>
      {values?.map((v, i) => (
        <>
          <Input
            key={`arrayinput-${i}`} // eslint-disable-line react/no-array-index-key
            name={name}
            placeholder={placeholder}
            value={v}
            onChange={(e) => {
              const newValues = values.map((existingValue, j) =>
                i === j ? e.target.value : existingValue
              );
              updateValues(newValues);
            }}
          />
          {values.length > 1 && (
            <RemoveButton title="remove value" onClick={() => removeValue(i)} />
          )}
        </>
      ))}
      <AddButton title="add value" onClick={addValue} />
    </>
  );
};
