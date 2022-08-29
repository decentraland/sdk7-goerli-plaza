"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WearableGender = void 0;
const validation_1 = require("../validation");
var WearableGender;
(function (WearableGender) {
    WearableGender["MALE"] = "male";
    WearableGender["FEMALE"] = "female";
})(WearableGender = exports.WearableGender || (exports.WearableGender = {}));
(function (WearableGender) {
    WearableGender.schema = {
        type: 'string',
        enum: Object.values(WearableGender)
    };
    WearableGender.validate = (0, validation_1.generateValidator)(WearableGender.schema);
})(WearableGender = exports.WearableGender || (exports.WearableGender = {}));
//# sourceMappingURL=wearable-gender.js.map