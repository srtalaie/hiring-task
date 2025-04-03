/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-stylistic"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-stylistic/recommended",
  ],
  rules: {
    // Add or override specific rules here
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
