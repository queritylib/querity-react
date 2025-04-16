import React, { useEffect, useState } from "react";
import { QuerityBuilderUIProps } from "./QuerityBuilderUI.types";
import { QuerityBuilder, QuerityParser, useComponents } from "../../utils";
import { ConditionWidget, PaginationWidget, SortWidget } from "./widgets";
import {
  Condition,
  ConditionWrapper,
  Direction,
  LogicOperator,
  Operator,
  Pagination,
  Query,
  SimpleCondition,
  Sort
} from "../../models";

export const QuerityBuilderUI = (props: QuerityBuilderUIProps) => {
  const { query, onChange, className } = props;
  const [queryObj, setQueryObj] = useState<Query>({} as Query);
  const [invalid, setInvalid] = useState(false);
  const { Checkbox, Button } = useComponents();

  useEffect(() => {
    try {
      setQueryObj(QuerityParser.parseQuery(query ?? ""));
      setInvalid(false);
    } catch (e) {
      setInvalid(true);
    }
  }, [query]);

  useEffect(() => {
    getQueryStr(queryObj);
  }, [queryObj]);

  function getQueryStr(newQueryObj: Query) {
    return QuerityBuilder.buildQuery(newQueryObj);
  }

  function validateQuery(queryStr: string): boolean {
    try {
      QuerityParser.parseQuery(queryStr);
      return true;
    } catch (e) {
      return false;
    }
  }

  function updateQueryObj(newQueryObj: Query) {
    setQueryObj(newQueryObj);
    const newQueryStr = getQueryStr(newQueryObj);
    if (validateQuery(newQueryStr) && onChange) {
      onChange(newQueryStr);
    }
  }

  function addCondition() {
    let newCondition: Condition = new SimpleCondition(
      "propertyName",
      Operator.EQUALS,
      "value"
    );
    if (queryObj.filter)
      newCondition = new ConditionWrapper(
        [queryObj.filter, newCondition],
        LogicOperator.AND
      );
    const newQueryObj = { ...queryObj, filter: newCondition };
    updateQueryObj(newQueryObj);
  }

  function updateFilter(condition: Condition) {
    const newQueryObj = { ...queryObj, filter: condition };
    updateQueryObj(newQueryObj);
  }

  function removeFilter() {
    const newQueryObj = { ...queryObj, filter: undefined };
    updateQueryObj(newQueryObj);
  }

  function addSort() {
    const newSort = new Sort("propertyName", Direction.ASC);
    const newQueryObj = {
      ...queryObj,
      sort: queryObj.sort ? [...queryObj.sort, newSort] : [newSort],
    };
    updateQueryObj(newQueryObj);
  }

  function updateSort(sort: Sort, index: number) {
    const newSorts = [...queryObj.sort];
    newSorts[index] = sort;
    const newQueryObj = { ...queryObj, sort: newSorts };
    updateQueryObj(newQueryObj);
  }

  function removeSort(index: number) {
    const newSorts = [...queryObj.sort];
    newSorts.splice(index, 1);
    const newQueryObj = { ...queryObj, sort: newSorts };
    updateQueryObj(newQueryObj);
  }

  function updatePagination(pagination: Pagination | undefined) {
    const newQueryObj = { ...queryObj, pagination };
    updateQueryObj(newQueryObj);
  }

  return (
    <div
      className={`querity-builder ${className}`}
      data-testid="querity-builder"
    >
      {invalid && (
        <div className="alert alert-danger" role="alert">
          Invalid query
        </div>
      )}
      <div id="distinct" className="section">
        <Checkbox
          id="distinct"
          title="distinct"
          label="distinct"
          name="distinct"
          checked={queryObj.distinct ?? false}
          onChange={() => {
            const newQueryObj = { ...queryObj, distinct: !queryObj.distinct };
            updateQueryObj(newQueryObj);
          }}
        />
      </div>
      <div id="filters" className="section">
        <div className="section-title">FILTERS</div>
        {!queryObj.filter &&
          <Button className="add-condition-btn" onClick={() => addCondition()}>
            + Add filter
          </Button>}
        {queryObj.filter && (
          <ConditionWidget
            condition={queryObj.filter}
            onChange={(c) => updateFilter(c)}
            onRemove={() => removeFilter()}
          />
        )}
      </div>
      <div id="sorts" className="section">
        <div className="section-title">SORTS</div>
        {queryObj.sort?.map((sort, index) => (
          <SortWidget
            key={`sort-${index}`} // eslint-disable-line react/no-array-index-key
            sort={sort}
            onChange={(s) => updateSort(s, index)}
            onRemove={() => removeSort(index)}
          />
        ))}
        <Button className="add-sort-btn" onClick={() => addSort()}>
          + Add sort
        </Button>
      </div>
      <div id="pagination" className="section">
        <div className="section-title">PAGINATION</div>
        <PaginationWidget
          pagination={queryObj.pagination}
          onChange={(c) => updatePagination(c)}
        />
      </div>
    </div>
  );
};
