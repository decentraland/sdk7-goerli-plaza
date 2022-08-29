"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.AccountSortBy = void 0;
const validation_1 = require("../validation");
var AccountSortBy;
(function (AccountSortBy) {
    AccountSortBy["MOST_SALES"] = "most_sales";
    AccountSortBy["MOST_PURCHASES"] = "most_purchases";
    AccountSortBy["MOST_SPENT"] = "most_spent";
    AccountSortBy["MOST_EARNED"] = "most_earned";
    AccountSortBy["MOST_ROYALTIES"] = "most_royalties";
})(AccountSortBy = exports.AccountSortBy || (exports.AccountSortBy = {}));
var Account;
(function (Account) {
    Account.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            address: {
                type: 'string'
            },
            sales: {
                type: 'integer'
            },
            purchases: {
                type: 'integer'
            },
            spent: {
                type: 'string'
            },
            earned: {
                type: 'string'
            },
            royalties: {
                type: 'string'
            }
        },
        required: [
            'id',
            'address',
            'sales',
            'purchases',
            'spent',
            'earned',
            'royalties'
        ]
    };
    Account.validate = (0, validation_1.generateValidator)(Account.schema);
})(Account = exports.Account || (exports.Account = {}));
//# sourceMappingURL=account.js.map