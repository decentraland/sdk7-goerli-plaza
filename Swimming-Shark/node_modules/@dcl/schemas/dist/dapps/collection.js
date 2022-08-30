"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = exports.CollectionSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const network_1 = require("./network");
var CollectionSortBy;
(function (CollectionSortBy) {
    CollectionSortBy["NEWEST"] = "newest";
    CollectionSortBy["NAME"] = "name";
    CollectionSortBy["RECENTLY_REVIEWED"] = "recently_reviewed";
    CollectionSortBy["SIZE"] = "size";
})(CollectionSortBy = exports.CollectionSortBy || (exports.CollectionSortBy = {}));
var Collection;
(function (Collection) {
    Collection.schema = {
        type: 'object',
        properties: {
            urn: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            name: {
                type: 'string'
            },
            contractAddress: {
                type: 'string'
            },
            size: {
                type: 'integer'
            },
            isOnSale: {
                type: 'boolean'
            },
            createdAt: {
                type: 'integer'
            },
            updatedAt: {
                type: 'integer'
            },
            reviewedAt: {
                type: 'integer'
            },
            network: network_1.Network.schema,
            chainId: chain_id_1.ChainId.schema
        },
        required: [
            'urn',
            'creator',
            'name',
            'contractAddress',
            'isOnSale',
            'size',
            'createdAt',
            'updatedAt',
            'reviewedAt',
            'network',
            'chainId'
        ]
    };
    Collection.validate = (0, validation_1.generateValidator)(Collection.schema);
})(Collection = exports.Collection || (exports.Collection = {}));
//# sourceMappingURL=collection.js.map