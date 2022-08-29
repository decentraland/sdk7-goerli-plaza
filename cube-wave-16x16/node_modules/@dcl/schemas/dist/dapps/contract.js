"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.ContractSortBy = void 0;
const validation_1 = require("../validation");
const chain_id_1 = require("./chain-id");
const network_1 = require("./network");
const nft_category_1 = require("./nft-category");
var ContractSortBy;
(function (ContractSortBy) {
    ContractSortBy["NAME"] = "name";
})(ContractSortBy = exports.ContractSortBy || (exports.ContractSortBy = {}));
var Contract;
(function (Contract) {
    Contract.schema = {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            address: {
                type: 'string'
            },
            category: nft_category_1.NFTCategory.schema,
            network: network_1.Network.schema,
            chainId: chain_id_1.ChainId.schema
        },
        required: ['name', 'address', 'category', 'network', 'chainId']
    };
    Contract.validate = (0, validation_1.generateValidator)(Contract.schema);
})(Contract = exports.Contract || (exports.Contract = {}));
//# sourceMappingURL=contract.js.map