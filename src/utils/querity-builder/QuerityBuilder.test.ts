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
  AdvancedQuery,
  SimpleSelect,
  SimpleGroupBy,
  FunctionCall,
  Function,
  PropertyReference,
  FieldReference,
  Literal,
} from "../../models";

describe("QuerityBuilder", () => {
  it('should build lastName="Skywalker" with Query constructor', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.EQUALS, "Skywalker"),
      undefined, // pagination
      [], // sort
      false // distinct
    );
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

  it('should build lastName in ("Skywalker","Solo")', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.IN, ["Skywalker", "Solo"])
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName in ("Skywalker","Solo")');
  });

  it('should build lastName not in ("Skywalker","Solo")', () => {
    const query = new Query(
      new SimpleCondition("lastName", Operator.NOT_IN, ["Skywalker", "Solo"])
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('lastName not in ("Skywalker","Solo")');
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

  it("should build query with only pagination", () => {
    const query = new Query(undefined, new Pagination(1, 25), [], false);
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("page 1,25");
  });

  it("should build query with only sort", () => {
    const query = new Query(
      undefined,
      undefined,
      [new Sort("firstName", Direction.ASC)],
      false
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("sort by firstName asc");
  });

  it("should build empty query", () => {
    const query = new Query(undefined, undefined, [], false);
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("");
  });
});

describe("QuerityBuilder - AdvancedQuery", () => {
  it("should build AdvancedQuery with simple select", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("firstName", "lastName"))
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select firstName, lastName");
  });

  it("should build AdvancedQuery with select and filter", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("firstName", "lastName"))
      .filter(new SimpleCondition("age", Operator.GREATER_THAN, 18))
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select firstName, lastName age > 18");
  });

  it("should build AdvancedQuery with group by", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("category"))
      .groupBy(SimpleGroupBy.of("category"))
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select category group by category");
  });

  it("should build AdvancedQuery with select, group by, and having", () => {
    const query = AdvancedQuery.builder()
      .select(
        SimpleSelect.ofExpressions(
          PropertyReference.of("category"),
          FunctionCall.of(Function.COUNT, PropertyReference.of("id"))
        )
      )
      .groupBy(SimpleGroupBy.of("category"))
      .having(
        SimpleCondition.ofExpression(
          FunctionCall.of(Function.COUNT, PropertyReference.of("id")),
          Operator.GREATER_THAN,
          10
        )
      )
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe(
      "select category, COUNT(id) group by category having COUNT(id) > 10"
    );
  });

  it("should build AdvancedQuery with distinct", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("category"))
      .distinct()
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select category distinct");
  });

  it("should build AdvancedQuery with sort and pagination", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("firstName", "lastName"))
      .sort(new Sort("lastName", Direction.ASC))
      .pagination(1, 10)
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select firstName, lastName sort by lastName asc page 1,10");
  });
});

describe("QuerityBuilder - FunctionCall", () => {
  it("should build condition with UPPER function", () => {
    const query = new Query(
      SimpleCondition.ofExpression(
        FunctionCall.of(Function.UPPER, PropertyReference.of("lastName")),
        Operator.EQUALS,
        "SKYWALKER"
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('UPPER(lastName) = "SKYWALKER"');
  });

  it("should build condition with LENGTH function", () => {
    const query = new Query(
      SimpleCondition.ofExpression(
        FunctionCall.of(Function.LENGTH, PropertyReference.of("name")),
        Operator.GREATER_THAN,
        5
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("LENGTH(name) > 5");
  });

  it("should build condition with nested function calls", () => {
    const query = new Query(
      SimpleCondition.ofExpression(
        FunctionCall.of(
          Function.LENGTH,
          FunctionCall.of(Function.TRIM, PropertyReference.of("name"))
        ),
        Operator.GREATER_THAN,
        0
      )
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("LENGTH(TRIM(name)) > 0");
  });

  it("should build select with function call and alias", () => {
    const query = AdvancedQuery.builder()
      .select(
        SimpleSelect.ofExpressions(
          FunctionCall.of(Function.COUNT, PropertyReference.of("id")).as("total")
        )
      )
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select COUNT(id) as total");
  });

  it("should build CONCAT function with multiple arguments", () => {
    const query = AdvancedQuery.builder()
      .select(
        SimpleSelect.ofExpressions(
          FunctionCall.of(
            Function.CONCAT,
            PropertyReference.of("firstName"),
            Literal.of(" "),
            PropertyReference.of("lastName")
          )
        )
      )
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe('select CONCAT(firstName, " ", lastName)');
  });

  it("should build sort with function expression", () => {
    const query = new Query(
      undefined,
      undefined,
      [Sort.ofExpression(FunctionCall.of(Function.LENGTH, PropertyReference.of("name")), Direction.DESC)]
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("sort by LENGTH(name) desc");
  });
});

describe("QuerityBuilder - FieldReference", () => {
  it("should build condition with field reference", () => {
    const query = new Query(
      new SimpleCondition("startDate", Operator.LESSER_THAN, FieldReference.of("endDate"))
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("startDate < endDate");
  });

  it("should build condition comparing two fields with equals", () => {
    const query = new Query(
      new SimpleCondition("firstName", Operator.EQUALS, FieldReference.of("lastName"))
    );
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("firstName = lastName");
  });

  it("should reject field reference for unsupported operators", () => {
    expect(() => {
      new SimpleCondition("name", Operator.STARTS_WITH, FieldReference.of("other"));
    }).toThrow();
  });
});

describe("QuerityBuilder - PropertyReference with alias", () => {
  it("should build select with property reference alias", () => {
    const query = AdvancedQuery.builder()
      .select(
        SimpleSelect.ofExpressions(
          PropertyReference.of("firstName").as("name")
        )
      )
      .build();
    const result = QuerityBuilder.buildQuery(query);
    expect(result).toBe("select firstName as name");
  });
});
