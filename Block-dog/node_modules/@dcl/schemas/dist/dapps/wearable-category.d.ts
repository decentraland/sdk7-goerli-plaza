import { JSONSchema, ValidateFunction } from '../validation';
export declare enum WearableCategory {
    EYEBROWS = "eyebrows",
    EYES = "eyes",
    FACIAL_HAIR = "facial_hair",
    HAIR = "hair",
    HEAD = "head",
    BODY_SHAPE = "body_shape",
    MOUTH = "mouth",
    UPPER_BODY = "upper_body",
    LOWER_BODY = "lower_body",
    FEET = "feet",
    EARRING = "earring",
    EYEWEAR = "eyewear",
    HAT = "hat",
    HELMET = "helmet",
    MASK = "mask",
    TIARA = "tiara",
    TOP_HEAD = "top_head",
    SKIN = "skin"
}
export declare namespace WearableCategory {
    const schema: JSONSchema<WearableCategory>;
    const validate: ValidateFunction<WearableCategory>;
}
//# sourceMappingURL=wearable-category.d.ts.map