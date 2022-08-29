"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetWearableGender = void 0;
const validation_1 = require("../../validation");
var AssetWearableGender;
(function (AssetWearableGender) {
    AssetWearableGender["MALE"] = "male";
    AssetWearableGender["FEMALE"] = "female";
    AssetWearableGender["BOTH"] = "both";
})(AssetWearableGender = exports.AssetWearableGender || (exports.AssetWearableGender = {}));
(function (AssetWearableGender) {
    AssetWearableGender.schema = {
        type: 'string',
        enum: Object.values(AssetWearableGender)
    };
    AssetWearableGender.validate = (0, validation_1.generateValidator)(AssetWearableGender.schema);
})(AssetWearableGender = exports.AssetWearableGender || (exports.AssetWearableGender = {}));
//# sourceMappingURL=asset-wearable-gender.js.map