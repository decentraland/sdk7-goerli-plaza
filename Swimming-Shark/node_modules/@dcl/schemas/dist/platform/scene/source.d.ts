import { JSONSchema, ValidateFunction } from '../../validation';
/** @alpha */
export declare type Source = {
    version?: number;
    origin: string;
    projectId: string;
    point?: {
        x: number;
        y: number;
    };
    rotation?: 'north' | 'east' | 'south' | 'west';
    layout?: {
        rows: number;
        cols: number;
    };
    isEmpty?: boolean;
};
/** @alpha */
export declare namespace Source {
    const schema: JSONSchema<Source>;
    const validate: ValidateFunction<Source>;
}
//# sourceMappingURL=source.d.ts.map