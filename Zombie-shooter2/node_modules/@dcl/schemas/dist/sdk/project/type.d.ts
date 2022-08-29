import { JSONSchema, ValidateFunction } from '../../validation';
/** @public */
export declare enum ProjectType {
    SCENE = "scene",
    SMART_ITEM = "smart-item",
    PORTABLE_EXPERIENCE = "portable-experience",
    LIBRARY = "library"
}
/** @public */
export declare namespace ProjectType {
    const schema: JSONSchema<ProjectType>;
    const validate: ValidateFunction<ProjectType>;
}
//# sourceMappingURL=type.d.ts.map