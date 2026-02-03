import React from "react";
import { Sort, Direction } from "../../../models";
import { useComponents } from "../../../utils";

export const SortWidget = (props: {
  sort: Sort;
  onChange: (sort: Sort) => void;
  onRemove: () => void;
}) => {
  const { sort, onChange, onRemove } = props;
  const { Input, Select, Button } = useComponents();

  return (
    <div className="sort-entry">
      <Input
        name="propertyName"
        placeholder="Property Name"
        value={sort.propertyName ?? ""}
        onChange={(e) => {
          const newSort = new Sort(e.target.value, sort.direction);
          onChange(newSort);
        }}
      />
      <Select
        name="direction"
        value={sort.direction}
        onChange={(e) => {
          const newDirection = Direction[e.target.value as keyof typeof Direction];
          const newSort = new Sort(sort.propertyName ?? "", newDirection);
          onChange(newSort);
        }}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </Select>
      <Button className="remove-btn" onClick={onRemove}>
        &times;
      </Button>
    </div>
  );
};
