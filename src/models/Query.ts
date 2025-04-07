import { Condition } from "./Condition";
import { Pagination } from "./Pagination";
import { Sort } from "./Sort";

export class Query {
  constructor(
    public filter?: Condition,
    public pagination?: Pagination,
    public sort: Sort[] = [],
    public distinct: boolean = false
  ) {
    this.filter = filter;
    this.pagination = pagination;
    this.sort = sort;
    this.distinct = distinct;
  }
}
