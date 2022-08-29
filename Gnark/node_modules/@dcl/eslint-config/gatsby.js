module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    "@typescript-eslint",
    // TODO: add react
    // 'react',
    "prettier",
    "import",
    "autofix",
    "css-import-order",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // TODO: adding react we will need to add the next line
    // 'plugin:react/recommended',
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:css-import-order/recommended",
  ],
  rules: {
    "import/no-named-as-default-member": "off", // This rule goes
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          "lodash",
          "decentraland-ui",
          "decentraland-dapps",
          "decentraland-connect",
          "decentraland-gatsby",
          "semantic-ui-react",
          "@dcl/schemas",
        ],
        patterns: ["lodash.*"],
      },
    ],

    "autofix/no-debugger": "error",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true, // don't want to sort import lines, use eslint-plugin-import instead
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index",
          "object",
          "type",
          "unknown",
        ],
        pathGroupsExcludedImportTypes: ["react", "gatsby", "react-*"],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "react-*",
            group: "builtin",
          },
          {
            pattern: "gatsby",
            group: "builtin",
          },
          {
            pattern: "decentraland-*",
            group: "internal",
          },
          {
            pattern: "semantic-ui-react",
            group: "internal",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {},
      "babel-module": {},
    },
  },
};
