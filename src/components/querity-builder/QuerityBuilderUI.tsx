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
  Sort,
} from "../../models";
import "./QuerityBuilderUI.css";

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

  function updateQueryObj(newQueryObj: Query) {
    setQueryObj(newQueryObj);
    const newQueryStr = getQueryStr(newQueryObj);
    if (onChange) {
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
      <div id="distinct">
        <h5>DISTINCT</h5>
        <Checkbox
          id="distinct"
          label="distinct"
          name="distinct"
          checked={queryObj.distinct ?? false}
          onChange={() => {
            const newQueryObj = { ...queryObj, distinct: !queryObj.distinct };
            updateQueryObj(newQueryObj);
          }}
        />
      </div>
      <div id="filters">
        <h5>FILTERS</h5>
        <Button className="add-button" onClick={() => addCondition()}>
          +
        </Button>
        {queryObj.filter && (
          <div className="condition">
            <ConditionWidget
              condition={queryObj.filter}
              onChange={(c) => updateFilter(c)}
              showNot
            />
            <Button className="remove-button" onClick={() => removeFilter()}>
              -
            </Button>
          </div>
        )}
      </div>
      <div id="sorts">
        <h5>SORTS</h5>
        <Button className="add-button" onClick={() => addSort()}>
          +
        </Button>
        {queryObj.sort?.map((sort, index) => (
          <>
            <SortWidget
              key={`sort-${index}`} // eslint-disable-line react/no-array-index-key
              sort={sort}
              onChange={(s) => updateSort(s, index)}
            />
            <Button className="remove-button" onClick={() => removeSort(index)}>
              -
            </Button>
          </>
        ))}
      </div>
      <div id="pagination">
        <h5>PAGINATION</h5>
        <PaginationWidget
          pagination={queryObj.pagination}
          onChange={(c) => updatePagination(c)}
        />
      </div>
    </div>
  );
};
