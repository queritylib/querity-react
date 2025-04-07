import { describe, expect, test } from "@jest/globals";
import { Operator } from "./Operator";

describe("Query", () => {
  test("should serialize operator as string", () => {
    const query = {
      filter: {
        and: [
          {
            propertyName: "name",
            operator: Operator.EQUALS,
            value: "John",
          },
          {
            propertyName: "age",
            operator: Operator.GREATER_THAN,
            value: 30,
          },
        ],
      },
    };
    const json = JSON.stringify(query);
    expect(json).toEqual(
      `{"filter":{"and":[{"propertyName":"name","operator":"EQUALS","value":"John"},{"propertyName":"age","operator":"GREATER_THAN","value":30}]}}`
    );
  });
});
