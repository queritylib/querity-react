import { describe, expect, it } from "@jest/globals";
import { QuerityParser } from "./QuerityParser";
import {
  AdvancedQuery,
  ConditionWrapper,
  Direction,
  FieldReference,
  Function,
  FunctionCall,
  Literal,
  LogicOperator,
  NotCondition,
  Operator,
  Pagination,
  PropertyReference,
  Query,
  SimpleCondition,
  SimpleGroupBy,
  SimpleSelect,
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
    expect(() => QuerityParser.parseQuery(query)).toThrow(
      /Syntax error at line \d+:\d+ - .+/
    );
  });

  it('should parse where lastName="Skywalker"', () => {
    const query = 'where lastName="Skywalker"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"))
    );
  });

  it("should parse backtick-escaped property name", () => {
    const query = '`my-property`="value"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(new SimpleCondition("my-property", Operator.EQUALS, "value"))
    );
  });

  it("should parse backtick-escaped property name with spaces", () => {
    const query = '`property with spaces`="value"';
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(
        new SimpleCondition("property with spaces", Operator.EQUALS, "value")
      )
    );
  });

  it("should parse query with only pagination", () => {
    const query = "page 1,25";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(undefined, new Pagination(1, 25), [], false)
    );
  });

  it("should parse query with only sort", () => {
    const query = "sort by firstName";
    const result = QuerityParser.parseQuery(query);
    expect(result).toEqual(
      new Query(undefined, undefined, [new Sort("firstName", Direction.ASC)])
    );
  });

  // ==========================================
  // FieldReference tests
  // ==========================================

  it("should parse field reference comparison startDate < endDate", () => {
    const query = "startDate < endDate";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(Query);
    const filter = result.filter as SimpleCondition;
    expect(filter).toBeInstanceOf(SimpleCondition);
    expect(filter.propertyName).toBe("startDate");
    expect(filter.operator).toBe(Operator.LESSER_THAN);
    expect(filter.value).toBeInstanceOf(FieldReference);
    expect((filter.value as FieldReference).fieldName).toBe("endDate");
  });

  it("should parse field reference equality firstName = lastName", () => {
    const query = "firstName = lastName";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(Query);
    const filter = result.filter as SimpleCondition;
    expect(filter.propertyName).toBe("firstName");
    expect(filter.operator).toBe(Operator.EQUALS);
    expect(filter.value).toBeInstanceOf(FieldReference);
    expect((filter.value as FieldReference).fieldName).toBe("lastName");
  });

  it("should parse nested field reference address.startDate < address.endDate", () => {
    const query = "address.startDate < address.endDate";
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.propertyName).toBe("address.startDate");
    expect(filter.value).toBeInstanceOf(FieldReference);
    expect((filter.value as FieldReference).fieldName).toBe("address.endDate");
  });

  // ==========================================
  // FunctionCall in conditions tests
  // ==========================================

  it("should parse LENGTH(name) > 5", () => {
    const query = "LENGTH(name) > 5";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(Query);
    const filter = result.filter as SimpleCondition;
    expect(filter).toBeInstanceOf(SimpleCondition);
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.LENGTH);
    expect(func.args).toHaveLength(1);
    expect(func.args[0]).toBeInstanceOf(PropertyReference);
    expect((func.args[0] as PropertyReference).propertyName).toBe("name");
    expect(filter.operator).toBe(Operator.GREATER_THAN);
    expect(filter.value).toBe(5);
  });

  it("should parse UPPER(lastName) = \"SKYWALKER\"", () => {
    const query = 'UPPER(lastName) = "SKYWALKER"';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.UPPER);
    expect(filter.operator).toBe(Operator.EQUALS);
    expect(filter.value).toBe("SKYWALKER");
  });

  it("should parse LOWER(firstName) contains \"luke\"", () => {
    const query = 'LOWER(firstName) contains "luke"';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.LOWER);
    expect(filter.operator).toBe(Operator.CONTAINS);
    expect(filter.value).toBe("luke");
  });

  it("should parse ABS(balance) >= 100", () => {
    const query = "ABS(balance) >= 100";
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.ABS);
    expect(filter.operator).toBe(Operator.GREATER_THAN_EQUALS);
    expect(filter.value).toBe(100);
  });

  it("should parse nested function UPPER(TRIM(name)) = \"TEST\"", () => {
    const query = 'UPPER(TRIM(name)) = "TEST"';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const outerFunc = filter.leftExpression as FunctionCall;
    expect(outerFunc.func).toBe(Function.UPPER);
    expect(outerFunc.args).toHaveLength(1);
    expect(outerFunc.args[0]).toBeInstanceOf(FunctionCall);
    const innerFunc = outerFunc.args[0] as FunctionCall;
    expect(innerFunc.func).toBe(Function.TRIM);
  });

  // ==========================================
  // Nullary function tests
  // ==========================================

  it("should parse CURRENT_DATE on left side of condition", () => {
    const query = "CURRENT_DATE > createdDate";
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.CURRENT_DATE);
    expect(func.args).toHaveLength(0);
    expect(filter.operator).toBe(Operator.GREATER_THAN);
  });

  // ==========================================
  // Function with multiple arguments tests
  // ==========================================

  it("should parse MOD(quantity, 2) = 0", () => {
    const query = "MOD(quantity, 2) = 0";
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.MOD);
    expect(func.args).toHaveLength(2);
    expect((func.args[0] as PropertyReference).propertyName).toBe("quantity");
    expect((func.args[1] as Literal).value).toBe(2);
    expect(filter.value).toBe(0);
  });

  it("should parse SUBSTRING(name, 1, 3) = \"Sky\"", () => {
    const query = 'SUBSTRING(name, 1, 3) = "Sky"';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.SUBSTRING);
    expect(func.args).toHaveLength(3);
    expect(filter.value).toBe("Sky");
  });

  it("should parse LOCATE(\"@\", email) > 0", () => {
    const query = 'LOCATE("@", email) > 0';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.LOCATE);
    expect(func.args).toHaveLength(2);
    expect(filter.operator).toBe(Operator.GREATER_THAN);
    expect(filter.value).toBe(0);
  });

  // ==========================================
  // Function with condition wrappers tests
  // ==========================================

  it("should parse and(LENGTH(firstName) > 3, LENGTH(lastName) > 5)", () => {
    const query = "and(LENGTH(firstName) > 3, LENGTH(lastName) > 5)";
    const result = QuerityParser.parseQuery(query);
    expect(result.filter).toBeInstanceOf(ConditionWrapper);
    const wrapper = result.filter as ConditionWrapper;
    expect(wrapper.operator).toBe(LogicOperator.AND);
    expect(wrapper.conditions).toHaveLength(2);

    const cond1 = wrapper.conditions[0] as SimpleCondition;
    expect(cond1.leftExpression).toBeInstanceOf(FunctionCall);
    expect((cond1.leftExpression as FunctionCall).func).toBe(Function.LENGTH);

    const cond2 = wrapper.conditions[1] as SimpleCondition;
    expect(cond2.leftExpression).toBeInstanceOf(FunctionCall);
    expect((cond2.leftExpression as FunctionCall).func).toBe(Function.LENGTH);
  });

  // ==========================================
  // Sort with function expression tests
  // ==========================================

  it("should parse sort by LENGTH(lastName) desc", () => {
    const query = "sort by LENGTH(lastName) desc";
    const result = QuerityParser.parseQuery(query);
    expect(result.sort).toHaveLength(1);
    const sort = result.sort[0];
    expect(sort.direction).toBe(Direction.DESC);
    expect(sort.expression).toBeInstanceOf(FunctionCall);
    const func = sort.expression as FunctionCall;
    expect(func.func).toBe(Function.LENGTH);
  });

  it("should parse sort by UPPER(lastName) asc, age desc", () => {
    const query = "sort by UPPER(lastName) asc, age desc";
    const result = QuerityParser.parseQuery(query);
    expect(result.sort).toHaveLength(2);

    const sort1 = result.sort[0];
    expect(sort1.direction).toBe(Direction.ASC);
    expect(sort1.expression).toBeInstanceOf(FunctionCall);

    const sort2 = result.sort[1];
    expect(sort2.propertyName).toBe("age");
    expect(sort2.direction).toBe(Direction.DESC);
  });

  // ==========================================
  // AdvancedQuery with SELECT tests
  // ==========================================

  it("should parse select firstName, lastName", () => {
    const query = "select firstName, lastName";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.hasSelect()).toBe(true);
    expect(advQuery.select).toBeInstanceOf(SimpleSelect);
    const select = advQuery.select as SimpleSelect;
    expect(select.propertyNames).toEqual(["firstName", "lastName"]);
  });

  it("should parse select with filter: select firstName, lastName where age > 30", () => {
    const query = "select firstName, lastName where age > 30";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.hasSelect()).toBe(true);
    expect(advQuery.hasFilter()).toBe(true);
    const filter = advQuery.filter as SimpleCondition;
    expect(filter.propertyName).toBe("age");
    expect(filter.operator).toBe(Operator.GREATER_THAN);
  });

  it("should parse select with function expression: select COUNT(id), lastName", () => {
    const query = "select COUNT(id), lastName";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    expect(select.hasExpressions()).toBe(true);
    // When any field is a function, all fields are stored as expressions
    const expressions = select.expressions;
    expect(expressions).toHaveLength(2);
    expect(expressions[0]).toBeInstanceOf(FunctionCall);
    expect((expressions[0] as FunctionCall).func).toBe(Function.COUNT);
    expect(expressions[1]).toBeInstanceOf(PropertyReference);
    expect((expressions[1] as PropertyReference).propertyName).toBe("lastName");
  });

  it("should parse select with aggregate functions: select SUM(amount), AVG(quantity)", () => {
    const query = "select SUM(amount), AVG(quantity)";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    const expressions = select.expressions;
    expect(expressions).toHaveLength(2);
    expect((expressions[0] as FunctionCall).func).toBe(Function.SUM);
    expect((expressions[1] as FunctionCall).func).toBe(Function.AVG);
  });

  it("should parse select with alias: select COUNT(id) AS total", () => {
    const query = "select COUNT(id) AS total";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    const expressions = select.expressions;
    expect(expressions).toHaveLength(1);
    const funcCall = expressions[0] as FunctionCall;
    expect(funcCall.func).toBe(Function.COUNT);
    expect(funcCall.hasAlias()).toBe(true);
    expect(funcCall.alias).toBe("total");
  });

  // ==========================================
  // AdvancedQuery with GROUP BY tests
  // ==========================================

  it("should parse select with group by: select category, COUNT(id) group by category", () => {
    const query = "select category, COUNT(id) group by category";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.hasSelect()).toBe(true);
    expect(advQuery.hasGroupBy()).toBe(true);
    const groupBy = advQuery.groupBy as SimpleGroupBy;
    expect(groupBy.propertyNames).toEqual(["category"]);
  });

  it("should parse group by with multiple columns: select category, status, COUNT(id) group by category, status", () => {
    const query = "select category, status, COUNT(id) group by category, status";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const groupBy = advQuery.groupBy as SimpleGroupBy;
    expect(groupBy.propertyNames).toContain("category");
    expect(groupBy.propertyNames).toContain("status");
  });

  it("should parse group by with function expression: select UPPER(category), COUNT(id) group by UPPER(category)", () => {
    const query = "select UPPER(category), COUNT(id) group by UPPER(category)";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const groupBy = advQuery.groupBy as SimpleGroupBy;
    expect(groupBy.hasExpressions()).toBe(true);
    const expressions = groupBy.expressions;
    expect(expressions).toHaveLength(1);
    expect((expressions[0] as FunctionCall).func).toBe(Function.UPPER);
  });

  // ==========================================
  // AdvancedQuery with HAVING tests
  // ==========================================

  it("should parse group by with having: select category, COUNT(id) group by category having COUNT(id) > 5", () => {
    const query =
      "select category, COUNT(id) group by category having COUNT(id) > 5";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.hasGroupBy()).toBe(true);
    expect(advQuery.hasHaving()).toBe(true);
    const having = advQuery.having as SimpleCondition;
    expect(having.leftExpression).toBeInstanceOf(FunctionCall);
    expect((having.leftExpression as FunctionCall).func).toBe(Function.COUNT);
    expect(having.operator).toBe(Operator.GREATER_THAN);
    expect(having.value).toBe(5);
  });

  it("should parse complex having with AND: select category, SUM(amount) group by category having SUM(amount) > 100 and COUNT(id) > 10", () => {
    const query =
      "select category, SUM(amount) group by category having and(SUM(amount) > 100, COUNT(id) > 10)";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.hasHaving()).toBe(true);
    expect(advQuery.having).toBeInstanceOf(ConditionWrapper);
    const havingWrapper = advQuery.having as ConditionWrapper;
    expect(havingWrapper.operator).toBe(LogicOperator.AND);
    expect(havingWrapper.conditions).toHaveLength(2);
  });

  // ==========================================
  // Complete AdvancedQuery tests
  // ==========================================

  it("should parse complete advanced query with select, where, group by, having, sort, and pagination", () => {
    const query =
      'select category, COUNT(id) AS total where status = "active" group by category having COUNT(id) > 5 sort by total desc page 1,10';
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;

    // Check select - when functions are present, all fields become expressions
    expect(advQuery.hasSelect()).toBe(true);
    const select = advQuery.select as SimpleSelect;
    expect(select.hasExpressions()).toBe(true);
    const expressions = select.expressions;
    expect(expressions.length).toBeGreaterThanOrEqual(2);
    // First expression should be category as PropertyReference
    expect(expressions[0]).toBeInstanceOf(PropertyReference);
    expect((expressions[0] as PropertyReference).propertyName).toBe("category");
    // Second expression should be COUNT(id) with alias
    expect(expressions[1]).toBeInstanceOf(FunctionCall);
    expect((expressions[1] as FunctionCall).func).toBe(Function.COUNT);
    expect((expressions[1] as FunctionCall).alias).toBe("total");

    // Check filter
    expect(advQuery.hasFilter()).toBe(true);

    // Check group by
    expect(advQuery.hasGroupBy()).toBe(true);

    // Check having
    expect(advQuery.hasHaving()).toBe(true);

    // Check sort
    expect(advQuery.hasSort()).toBe(true);
    expect(advQuery.sort).toHaveLength(1);

    // Check pagination
    expect(advQuery.hasPagination()).toBe(true);
    expect(advQuery.pagination?.page).toBe(1);
    expect(advQuery.pagination?.pageSize).toBe(10);
  });

  it("should parse distinct select: distinct select firstName, lastName", () => {
    const query = "distinct select firstName, lastName";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    expect(advQuery.distinct).toBe(true);
    expect(advQuery.hasSelect()).toBe(true);
  });

  // ==========================================
  // PropertyReference tests in select
  // ==========================================

  it("should parse select with nested property: select address.city, address.country", () => {
    const query = "select address.city, address.country";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    expect(select.propertyNames).toContain("address.city");
    expect(select.propertyNames).toContain("address.country");
  });

  it("should parse select with backtick-escaped property: select `my-field`, `another field`", () => {
    const query = "select `my-field`, `another field`";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    expect(select.propertyNames).toContain("my-field");
    expect(select.propertyNames).toContain("another field");
  });

  // ==========================================
  // Aggregate function tests
  // ==========================================

  it("should parse MIN and MAX functions: select MIN(price), MAX(price)", () => {
    const query = "select MIN(price), MAX(price)";
    const result = QuerityParser.parseQuery(query);
    expect(result).toBeInstanceOf(AdvancedQuery);
    const advQuery = result as AdvancedQuery;
    const select = advQuery.select as SimpleSelect;
    const expressions = select.expressions;
    expect(expressions).toHaveLength(2);
    expect((expressions[0] as FunctionCall).func).toBe(Function.MIN);
    expect((expressions[1] as FunctionCall).func).toBe(Function.MAX);
  });

  // ==========================================
  // COALESCE and other conditional functions
  // ==========================================

  it("should parse COALESCE(nickname, firstName) = \"Luke\"", () => {
    const query = 'COALESCE(nickname, firstName) = "Luke"';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.COALESCE);
    expect(func.args).toHaveLength(2);
  });

  it("should parse NULLIF(status, \"inactive\") is not null", () => {
    const query = 'NULLIF(status, "inactive") is not null';
    const result = QuerityParser.parseQuery(query);
    const filter = result.filter as SimpleCondition;
    expect(filter.leftExpression).toBeInstanceOf(FunctionCall);
    const func = filter.leftExpression as FunctionCall;
    expect(func.func).toBe(Function.NULLIF);
    expect(filter.operator).toBe(Operator.IS_NOT_NULL);
  });

  // ==========================================
  // Error case tests
  // ==========================================

  it("should throw error for HAVING without GROUP BY", () => {
    // This depends on whether the parser validates this or defers to AdvancedQuery constructor
    const query = "select COUNT(id) having COUNT(id) > 5";
    // If the parser creates AdvancedQuery, the constructor should throw
    expect(() => QuerityParser.parseQuery(query)).toThrow();
  });
});
