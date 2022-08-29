import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare type SceneParcels = {
    base: string;
    parcels: string[];
};
/** @alpha */
export declare namespace SceneParcels {
    const schema: JSONSchema<SceneParcels>;
    const schemaValidator: ValidateFunction<SceneParcels>;
    const validate: ValidateFunction<SceneParcels>;
}
//# sourceMappingURL=scene-parcels.d.ts.map