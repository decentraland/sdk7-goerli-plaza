import { JSONSchema, ValidateFunction } from '../validation';
import { ChainId } from './chain-id';
import { Network } from './network';
import { NFTCategory } from './nft-category';
export declare type Contract = {
    name: string;
    address: string;
    category: NFTCategory;
    network: Network;
    chainId: ChainId;
};
export declare type ContractFilters = {
    category?: NFTCategory;
    network?: Network;
};
export declare enum ContractSortBy {
    NAME = "name"
}
export declare namespace Contract {
    const schema: JSONSchema<Contract>;
    const validate: ValidateFunction<Contract>;
}
//# sourceMappingURL=contract.d.ts.map