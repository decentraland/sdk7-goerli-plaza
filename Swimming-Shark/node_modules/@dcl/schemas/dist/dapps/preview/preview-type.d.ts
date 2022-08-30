import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare enum PreviewType {
    TEXTURE = "texture",
    WEARABLE = "wearable",
    AVATAR = "avatar"
}
/** @alpha */
export declare namespace PreviewType {
    const schema: JSONSchema<PreviewType>;
    const validate: ValidateFunction<PreviewType>;
}
//# sourceMappingURL=preview-type.d.ts.map