import { JSONSchema, ValidateFunction } from '../validation';
export declare enum Rarity {
    UNIQUE = "unique",
    MYTHIC = "mythic",
    LEGENDARY = "legendary",
    EPIC = "epic",
    RARE = "rare",
    UNCOMMON = "uncommon",
    COMMON = "common"
}
export declare namespace Rarity {
    const schema: JSONSchema<Rarity>;
    const validate: ValidateFunction<Rarity>;
    function getMaxSupply(rarity: Rarity): number;
    function getColor(rarity: Rarity): string;
    function getGradient(rarity: Rarity): [string, string];
}
//# sourceMappingURL=rarity.d.ts.map