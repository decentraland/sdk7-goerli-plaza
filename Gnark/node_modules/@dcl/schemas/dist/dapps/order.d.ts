import { JSONSchema, ValidateFunction } from '../validation';
import { ChainId } from './chain-id';
import { ListingStatus } from './listing-status';
import { Network } from './network';
export declare type Order = {
    id: string;
    marketplaceAddress: string;
    contractAddress: string;
    tokenId: string;
    owner: string;
    buyer: string | null;
    price: string;
    status: ListingStatus;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    network: Network;
    chainId: ChainId;
};
export declare type OrderFilters = {
    first?: number;
    skip?: number;
    sortBy?: OrderSortBy;
    marketplaceAddress?: string;
    owner?: string;
    buyer?: string;
    contractAddress?: string;
    tokenId?: string;
    status?: ListingStatus;
    network?: Network;
};
export declare enum OrderSortBy {
    RECENTLY_LISTED = "recently_listed",
    RECENTLY_UPDATED = "recently_updated",
    CHEAPEST = "cheapest"
}
export declare namespace Order {
    const schema: JSONSchema<Order>;
    const validate: ValidateFunction<Order>;
}
//# sourceMappingURL=order.d.ts.map