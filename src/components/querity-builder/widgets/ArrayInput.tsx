import React, { useEffect } from "react";
import { useComponents } from "../../../utils";

export const ArrayInput = (props: {
  name: string;
  placeholder: string;
  value: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onChange: (value: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  const { name, placeholder, value, onChange } = props;
  const [values, setValues] = React.useState(value);
  const { Input, Button } = useComponents();

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
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <React.Fragment key={`arrayinput-${i}`}>
          <Input
            name={name}
            placeholder={placeholder}
            value={v}
            onChange={(e) => {
              const newValues = values.map((existingValue, j) =>
                i === j ? e.target.value : existingValue,
              );
              updateValues(newValues);
            }}
          />
          {values.length > 1 && (
            <Button
              className="remove-btn"
              title="remove value"
              onClick={() => removeValue(i)}
            >
              &times;
            </Button>
          )}
        </React.Fragment>
      ))}
      <Button className="add-value-btn" title="add value" onClick={addValue}>
        +
      </Button>
    </>
  );
};
