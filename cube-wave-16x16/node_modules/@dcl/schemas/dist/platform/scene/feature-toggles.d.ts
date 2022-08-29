import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare type FeatureToggles = Record<string, 'enabled' | 'disabled'>;
/** @alpha */
export declare namespace FeatureToggles {
    const schema: JSONSchema<FeatureToggles>;
    const validate: ValidateFunction<FeatureToggles>;
}
//# sourceMappingURL=feature-toggles.d.ts.map