import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: 'readonly',
        EventListener: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
    },
  },
];
