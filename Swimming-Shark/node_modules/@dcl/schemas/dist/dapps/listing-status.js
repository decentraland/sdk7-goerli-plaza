"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingStatus = void 0;
const validation_1 = require("../validation");
var ListingStatus;
(function (ListingStatus) {
    ListingStatus["OPEN"] = "open";
    ListingStatus["SOLD"] = "sold";
    ListingStatus["CANCELLED"] = "cancelled";
})(ListingStatus = exports.ListingStatus || (exports.ListingStatus = {}));
(function (ListingStatus) {
    ListingStatus.schema = {
        type: 'string',
        enum: Object.values(ListingStatus)
    };
    ListingStatus.validate = (0, validation_1.generateValidator)(ListingStatus.schema);
})(ListingStatus = exports.ListingStatus || (exports.ListingStatus = {}));
//# sourceMappingURL=listing-status.js.map