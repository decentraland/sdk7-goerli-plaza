# DCL ESLint & Prettier Config

## Installation
```sh
npm install -D @dcl/eslint-config
```

## Usage

In `eslintrc.json`:

```js
{
  "extends": "@dcl/eslint-config",
  "parserOptions": {
    "project": ["tsconfig.json", "test/tsconfig.json"]
  }
}
```


## License

Apache 2.0
