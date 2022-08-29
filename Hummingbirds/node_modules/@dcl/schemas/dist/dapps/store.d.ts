import { JSONSchema, ValidateFunction } from '../validation';
export declare type Store = {
    id: string;
    owner: string;
    description: string;
    links: {
        name: string;
        url: string;
    }[];
    images: {
        name: string;
        file: string;
    }[];
    version: number;
};
export declare namespace Store {
    const schema: JSONSchema<Store>;
    const validate: ValidateFunction<Store>;
}
//# sourceMappingURL=store.d.ts.map