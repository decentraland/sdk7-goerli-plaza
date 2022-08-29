"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = exports.SaleSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const sale_type_1 = require("./sale-type");
const network_1 = require("./network");
var SaleSortBy;
(function (SaleSortBy) {
    SaleSortBy["RECENTLY_SOLD"] = "recently_sold";
    SaleSortBy["MOST_EXPENSIVE"] = "most_expensive";
})(SaleSortBy = exports.SaleSortBy || (exports.SaleSortBy = {}));
var Sale;
(function (Sale) {
    Sale.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            type: sale_type_1.SaleType.schema,
            buyer: {
                type: 'string'
            },
            seller: {
                type: 'string'
            },
            price: {
                type: 'string'
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
            txHash: {
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
            'buyer',
            'seller',
            'itemId',
            'tokenId',
            'price',
            'contractAddress',
            'timestamp',
            'txHash',
            'network',
            'chainId'
        ]
    };
    Sale.validate = (0, validation_1.generateValidator)(Sale.schema);
})(Sale = exports.Sale || (exports.Sale = {}));
//# sourceMappingURL=sale.js.map