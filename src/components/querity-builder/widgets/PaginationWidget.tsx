import React from "react";
import { Pagination } from "../../../models";

export const PaginationWidget = (props: {
  pagination: Pagination | undefined;
  onChange: (pagination: Pagination | undefined) => void;
}) => {
  const { pagination, onChange } = props;

  function resetPagination() {
    onChange(undefined);
  }

  return (
    <>
      <input
        type="number"
        name="page"
        placeholder="Page"
        value={pagination?.page ?? ""}
        onChange={(e) => {
          const pageSize = pagination?.pageSize ?? 10;
          onChange({ page: parseInt(e.target.value, 10), pageSize });
        }}
      />
      <input
        type="number"
        name="pageSize"
        placeholder="Page Size"
        value={pagination?.pageSize ?? ""}
        onChange={(e) => {
          const page = pagination?.page ?? 1;
          onChange({ page, pageSize: parseInt(e.target.value, 10) });
        }}
      />
      <button type="button" onClick={() => resetPagination()}>
        x
      </button>
    </>
  );
};
