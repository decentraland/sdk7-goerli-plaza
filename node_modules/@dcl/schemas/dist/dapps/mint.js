"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mint = exports.MintSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const network_1 = require("./network");
var MintSortBy;
(function (MintSortBy) {
    MintSortBy["RECENTLY_MINTED"] = "recently_minted";
    MintSortBy["MOST_EXPENSIVE"] = "most_expensive";
})(MintSortBy = exports.MintSortBy || (exports.MintSortBy = {}));
var Mint;
(function (Mint) {
    Mint.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            beneficiary: {
                type: 'string'
            },
            minter: {
                type: 'string'
            },
            price: {
                type: 'string',
                nullable: true
            },
            contractAddress: {
                type: 'string'
            },
            tokenId: {
                type: 'string'
            },
            itemId: {
                type: 'string'
            },
            issuedId: {
                type: 'string'
            },
            timestamp: {
                type: 'integer'
            },
            network: network_1.Network.schema,
            chainId: chain_id_1.ChainId.schema
        },
        required: [
            'id',
            'creator',
            'beneficiary',
            'minter',
            'itemId',
            'tokenId',
            'issuedId',
            'contractAddress',
            'price',
            'timestamp',
            'network',
            'chainId'
        ]
    };
    Mint.validate = (0, validation_1.generateValidator)(Mint.schema);
})(Mint = exports.Mint || (exports.Mint = {}));
//# sourceMappingURL=mint.js.map