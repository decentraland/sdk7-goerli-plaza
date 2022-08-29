import { JSONSchema, ValidateFunction } from '../validation';
import { ChainId } from './chain-id';
import { SaleType } from './sale-type';
import { Network } from './network';
import { NFTCategory } from './nft-category';
export declare type Sale = {
    id: string;
    type: SaleType;
    buyer: string;
    seller: string;
    itemId: string | null;
    tokenId: string;
    contractAddress: string;
    price: string;
    timestamp: number;
    txHash: string;
    network: Network;
    chainId: ChainId;
};
export declare enum SaleSortBy {
    RECENTLY_SOLD = "recently_sold",
    MOST_EXPENSIVE = "most_expensive"
}
export declare type SaleFilters = {
    first?: number;
    skip?: number;
    sortBy?: SaleSortBy;
    type?: SaleType;
    category?: NFTCategory;
    buyer?: string;
    seller?: string;
    contractAddress?: string;
    itemId?: string;
    tokenId?: string;
    from?: number;
    to?: number;
    minPrice?: string;
    maxPrice?: string;
    network?: Network;
};
export declare namespace Sale {
    const schema: JSONSchema<Sale>;
    const validate: ValidateFunction<Sale>;
}
//# sourceMappingURL=sale.d.ts.map