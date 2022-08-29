import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare type Metrics = {
    triangles: number;
    materials: number;
    textures: number;
    meshes: number;
    bodies: number;
    entities: number;
};
/** @alpha */
export declare namespace Metrics {
    const schema: JSONSchema<Metrics>;
    const validate: ValidateFunction<Metrics>;
}
//# sourceMappingURL=metrics.d.ts.map