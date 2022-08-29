# common-schemas

```bash
npm i @dcl/schemas
```

### Design considerations

- The main entrypoint of the library export types only (and the helper functions to prevent lockin)
- Every type is also a namespace
- Type names are PascalCase
- Validators and schemas are camelCase

## Generating types, validators and schemas

We will export types that also act as values. We do that using the "namespaces" of typescript. That is, every type is also a JS object, including two properties: `schema` and `validate`. It can also be a const, but a namespace _sounds_ better.

```ts
// Declare type
export type MyType = {
  value: number;
};

// Declare namespace for the type
export namespace MyType {
  export const schema: Schema<MyType> = {
    type: "object",
    properties: {
      value: { type: number },
    },
    additionalProperties: false,
    required: ["value"],
  };

  export const validate = generateValidator<MyType>(schema);
}
```

In that sense, MyType can be both used as type `const a: MyType` and as object `MyType.validate(a)`.

## Type ownership

Please add types and schemas of your domain into the `src/<team>` folder, also add your team to the [CODEOWNERS](.github/CODEOWNERS) repository to make sure nobody accidentally changes it without your team noticing it.

## Informing changes

Please notify about changes to the schemas to the teams by adding the whole team (i.e. `@decentraland/dapps`) as reviewers of the pull requests.

It is recommended that if you are a stakeholder of the interoperable parts of Decentraland, you are subscribed to this repository (wathing it in the button up right).

## Making changes

To make sure everybody is aware of changes in types, we have a process of api-extraction using https://api-extractor.com. It creates [a report file](report/schemas.api.md) that should be reviewed upon every change and committed as part of the PR.

To generate the file with your changes run `npm run build && npm run refresh-api`.

In the CI, `npm run check-api` is executed to verify the generated file matches the exported types.

## Versions and publishing

Versions are handled manually using Github releases and semver.

Main branch is automatically published to the `@next` dist tag to test integrations before final releases happen.
