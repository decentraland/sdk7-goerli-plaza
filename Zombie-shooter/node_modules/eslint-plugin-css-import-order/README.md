# eslint-plugin-css-import-order
Adds a simple eslint rule to correctly order css imports

[![npm version](https://badge.fury.io/js/eslint-plugin-css-import-order.svg)](https://badge.fury.io/js/eslint-plugin-css-import-order)

# Concept

This rule allows to properly order and indent css imports. For example, this:
```js
import A from "module-a";
import "./my-css.css";
import B from "./module-b";
```

Will be converted to:
```js
import A from "module-a";
import B from "./module-b";

import "./my-css.css";
```

So css imports are not mixed with regular imports.

# Installation

Simply install the package: `npm i -D eslint-plugin-css-import-order` or `yarn add -D eslint-plugin-css-import-order`.

Then in your `.eslintrc` add:

```json
{
  "plugins": ["css-import-order"],
  "extends": ["plugin:css-import-order/recommended"]
}
```
