import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default tseslint.config(
  // Global ignores (replaces ignorePatterns)
  {
    ignores: ["src/utils/querity-antlr4/**", "dist/**", "node_modules/**"],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript-ESLint recommended rules
  ...tseslint.configs.recommended,

  // React plugin
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  // React Hooks (classic rules only — not the React Compiler preset)
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // JSX Accessibility
  jsxA11y.flatConfigs.recommended,

  // Import plugin
  importPlugin.flatConfigs.recommended,

  // Prettier (must be last preset to override conflicting rules)
  prettier,

  // Project-wide settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },

  // Custom rules (ported from .eslintrc)
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "prettier/prettier": "warn",
      "react/jsx-props-no-spreading": "off",
      "no-nested-ternary": "off",
      "dot-notation": "off",
      "react/require-default-props": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "react/function-component-definition": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: true,
          peerDependencies: true,
        },
      ],
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/prop-types": "off",
      "default-param-last": "off",
      "import/export": "off",
      "import/prefer-default-export": "off",
    },
  },
);
