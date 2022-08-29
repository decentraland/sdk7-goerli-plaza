import { JSONSchema, ValidateFunction } from '../validation';
export declare enum ListingStatus {
    OPEN = "open",
    SOLD = "sold",
    CANCELLED = "cancelled"
}
export declare namespace ListingStatus {
    const schema: JSONSchema<ListingStatus>;
    const validate: ValidateFunction<ListingStatus>;
}
//# sourceMappingURL=listing-status.d.ts.map