import { JSONSchema, ValidateFunction } from '../validation';
/**
 * Meta-transaction to be relayed
 * @alpha
 */
export declare type MetaTransaction = {
    from: string;
    params: [string, string];
};
/**
 * @alpha
 */
export declare namespace MetaTransaction {
    const schema: JSONSchema<MetaTransaction>;
    const validate: ValidateFunction<MetaTransaction>;
}
//# sourceMappingURL=meta-transactions.d.ts.map