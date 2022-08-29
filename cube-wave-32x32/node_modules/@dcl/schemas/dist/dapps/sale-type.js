"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleType = void 0;
const validation_1 = require("../validation");
var SaleType;
(function (SaleType) {
    SaleType["ORDER"] = "order";
    SaleType["BID"] = "bid";
    SaleType["MINT"] = "mint";
})(SaleType = exports.SaleType || (exports.SaleType = {}));
(function (SaleType) {
    SaleType.schema = {
        type: 'string',
        enum: Object.values(SaleType)
    };
    SaleType.validate = (0, validation_1.generateValidator)(SaleType.schema);
})(SaleType = exports.SaleType || (exports.SaleType = {}));
//# sourceMappingURL=sale-type.js.map