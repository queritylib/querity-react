import React from "react";
import { Sort, Direction } from "../../../models";
import { useComponents } from "../../../utils";

export const SortWidget = (props: {
  sort: Sort;
  onChange: (sort: Sort) => void;
}) => {
  const { sort, onChange } = props;
  const { Input, Select } = useComponents();

  return (
    <>
      <Input
        name="propertyName"
        placeholder="Property Name"
        value={sort.propertyName}
        onChange={(e) => {
          sort.propertyName = e.target.value;
          onChange(sort);
        }}
      />
      <Select
        name="direction"
        value={sort.direction}
        onChange={(e) => {
          sort.direction = Direction[e.target.value as keyof typeof Direction];
          onChange(sort);
        }}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </Select>
    </>
  );
};
