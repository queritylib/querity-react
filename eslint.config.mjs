import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importX from "eslint-plugin-import-x";
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

  // React plugin (@eslint-react: eslint-plugin-react has no ESLint 10 support)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [eslintReact.configs.recommended],
  },
  // Let eslint-plugin-react-hooks own the hooks rules
  eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"],

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

  // Import plugin (eslint-plugin-import-x: the maintained fork with ESLint 10 support)
  importX.flatConfigs.recommended,

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
      "import-x/resolver": {
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
      "no-nested-ternary": "off",
      "dot-notation": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: true,
          peerDependencies: true,
        },
      ],
      "default-param-last": "off",
      // Rules @eslint-react adds that eslint-plugin-react had no equivalent
      // for. Kept off so this migration is lint-neutral; triage separately.
      "@eslint-react/static-components": "off",
      "@eslint-react/set-state-in-effect": "off",
      "@eslint-react/no-use-context": "off",
      "import-x/export": "off",
      "import-x/prefer-default-export": "off",
    },
  },
);
