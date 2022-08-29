import { JSONSchema, ValidateFunction } from '../validation';
/**
 * World Range
 * @alpha
 */
export declare type ValidWorldRange = {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};
/**
 * World
 * @alpha
 */
export declare type World = {
    validWorldRanges: Array<ValidWorldRange>;
};
/**
 * Get World
 * @alpha
 */
export declare function getWorld(): World;
/**
 * Check if is inside World Limits
 * @alpha
 */
export declare function isInsideWorldLimits(x: number, y: number): boolean;
/**
 * @alpha
 */
export declare namespace World {
    const schema: JSONSchema<World>;
    const validate: ValidateFunction<World>;
}
//# sourceMappingURL=world.d.ts.map