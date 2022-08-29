"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetJson = void 0;
const type_1 = require("./../project/type");
const wearable_category_1 = require("./../../dapps/wearable-category");
const validation_1 = require("../../validation");
const rarity_1 = require("./../../dapps/rarity");
const asset_wearable_gender_1 = require("./asset-wearable-gender");
/** @alpha */
var AssetJson;
(function (AssetJson) {
    AssetJson.schema = {
        type: 'object',
        properties: {
            id: {
                description: 'The ID that you will replace in your collection. Also this ID is used for develop purpose, to identify in the kernel.',
                type: 'string'
            },
            assetType: type_1.ProjectType.schema,
            name: {
                description: '',
                type: 'string'
            },
            description: {
                description: 'A short text that describes the wearable.`',
                type: 'string'
            },
            thumbnail: {
                description: 'A preview image of your item.',
                type: 'string'
            },
            model: {
                description: 'The main file that should be loaded as wearable.',
                type: 'string'
            },
            category: wearable_category_1.WearableCategory.schema,
            rarity: rarity_1.Rarity.schema,
            bodyShape: asset_wearable_gender_1.AssetWearableGender.schema
        },
        additionalProperties: false,
        required: ['category', 'rarity', 'bodyShape', 'thumbnail', 'model']
    };
    AssetJson.validate = (0, validation_1.generateValidator)(AssetJson.schema);
})(AssetJson = exports.AssetJson || (exports.AssetJson = {}));
//# sourceMappingURL=asset-json.js.map