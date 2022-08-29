import { JSONSchema, ValidateFunction } from '../validation';
/**
 * Different supported providers
 * @alpha
 */
export declare enum ProviderType {
    INJECTED = "injected",
    FORTMATIC = "formatic",
    NETWORK = "network",
    WALLET_CONNECT = "wallet_connect",
    WALLET_LINK = "wallet_link"
}
/**
 * @alpha
 */
export declare namespace ProviderType {
    const schema: JSONSchema<ProviderType>;
    const validate: ValidateFunction<ProviderType>;
}
//# sourceMappingURL=provider-type.d.ts.map