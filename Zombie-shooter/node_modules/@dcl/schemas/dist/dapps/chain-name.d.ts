import { JSONSchema, ValidateFunction } from '../validation';
import { ChainId } from './chain-id';
/**
 * Different supported chain names
 * @alpha
 */
export declare enum ChainName {
    ETHEREUM_MAINNET = "Ethereum Mainnet",
    ETHEREUM_ROPSTEN = "Ropsten",
    ETHEREUM_RINKEBY = "Rinkeby",
    ETHEREUM_GOERLI = "Goerli",
    ETHEREUM_KOVAN = "Kovan",
    MATIC_MAINNET = "Polygon",
    MATIC_MUMBAI = "Mumbai"
}
/**
 * Get chain id by chain name
 * @alpha
 */
export declare function getChainId(chainName: ChainName): ChainId | null;
/**
 * @alpha
 */
export declare namespace ChainName {
    const schema: JSONSchema<ChainName>;
    const validate: ValidateFunction<ChainName>;
}
//# sourceMappingURL=chain-name.d.ts.map