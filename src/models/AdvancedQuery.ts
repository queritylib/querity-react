import { Condition } from "./Condition";
import { Pagination } from "./Pagination";
import { Sort } from "./Sort";
import { Select } from "./Select";
import { GroupBy } from "./GroupBy";

/**
 * Represents an advanced query with projection, grouping, and aggregation capabilities.
 *
 * Use this class for queries that require:
 * - Projections - selecting specific fields or computed values
 * - Grouping - GROUP BY clauses
 * - Aggregations - COUNT, SUM, AVG, etc. with HAVING filters
 *
 * For simple entity queries without projections, use Query instead.
 */
export class AdvancedQuery {
  constructor(
    public filter?: Condition,
    public pagination?: Pagination,
    public sort: Sort[] = [],
    public distinct: boolean = false,
    public select?: Select,
    public groupBy?: GroupBy,
    public having?: Condition
  ) {
    // Semantic validation: HAVING requires GROUP BY
    if (this.hasHaving() && !this.hasGroupBy()) {
      throw new Error("HAVING clause requires a GROUP BY clause");
    }
  }

  /**
   * Check if this query has a non-empty filter condition.
   */
  hasFilter(): boolean {
    return this.filter !== undefined && !this.isEmptyCondition(this.filter);
  }

  /**
   * Check if this query has pagination.
   */
  hasPagination(): boolean {
    return this.pagination !== undefined;
  }

  /**
   * Check if this query has sort criteria.
   */
  hasSort(): boolean {
    return this.sort.length > 0;
  }

  /**
   * Check if this query has a SELECT clause.
   */
  hasSelect(): boolean {
    return this.select !== undefined;
  }

  /**
   * Check if this query has a GROUP BY clause.
   */
  hasGroupBy(): boolean {
    return this.groupBy !== undefined;
  }

  /**
   * Check if this query has a non-empty HAVING condition.
   */
  hasHaving(): boolean {
    return this.having !== undefined && !this.isEmptyCondition(this.having);
  }

  /**
   * Get sort criteria as an array (for compatibility with Java's List<Sort>).
   */
  getSort(): Sort[] {
    return [...this.sort];
  }

  private isEmptyCondition(condition: Condition): boolean {
    // Check for isEmpty method if it exists on the condition
    if (typeof (condition as any).isEmpty === "function") {
      return (condition as any).isEmpty();
    }
    return false;
  }

  /**
   * Creates a new AdvancedQuery builder.
   */
  static builder(): AdvancedQueryBuilder {
    return new AdvancedQueryBuilder();
  }
}

/**
 * Builder for AdvancedQuery.
 */
export class AdvancedQueryBuilder {
  private _filter?: Condition;
  private _pagination?: Pagination;
  private _sort: Sort[] = [];
  private _distinct: boolean = false;
  private _select?: Select;
  private _groupBy?: GroupBy;
  private _having?: Condition;

  filter(filter: Condition): this {
    this._filter = filter;
    return this;
  }

  pagination(pagination: Pagination): this;
  pagination(page: number, pageSize: number): this;
  pagination(pageOrPagination: Pagination | number, pageSize?: number): this {
    if (typeof pageOrPagination === "number") {
      this._pagination = { page: pageOrPagination, pageSize: pageSize! };
    } else {
      this._pagination = pageOrPagination;
    }
    return this;
  }

  sort(...sort: Sort[]): this {
    this._sort = sort;
    return this;
  }

  distinct(distinct: boolean = true): this {
    this._distinct = distinct;
    return this;
  }

  select(select: Select): this {
    this._select = select;
    return this;
  }

  groupBy(groupBy: GroupBy): this {
    this._groupBy = groupBy;
    return this;
  }

  having(having: Condition): this {
    this._having = having;
    return this;
  }

  build(): AdvancedQuery {
    return new AdvancedQuery(
      this._filter,
      this._pagination,
      this._sort,
      this._distinct,
      this._select,
      this._groupBy,
      this._having
    );
  }
}
