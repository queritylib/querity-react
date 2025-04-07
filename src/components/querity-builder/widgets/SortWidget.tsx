import React from "react";
import { Sort, Direction } from "../../../models";

export const SortWidget = (props: {
  sort: Sort;
  onChange: (sort: Sort) => void;
}) => {
  const { sort, onChange } = props;
  return (
    <>
      <input
        name="propertyName"
        placeholder="Property Name"
        value={sort.propertyName}
        onChange={(e) => {
          sort.propertyName = e.target.value;
          onChange(sort);
        }}
      />
      <select
        name="direction"
        value={sort.direction}
        onChange={(e) => {
          sort.direction = Direction[e.target.value as keyof typeof Direction];
          onChange(sort);
        }}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </>
  );
};
