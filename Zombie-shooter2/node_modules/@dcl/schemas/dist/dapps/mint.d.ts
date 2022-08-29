import { JSONSchema, ValidateFunction } from '../validation';
import { ChainId } from './chain-id';
import { Network } from './network';
export declare type Mint = {
    id: string;
    creator: string;
    beneficiary: string;
    minter: string;
    itemId: string;
    tokenId: string;
    issuedId: string;
    contractAddress: string;
    price: string | null;
    timestamp: number;
    network: Network;
    chainId: ChainId;
};
export declare enum MintSortBy {
    RECENTLY_MINTED = "recently_minted",
    MOST_EXPENSIVE = "most_expensive"
}
export declare type MintFilters = {
    first?: number;
    skip?: number;
    sortBy?: MintSortBy;
    creator?: string;
    beneficiary?: string;
    minter?: string;
    contractAddress?: string;
    itemId?: string;
    tokenId?: string;
    issuedId?: string;
    isSale?: boolean;
    network?: Network;
};
export declare namespace Mint {
    const schema: JSONSchema<Mint>;
    const validate: ValidateFunction<Mint>;
}
//# sourceMappingURL=mint.d.ts.map