import { WearableCategory } from './../../dapps/wearable-category';
import { JSONSchema, ValidateFunction } from '../../validation';
import { Rarity } from './../../dapps/rarity';
import { AssetWearableGender } from './asset-wearable-gender';
/** @alpha */
export declare type AssetJson = {
    id: string;
    assetType: string;
    name: string;
    description: string;
    thumbnail: string;
    model: string;
    category: WearableCategory;
    rarity: Rarity;
    bodyShape: AssetWearableGender;
};
/** @alpha */
export declare namespace AssetJson {
    const schema: JSONSchema<AssetJson>;
    const validate: ValidateFunction<AssetJson>;
}
//# sourceMappingURL=asset-json.d.ts.map