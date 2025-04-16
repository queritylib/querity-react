import React from "react";
import { Pagination } from "../../../models";
import { useComponents } from "../../../utils";

export const PaginationWidget = (props: {
  pagination: Pagination | undefined;
  onChange: (pagination: Pagination | undefined) => void;
}) => {
  const { pagination, onChange } = props;
  const { Input, Button } = useComponents();

  function resetPagination() {
    onChange(undefined);
  }

  return (
    <div className="pagination">
      <Input
        type="number"
        name="page"
        placeholder="Page"
        value={pagination?.page ?? ""}
        onChange={(e) => {
          const pageSize = pagination?.pageSize ?? 10;
          onChange({ page: parseInt(e.target.value, 10), pageSize });
        }}
      />
      <Input
        type="number"
        name="pageSize"
        placeholder="Page Size"
        value={pagination?.pageSize ?? ""}
        onChange={(e) => {
          const page = pagination?.page ?? 1;
          onChange({ page, pageSize: parseInt(e.target.value, 10) });
        }}
      />
      <Button className="clear-pagination-btn" onClick={() => resetPagination()}>
        Clear pagination
      </Button>
    </div>
  );
};
