"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureToggles = void 0;
const validation_1 = require("../../validation");
/** @alpha */
var FeatureToggles;
(function (FeatureToggles) {
    FeatureToggles.schema = {
        type: 'object',
        additionalProperties: { type: 'string', enum: ['disabled', 'enabled'] },
        required: []
    };
    FeatureToggles.validate = (0, validation_1.generateValidator)(FeatureToggles.schema);
})(FeatureToggles = exports.FeatureToggles || (exports.FeatureToggles = {}));
//# sourceMappingURL=feature-toggles.js.map