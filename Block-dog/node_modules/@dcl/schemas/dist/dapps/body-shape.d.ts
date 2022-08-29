import { JSONSchema, ValidateFunction } from '../validation';
export declare enum BodyShape {
    MALE = "BaseMale",
    FEMALE = "BaseFemale"
}
export declare namespace BodyShape {
    const schema: JSONSchema<BodyShape>;
    const validate: ValidateFunction<BodyShape>;
}
//# sourceMappingURL=body-shape.d.ts.map