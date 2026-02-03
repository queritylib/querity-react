import { describe, expect, it } from "@jest/globals";
import {
  FunctionCall,
  Function,
  PropertyReference,
  Literal,
  SimpleCondition,
  Operator,
  FieldReference,
  SimpleSelect,
  SimpleGroupBy,
  AdvancedQuery,
} from "./index";

describe("FunctionCall", () => {
  describe("argument validation", () => {
    it("should create FunctionCall with correct argument count", () => {
      const fc = FunctionCall.of(Function.UPPER, PropertyReference.of("name"));
      expect(fc.func).toBe(Function.UPPER);
      expect(fc.args).toHaveLength(1);
    });

    it("should reject nullary function with arguments", () => {
      expect(() => {
        FunctionCall.of(Function.CURRENT_DATE, PropertyReference.of("x"));
      }).toThrow(/does not accept any arguments/);
    });

    it("should allow nullary function without arguments", () => {
      const fc = FunctionCall.of(Function.CURRENT_DATE);
      expect(fc.func).toBe(Function.CURRENT_DATE);
      expect(fc.args).toHaveLength(0);
    });

    it("should reject fixed-arg function with wrong argument count", () => {
      expect(() => {
        FunctionCall.of(Function.UPPER, PropertyReference.of("a"), PropertyReference.of("b"));
      }).toThrow(/requires 1 argument\(s\)/);
    });

    it("should allow variadic function with multiple arguments", () => {
      const fc = FunctionCall.of(
        Function.CONCAT,
        PropertyReference.of("a"),
        Literal.of(" "),
        PropertyReference.of("b")
      );
      expect(fc.args).toHaveLength(3);
    });

    it("should reject variadic function CONCAT with less than 2 arguments", () => {
      expect(() => {
        FunctionCall.of(Function.CONCAT, PropertyReference.of("a"));
      }).toThrow(/requires at least 2 argument\(s\)/);
    });

    it("should allow COALESCE with 1 argument (variadic minimum = 1)", () => {
      const fc = FunctionCall.of(Function.COALESCE, PropertyReference.of("a"));
      expect(fc.args).toHaveLength(1);
    });
  });

  describe("toExpressionString", () => {
    it("should render simple function call", () => {
      const fc = FunctionCall.of(Function.UPPER, PropertyReference.of("name"));
      expect(fc.toExpressionString()).toBe("UPPER(name)");
    });

    it("should render nullary function without parentheses", () => {
      const fc = FunctionCall.of(Function.CURRENT_DATE);
      expect(fc.toExpressionString()).toBe("CURRENT_DATE");
    });

    it("should render function with alias", () => {
      const fc = FunctionCall.of(Function.COUNT, PropertyReference.of("id")).as("total");
      expect(fc.toExpressionString()).toBe("COUNT(id) AS total");
    });

    it("should render nested function calls", () => {
      const fc = FunctionCall.of(
        Function.LENGTH,
        FunctionCall.of(Function.TRIM, PropertyReference.of("name"))
      );
      expect(fc.toExpressionString()).toBe("LENGTH(TRIM(name))");
    });

    it("should render function with literal argument", () => {
      const fc = FunctionCall.of(
        Function.CONCAT,
        PropertyReference.of("firstName"),
        Literal.of(" - "),
        PropertyReference.of("lastName")
      );
      expect(fc.toExpressionString()).toBe('CONCAT(firstName, " - ", lastName)');
    });
  });

  describe("alias", () => {
    it("should not have alias by default", () => {
      const fc = FunctionCall.of(Function.COUNT, PropertyReference.of("id"));
      expect(fc.hasAlias()).toBe(false);
      expect(fc.alias).toBeUndefined();
    });

    it("should have alias after as() call", () => {
      const fc = FunctionCall.of(Function.COUNT, PropertyReference.of("id")).as("cnt");
      expect(fc.hasAlias()).toBe(true);
      expect(fc.alias).toBe("cnt");
    });
  });
});

describe("PropertyReference", () => {
  it("should create with property name", () => {
    const pr = PropertyReference.of("firstName");
    expect(pr.propertyName).toBe("firstName");
    expect(pr.toExpressionString()).toBe("firstName");
  });

  it("should support alias", () => {
    const pr = PropertyReference.of("firstName").as("name");
    expect(pr.propertyName).toBe("firstName");
    expect(pr.alias).toBe("name");
    expect(pr.hasAlias()).toBe(true);
  });
});

describe("Literal", () => {
  it("should wrap string value", () => {
    const lit = Literal.of("hello");
    expect(lit.value).toBe("hello");
    expect(lit.toString()).toBe('"hello"');
  });

  it("should wrap number value", () => {
    const lit = Literal.of(42);
    expect(lit.value).toBe(42);
    expect(lit.toString()).toBe("42");
  });

  it("should wrap boolean value", () => {
    const lit = Literal.of(true);
    expect(lit.value).toBe(true);
    expect(lit.toString()).toBe("true");
  });
});

describe("FieldReference", () => {
  it("should create with field name", () => {
    const fr = FieldReference.of("endDate");
    expect(fr.fieldName).toBe("endDate");
  });
});

describe("SimpleCondition", () => {
  describe("field reference validation", () => {
    it("should allow field reference with EQUALS", () => {
      const sc = new SimpleCondition("a", Operator.EQUALS, FieldReference.of("b"));
      expect(sc.isFieldReference()).toBe(true);
    });

    it("should allow field reference with NOT_EQUALS", () => {
      const sc = new SimpleCondition("a", Operator.NOT_EQUALS, FieldReference.of("b"));
      expect(sc.isFieldReference()).toBe(true);
    });

    it("should allow field reference with comparison operators", () => {
      expect(() => new SimpleCondition("a", Operator.GREATER_THAN, FieldReference.of("b"))).not.toThrow();
      expect(() => new SimpleCondition("a", Operator.LESSER_THAN, FieldReference.of("b"))).not.toThrow();
      expect(() => new SimpleCondition("a", Operator.GREATER_THAN_EQUALS, FieldReference.of("b"))).not.toThrow();
      expect(() => new SimpleCondition("a", Operator.LESSER_THAN_EQUALS, FieldReference.of("b"))).not.toThrow();
    });

    it("should reject field reference with STARTS_WITH", () => {
      expect(() => {
        new SimpleCondition("a", Operator.STARTS_WITH, FieldReference.of("b"));
      }).toThrow(/does not support field-to-field comparison/);
    });

    it("should reject field reference with ENDS_WITH", () => {
      expect(() => {
        new SimpleCondition("a", Operator.ENDS_WITH, FieldReference.of("b"));
      }).toThrow(/does not support field-to-field comparison/);
    });

    it("should reject field reference with CONTAINS", () => {
      expect(() => {
        new SimpleCondition("a", Operator.CONTAINS, FieldReference.of("b"));
      }).toThrow(/does not support field-to-field comparison/);
    });

    it("should reject field reference with IN", () => {
      expect(() => {
        new SimpleCondition("a", Operator.IN, FieldReference.of("b"));
      }).toThrow(/does not support field-to-field comparison/);
    });

    it("should reject field reference with NOT_IN", () => {
      expect(() => {
        new SimpleCondition("a", Operator.NOT_IN, FieldReference.of("b"));
      }).toThrow(/does not support field-to-field comparison/);
    });
  });

  describe("expression-based conditions", () => {
    it("should accept PropertyExpression as left side", () => {
      const sc = SimpleCondition.ofExpression(
        FunctionCall.of(Function.UPPER, PropertyReference.of("name")),
        Operator.EQUALS,
        "JOHN"
      );
      expect(sc.hasLeftExpression()).toBe(true);
      expect(sc.propertyName).toBeUndefined();
    });

    it("should extract propertyName from PropertyReference", () => {
      const sc = SimpleCondition.ofExpression(
        PropertyReference.of("lastName"),
        Operator.EQUALS,
        "Smith"
      );
      expect(sc.propertyName).toBe("lastName");
      expect(sc.hasLeftExpression()).toBe(false);
    });
  });
});

describe("SimpleSelect", () => {
  it("should create from property names", () => {
    const ss = SimpleSelect.of("a", "b", "c");
    expect(ss.propertyNames).toEqual(["a", "b", "c"]);
    expect(ss.hasPropertyNames()).toBe(true);
    expect(ss.hasExpressions()).toBe(false);
  });

  it("should create from expressions", () => {
    const ss = SimpleSelect.ofExpressions(
      PropertyReference.of("name"),
      FunctionCall.of(Function.COUNT, PropertyReference.of("id"))
    );
    expect(ss.expressions).toHaveLength(2);
    expect(ss.hasExpressions()).toBe(true);
    expect(ss.hasPropertyNames()).toBe(false);
  });

  it("should reject empty select", () => {
    expect(() => new SimpleSelect([], [])).toThrow(/Either propertyNames or expressions must be set/);
  });

  it("should return effective expressions", () => {
    const ss = SimpleSelect.of("a", "b");
    const effective = ss.getEffectiveExpressions();
    expect(effective).toHaveLength(2);
    expect(effective[0]).toBeInstanceOf(PropertyReference);
    expect((effective[0] as PropertyReference).propertyName).toBe("a");
  });
});

describe("SimpleGroupBy", () => {
  it("should create from property names", () => {
    const sg = SimpleGroupBy.of("category", "region");
    expect(sg.propertyNames).toEqual(["category", "region"]);
  });

  it("should create from expressions", () => {
    const sg = SimpleGroupBy.ofExpressions(
      FunctionCall.of(Function.UPPER, PropertyReference.of("category"))
    );
    expect(sg.expressions).toHaveLength(1);
  });

  it("should reject empty group by", () => {
    expect(() => new SimpleGroupBy([], [])).toThrow(/Either propertyNames or expressions must be set/);
  });
});

describe("AdvancedQuery", () => {
  it("should validate HAVING requires GROUP BY", () => {
    expect(() => {
      AdvancedQuery.builder()
        .having(new SimpleCondition("count", Operator.GREATER_THAN, 5))
        .build();
    }).toThrow(/HAVING clause requires a GROUP BY clause/);
  });

  it("should allow HAVING with GROUP BY", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("category"))
      .groupBy(SimpleGroupBy.of("category"))
      .having(new SimpleCondition("count", Operator.GREATER_THAN, 5))
      .build();
    expect(query.hasHaving()).toBe(true);
    expect(query.hasGroupBy()).toBe(true);
  });

  it("should support all builder methods", () => {
    const query = AdvancedQuery.builder()
      .select(SimpleSelect.of("name"))
      .filter(new SimpleCondition("active", Operator.EQUALS, true))
      .groupBy(SimpleGroupBy.of("category"))
      .having(new SimpleCondition("count", Operator.GREATER_THAN, 0))
      .sort(new (require("./Sort").Sort)("name", require("./Sort").Direction.ASC))
      .pagination(1, 25)
      .distinct()
      .build();

    expect(query.hasSelect()).toBe(true);
    expect(query.hasFilter()).toBe(true);
    expect(query.hasGroupBy()).toBe(true);
    expect(query.hasHaving()).toBe(true);
    expect(query.hasSort()).toBe(true);
    expect(query.hasPagination()).toBe(true);
    expect(query.distinct).toBe(true);
  });
});
