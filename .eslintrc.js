module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:json/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
