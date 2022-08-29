import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare enum WearableBodyShape {
    MALE = "urn:decentraland:off-chain:base-avatars:BaseMale",
    FEMALE = "urn:decentraland:off-chain:base-avatars:BaseFemale"
}
/** @alpha */
export declare namespace WearableBodyShape {
    const schema: JSONSchema<WearableBodyShape>;
    const validate: ValidateFunction<WearableBodyShape>;
}
//# sourceMappingURL=wearable-body-shape.d.ts.map