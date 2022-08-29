import { JSONSchema, ValidateFunction } from '../validation';
export declare enum SaleType {
    ORDER = "order",
    BID = "bid",
    MINT = "mint"
}
export declare namespace SaleType {
    const schema: JSONSchema<SaleType>;
    const validate: ValidateFunction<SaleType>;
}
//# sourceMappingURL=sale-type.d.ts.map