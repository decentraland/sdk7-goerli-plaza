import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare type SpawnPoint = {
    name?: string;
    position: SinglePosition | MultiPosition;
    default?: boolean;
    cameraTarget?: SinglePosition;
};
declare type SinglePosition = {
    x: number;
    y: number;
    z: number;
};
declare type MultiPosition = {
    x: number[];
    y: number[];
    z: number[];
};
/** @alpha */
export declare namespace SpawnPoint {
    const schema: JSONSchema<SpawnPoint>;
    const validate: ValidateFunction<SpawnPoint>;
}
export {};
//# sourceMappingURL=spawn-point.d.ts.map