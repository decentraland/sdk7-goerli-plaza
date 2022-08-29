"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = exports.BidSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const listing_status_1 = require("./listing-status");
const network_1 = require("./network");
var BidSortBy;
(function (BidSortBy) {
    BidSortBy["RECENTLY_OFFERED"] = "recently_offered";
    BidSortBy["RECENTLY_UPDATED"] = "recently_updated";
    BidSortBy["MOST_EXPENSIVE"] = "most_expensive";
})(BidSortBy = exports.BidSortBy || (exports.BidSortBy = {}));
var Bid;
(function (Bid) {
    Bid.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            bidAddress: {
                type: 'string'
            },
            bidder: {
                type: 'string'
            },
            seller: {
                type: 'string'
            },
            price: {
                type: 'string'
            },
            fingerprint: {
                type: 'string'
            },
            status: listing_status_1.ListingStatus.schema,
            blockchainId: {
                type: 'string'
            },
            blockNumber: {
                type: 'string'
            },
            contractAddress: {
                type: 'string'
            },
            tokenId: {
                type: 'string'
            },
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
            'bidAddress',
            'bidder',
            'seller',
            'price',
            'fingerprint',
            'status',
            'blockchainId',
            'blockNumber',
            'contractAddress',
            'tokenId',
            'network',
            'chainId',
            'expiresAt',
            'createdAt',
            'updatedAt'
        ]
    };
    Bid.validate = (0, validation_1.generateValidator)(Bid.schema);
})(Bid = exports.Bid || (exports.Bid = {}));
//# sourceMappingURL=bid.js.map