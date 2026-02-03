/**
 * Enum representing function categories.
 */
export enum FunctionCategory {
  ARITHMETIC = "ARITHMETIC",
  STRING = "STRING",
  DATE_TIME = "DATE_TIME",
  CONDITIONAL = "CONDITIONAL",
  AGGREGATE = "AGGREGATE",
}

/**
 * Enum representing supported functions in the Querity query language.
 *
 * Functions can be used in:
 * - Filter conditions: `LENGTH(name) > 5`
 * - Projections/selects: `select UPPER(firstName), COUNT(id)`
 * - Sorting: `sort by LENGTH(lastName)`
 */
export enum Function {
  // Arithmetic functions
  ABS = "ABS",
  SQRT = "SQRT",
  MOD = "MOD",

  // String functions
  CONCAT = "CONCAT",
  SUBSTRING = "SUBSTRING",
  TRIM = "TRIM",
  LTRIM = "LTRIM",
  RTRIM = "RTRIM",
  LOWER = "LOWER",
  UPPER = "UPPER",
  LENGTH = "LENGTH",
  LOCATE = "LOCATE",

  // Date/Time functions (nullary)
  CURRENT_DATE = "CURRENT_DATE",
  CURRENT_TIME = "CURRENT_TIME",
  CURRENT_TIMESTAMP = "CURRENT_TIMESTAMP",

  // Logical/Conditional functions
  COALESCE = "COALESCE",
  NULLIF = "NULLIF",

  // Aggregate functions
  COUNT = "COUNT",
  SUM = "SUM",
  AVG = "AVG",
  MIN = "MIN",
  MAX = "MAX",
}

/**
 * Metadata for functions describing argument count and category.
 */
export interface FunctionMetadata {
  argumentCount: number; // -1 = variadic
  category: FunctionCategory;
}

/**
 * Function metadata lookup table.
 */
export const FUNCTION_METADATA: Record<Function, FunctionMetadata> = {
  // Arithmetic
  [Function.ABS]: { argumentCount: 1, category: FunctionCategory.ARITHMETIC },
  [Function.SQRT]: { argumentCount: 1, category: FunctionCategory.ARITHMETIC },
  [Function.MOD]: { argumentCount: 2, category: FunctionCategory.ARITHMETIC },

  // String
  [Function.CONCAT]: { argumentCount: -1, category: FunctionCategory.STRING },
  [Function.SUBSTRING]: { argumentCount: 3, category: FunctionCategory.STRING },
  [Function.TRIM]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.LTRIM]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.RTRIM]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.LOWER]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.UPPER]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.LENGTH]: { argumentCount: 1, category: FunctionCategory.STRING },
  [Function.LOCATE]: { argumentCount: 2, category: FunctionCategory.STRING },

  // Date/Time (nullary)
  [Function.CURRENT_DATE]: {
    argumentCount: 0,
    category: FunctionCategory.DATE_TIME,
  },
  [Function.CURRENT_TIME]: {
    argumentCount: 0,
    category: FunctionCategory.DATE_TIME,
  },
  [Function.CURRENT_TIMESTAMP]: {
    argumentCount: 0,
    category: FunctionCategory.DATE_TIME,
  },

  // Conditional
  [Function.COALESCE]: {
    argumentCount: -1,
    category: FunctionCategory.CONDITIONAL,
  },
  [Function.NULLIF]: {
    argumentCount: 2,
    category: FunctionCategory.CONDITIONAL,
  },

  // Aggregate
  [Function.COUNT]: { argumentCount: 1, category: FunctionCategory.AGGREGATE },
  [Function.SUM]: { argumentCount: 1, category: FunctionCategory.AGGREGATE },
  [Function.AVG]: { argumentCount: 1, category: FunctionCategory.AGGREGATE },
  [Function.MIN]: { argumentCount: 1, category: FunctionCategory.AGGREGATE },
  [Function.MAX]: { argumentCount: 1, category: FunctionCategory.AGGREGATE },
};

/**
 * Checks if a function is an aggregate function.
 */
export function isAggregate(func: Function): boolean {
  return FUNCTION_METADATA[func].category === FunctionCategory.AGGREGATE;
}

/**
 * Checks if a function is variadic (variable number of arguments).
 */
export function isVariadic(func: Function): boolean {
  return FUNCTION_METADATA[func].argumentCount === -1;
}

/**
 * Checks if a function is nullary (no arguments).
 */
export function isNullary(func: Function): boolean {
  return FUNCTION_METADATA[func].argumentCount === 0;
}

/**
 * Returns the minimum number of arguments required for a function.
 */
export function getMinimumArguments(func: Function): number {
  const meta = FUNCTION_METADATA[func];
  if (!isVariadic(func)) {
    return meta.argumentCount;
  }
  // Variadic functions: CONCAT needs at least 2, others need at least 1
  return func === Function.CONCAT ? 2 : 1;
}
