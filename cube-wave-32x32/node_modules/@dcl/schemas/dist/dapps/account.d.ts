import { JSONSchema, ValidateFunction } from '../validation';
import { Network } from './network';
export declare type Account = {
    id: string;
    address: string;
    sales: number;
    purchases: number;
    spent: string;
    earned: string;
    royalties: string;
};
export declare enum AccountSortBy {
    MOST_SALES = "most_sales",
    MOST_PURCHASES = "most_purchases",
    MOST_SPENT = "most_spent",
    MOST_EARNED = "most_earned",
    MOST_ROYALTIES = "most_royalties"
}
export declare type AccountFilters = {
    first?: number;
    skip?: number;
    sortBy?: AccountSortBy;
    id?: string;
    address?: string;
    network?: Network;
};
export declare namespace Account {
    const schema: JSONSchema<Account>;
    const validate: ValidateFunction<Account>;
}
//# sourceMappingURL=account.d.ts.map