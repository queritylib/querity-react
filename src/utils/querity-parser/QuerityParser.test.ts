import { describe, expect, it } from "@jest/globals";
import { QuerityParser } from "./QuerityParser";
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

describe("QuerityParser", () => {
  it('should parse lastName="Skywalker"', () => {
    const query = 'lastName="Skywalker"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"))
    );
  });

  it('should parse lastName!="Skywalker"', () => {
    const query = 'lastName!="Skywalker"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("lastName", Operator.NOT_EQUALS, "Skywalker")
      )
    );
  });

  it('should parse lastName starts with "Sky"', () => {
    const query = 'lastName starts with "Sky"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.STARTS_WITH, "Sky"))
    );
  });

  it('should parse lastName ends with "walker"', () => {
    const query = 'lastName ends with "walker"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.ENDS_WITH, "walker"))
    );
  });

  it('should parse lastName contains "wal"', () => {
    const query = 'lastName contains "wal"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.CONTAINS, "wal"))
    );
  });

  it('should parse and(firstName="Luke", lastName="Skywalker")', () => {
    const query = 'and(firstName="Luke", lastName="Skywalker")';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new ConditionWrapper(
          [
            new SimpleCondition("firstName", Operator.EQUALS, "Luke"),
            new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
          ],
          LogicOperator.AND
        )
      )
    );
  });

  it("should parse age>30", () => {
    const query = "age>30";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("age", Operator.GREATER_THAN, 30))
    );
  });

  it("should parse age<30", () => {
    const query = "age<30";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("age", Operator.LESSER_THAN, 30))
    );
  });

  it("should parse height>=1.80", () => {
    const query = "height>=1.80";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("height", Operator.GREATER_THAN_EQUALS, 1.8)
      )
    );
  });

  it("should parse height<=1.80", () => {
    const query = "height<=1.80";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("height", Operator.LESSER_THAN_EQUALS, 1.8))
    );
  });

  it('should parse and(lastName="Skywalker", age>30)', () => {
    const query = 'and(lastName="Skywalker", age>30)';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new ConditionWrapper(
          [
            new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
            new SimpleCondition("age", Operator.GREATER_THAN, 30),
          ],
          LogicOperator.AND
        )
      )
    );
  });

  it('should parse and(or(firstName="Luke", firstName="Anakin"), lastName="Skywalker") sort by age desc', () => {
    const query =
      'and(or(firstName="Luke", firstName="Anakin"), lastName="Skywalker") sort by age desc';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
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
      )
    );
  });

  it('should parse and(not(firstName="Luke"), lastName="Skywalker")', () => {
    const query = 'and(not(firstName="Luke"), lastName="Skywalker")';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new ConditionWrapper(
          [
            new NotCondition(
              new SimpleCondition("firstName", Operator.EQUALS, "Luke")
            ),
            new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
          ],
          LogicOperator.AND
        )
      )
    );
  });

  it('should parse lastName="Skywalker" page 2,10', () => {
    const query = 'lastName="Skywalker" page 2,10';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
        new Pagination(2, 10)
      )
    );
  });

  it("should parse lastName is null", () => {
    const query = "lastName is null";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.IS_NULL))
    );
  });

  it("should parse lastName is not null", () => {
    const query = "lastName is not null";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.IS_NOT_NULL))
    );
  });

  it('should parse lastName in ("Skywalker","Solo")', () => {
    const query = 'lastName in ("Skywalker","Solo")';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("lastName", Operator.IN, ["Skywalker", "Solo"])
      )
    );
  });

  it('should parse lastName not in ("Skywalker","Solo")', () => {
    const query = 'lastName not in ("Skywalker","Solo")';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("lastName", Operator.NOT_IN, ["Skywalker", "Solo"])
      )
    );
  });

  it("should parse deleted=false", () => {
    const query = "deleted=false";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("deleted", Operator.EQUALS, false))
    );
  });

  it('should parse address.city="Rome"', () => {
    const query = 'address.city="Rome"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("address.city", Operator.EQUALS, "Rome"))
    );
  });

  it("should parse distinct orders.rows.quantity>10", () => {
    const query = "distinct orders.rows.quantity>10";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("orders.rows.quantity", Operator.GREATER_THAN, 10),
        undefined,
        [],
        true
      )
    );
  });

  it("should parse sort by lastName asc, age desc page 1,10", () => {
    const query = "sort by lastName asc, age desc page 1,10";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        undefined,
        new Pagination(1, 10),
        [new Sort("lastName", Direction.ASC), new Sort("age", Direction.DESC)],
        false
      )
    );
  });

  it("should throw error with invalid query", () => {
    const query = "invalid query";
    expect(() => QuerityParser.parseQuery(query)).toThrowError(
      /Syntax error at line \d+:\d+ - .+/
    );
  });
});
