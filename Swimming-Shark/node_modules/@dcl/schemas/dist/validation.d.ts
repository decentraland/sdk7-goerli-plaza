import Ajv, { ErrorObject, JSONSchemaType } from 'ajv';
export { Ajv };
/**
 * This type is a subset of AJV's ValidateFunction, it exists to make
 * .d.ts bundles smaller and to not expose all of AJV context to the
 * world.
 * @public
 */
export interface ValidateFunction<T = unknown> {
    (this: any, data: any, dataCxt?: any): data is T;
    errors?: null | ErrorObject[];
}
/**
 * This type alias exist only to avoid accidental refactors involving names of ajv
 * @public
 */
export declare type JSONSchema<T> = JSONSchemaType<T>;
/**
 * Common structure to use types as values in TS.
 * @public
 */
export declare type AbstractTypedSchema<T> = {
    schema: JSONSchema<T>;
    validate: ValidateFunction<T>;
};
/**
 * Generates a validator for a specific JSON schema of a type T
 * @public
 */
export declare function generateValidator<T>(schema: JSONSchema<T>): ValidateFunction<T>;
/**
 * Validates a type with a schema in a functional way.
 * @public
 */
export declare function validateType<T>(theType: Pick<AbstractTypedSchema<T>, 'validate'>, value: T): boolean;
//# sourceMappingURL=validation.d.ts.map