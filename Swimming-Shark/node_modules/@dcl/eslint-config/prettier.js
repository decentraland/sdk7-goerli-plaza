const eslintrc = require("./.eslintrc")

module.exports = {
  parserOptions: eslintrc.parserOptions,
  rules: {
    "@typescript-eslint/no-floating-promises": 2,
    "prettier/prettier": eslintrc.rules["prettier/prettier"],
  },
}
