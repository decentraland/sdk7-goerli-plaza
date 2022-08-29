"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locale = void 0;
const validation_1 = require("../../validation");
/** @alpha */
var Locale;
(function (Locale) {
    Locale["EN"] = "en";
    Locale["ES"] = "es";
})(Locale = exports.Locale || (exports.Locale = {}));
/** @alpha */
(function (Locale) {
    Locale.schema = {
        type: 'string',
        enum: Object.values(Locale)
    };
    Locale.validate = (0, validation_1.generateValidator)(Locale.schema);
})(Locale = exports.Locale || (exports.Locale = {}));
//# sourceMappingURL=locale.js.map