"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const listing_status_1 = require("./listing-status");
const network_1 = require("./network");
var OrderSortBy;
(function (OrderSortBy) {
    OrderSortBy["RECENTLY_LISTED"] = "recently_listed";
    OrderSortBy["RECENTLY_UPDATED"] = "recently_updated";
    OrderSortBy["CHEAPEST"] = "cheapest";
})(OrderSortBy = exports.OrderSortBy || (exports.OrderSortBy = {}));
var Order;
(function (Order) {
    Order.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            marketplaceAddress: {
                type: 'string'
            },
            contractAddress: {
                type: 'string'
            },
            tokenId: {
                type: 'string'
            },
            owner: {
                type: 'string'
            },
            buyer: {
                type: ['string'],
                nullable: true
            },
            price: {
                type: 'string'
            },
            status: listing_status_1.ListingStatus.schema,
            network: network_1.Network.schema,
            chainId: chain_id_1.ChainId.schema,
            expiresAt: {
                type: 'integer'
            },
            createdAt: {
                type: 'integer'
            },
            updatedAt: {
                type: 'integer'
            }
        },
        required: [
            'id',
            'marketplaceAddress',
            'contractAddress',
            'tokenId',
            'owner',
            'buyer',
            'price',
            'status',
            'network',
            'chainId',
            'expiresAt',
            'createdAt',
            'updatedAt'
        ]
    };
    Order.validate = (0, validation_1.generateValidator)(Order.schema);
})(Order = exports.Order || (exports.Order = {}));
//# sourceMappingURL=order.js.map