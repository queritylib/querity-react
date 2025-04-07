import { describe, expect, it } from "@jest/globals";
import { QuerityBuilder } from "./QuerityBuilder";
import {
  ConditionWrapper,
  Direction,
  LogicOperator,
  NotCondition,
  Operator,
  Pagination,
  Query,
  SimpleCondition,
  Sort,
} from "../../models";

describe("QuerityBuilder", () => {
  it('should build lastName="Skywalker" with curly brackets Query', () => {
    const query: Query = {
      filter: {
        propertyName: "lastName",
        operator: Operator.EQUALS,
        value: "Skywalker",
      },
      sort: [],
      distinct: false,
    };
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName = "Skywalker"');
  });

  it('should build lastName="Skywalker"', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.EQUALS, "Skywalker")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName = "Skywalker"');
  });

  it('should build lastName!="Skywalker"', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.NOT_EQUALS, "Skywalker")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName != "Skywalker"');
  });

  it('should build lastName starts with "Sky"', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.STARTS_WITH, "Sky")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName starts with "Sky"');
  });

  it('should build lastName ends with "walker"', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.ENDS_WITH, "walker")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName ends with "walker"');
  });

  it('should build lastName contains "wal"', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.CONTAINS, "wal")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName contains "wal"');
  });

  it('should build and(firstName="Luke", lastName="Skywalker")', () => {
    const query = new Query(
      new ConditionWrapper(
        [
          new SimpleCondition("firstName", Operator.EQUALS, "Luke"),
          new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
        ],
        LogicOperator.AND
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('and(firstName = "Luke",lastName = "Skywalker")');
  });

  it("should build age>30", () => {
    const query = new Query(
      new SimpleCondition("age", Operator.GREATER_THAN, 30)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("age > 30");
  });

  it("should build age<30", () => {
    const query = new Query(
      new SimpleCondition("age", Operator.LESSER_THAN, 30)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("age < 30");
  });

  it("should build height>=1.80", () => {
    const query = new Query(
      new SimpleCondition("height", Operator.GREATER_THAN_EQUALS, 1.8)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("height >= 1.8");
  });

  it("should build height<=1.80", () => {
    const query = new Query(
      new SimpleCondition("height", Operator.LESSER_THAN_EQUALS, 1.8)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("height <= 1.8");
  });

  it('should build and(lastName="Skywalker", age>30)', () => {
    const query = new Query(
      new ConditionWrapper(
        [
          new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
          new SimpleCondition("age", Operator.GREATER_THAN, 30),
        ],
        LogicOperator.AND
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('and(lastName = "Skywalker",age > 30)');
  });

  it('should build and(or(firstName="Luke", firstName="Anakin"), lastName="Skywalker") sort by age desc', () => {
    const query = new Query(
      new ConditionWrapper(
        [
          new ConditionWrapper(
            [
              new SimpleCondition("firstName", Operator.EQUALS, "Luke"),
              new SimpleCondition("firstName", Operator.EQUALS, "Anakin"),
            ],
            LogicOperator.OR
          ),
          new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
        ],
        LogicOperator.AND
      ),
      undefined,
      [new Sort("age", Direction.DESC)]
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe(
      'and(or(firstName = "Luke",firstName = "Anakin"),lastName = "Skywalker") sort by age desc'
    );
  });

  it('should build and(not(firstName="Luke"), lastName="Skywalker")', () => {
    const query = new Query(
      new ConditionWrapper(
        [
          new NotCondition(
            new SimpleCondition("firstName", Operator.EQUALS, "Luke")
          ),
          new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
        ],
        LogicOperator.AND
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('and(not(firstName = "Luke"),lastName = "Skywalker")');
  });

  it('should build lastName="Skywalker" page 2,10', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
      new Pagination(2, 10)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName = "Skywalker" page 2,10');
  });

  it("should build lastName is null", () => {
    const query = new Query(new SimpleCondition("lastName", Operator.IS_NULL));
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("lastName is null");
  });

  it("should build lastName is not null", () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.IS_NOT_NULL)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("lastName is not null");
  });

  it("should build deleted=false", () => {
    const query = new Query(
      new SimpleCondition("deleted", Operator.EQUALS, false)
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("deleted = false");
  });

  it('should build address.city="Rome"', () => {
    const query = new Query(
      new SimpleCondition("address.city", Operator.EQUALS, "Rome")
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('address.city = "Rome"');
  });

  it("should build distinct orders.rows.quantity>10", () => {
    const query = new Query(
      new SimpleCondition("orders.rows.quantity", Operator.GREATER_THAN, 10),
      undefined,
      [],
      true
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("distinct orders.rows.quantity > 10");
  });

  it("should build sort by lastName asc, age desc page 1,10", () => {
    const query = new Query(
      undefined,
      new Pagination(1, 10),
      [new Sort("lastName", Direction.ASC), new Sort("age", Direction.DESC)],
      false
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("sort by lastName asc,age desc page 1,10");
  });
});
