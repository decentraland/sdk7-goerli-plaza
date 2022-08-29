"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WearableBodyShape = void 0;
const validation_1 = require("../../validation");
/** @alpha */
var WearableBodyShape;
(function (WearableBodyShape) {
    WearableBodyShape["MALE"] = "urn:decentraland:off-chain:base-avatars:BaseMale";
    WearableBodyShape["FEMALE"] = "urn:decentraland:off-chain:base-avatars:BaseFemale";
})(WearableBodyShape = exports.WearableBodyShape || (exports.WearableBodyShape = {}));
/** @alpha */
(function (WearableBodyShape) {
    WearableBodyShape.schema = {
        type: 'string',
        enum: Object.values(WearableBodyShape)
    };
    WearableBodyShape.validate = (0, validation_1.generateValidator)(WearableBodyShape.schema);
})(WearableBodyShape = exports.WearableBodyShape || (exports.WearableBodyShape = {}));
//# sourceMappingURL=wearable-body-shape.js.map