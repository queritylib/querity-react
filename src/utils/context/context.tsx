import React from "react";

interface CheckboxAttributes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export type ComponentOverrides = {
  Input: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
  Select: React.ComponentType<React.SelectHTMLAttributes<HTMLSelectElement>>;
  Button: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  Checkbox: React.ComponentType<CheckboxAttributes>;
};

export const defaultQuerityComponents: ComponentOverrides = {
  Input: (props) => <input {...props} />,
  Select: (props) => <select {...props} />,
  Button: (props) => <button type="button" {...props} />,
  Checkbox: (props) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="switch">
      <input type="checkbox" {...props} />
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <span>{props.label}</span>{" "}
    </label>
  ),
};

const ComponentsContext = React.createContext<ComponentOverrides>(
  defaultQuerityComponents
);

export const useComponents = () => React.useContext(ComponentsContext);

export const QuerityComponentsProvider = ComponentsContext.Provider;
