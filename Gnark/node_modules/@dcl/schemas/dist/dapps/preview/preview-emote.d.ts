import { JSONSchema, ValidateFunction } from '../../validation';
export declare enum PreviewEmote {
    IDLE = "idle",
    CLAP = "clap",
    DAB = "dab",
    DANCE = "dance",
    FASHION = "fashion",
    FASHION_2 = "fashion-2",
    FASHION_3 = "fashion-3",
    FASHION_4 = "fashion-4",
    LOVE = "love",
    MONEY = "money",
    FIST_PUMP = "fist-pump",
    HEAD_EXPLODE = "head-explode"
}
/** @alpha */
export declare namespace PreviewEmote {
    const schema: JSONSchema<PreviewEmote>;
    const validate: ValidateFunction<PreviewEmote>;
}
//# sourceMappingURL=preview-emote.d.ts.map