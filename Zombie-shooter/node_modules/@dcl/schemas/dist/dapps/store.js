"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const validation_1 = require("../validation");
var Store;
(function (Store) {
    Store.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            version: {
                type: 'number'
            },
            owner: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            links: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        url: {
                            type: 'string'
                        }
                    },
                    required: ['name', 'url']
                }
            },
            images: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        file: {
                            type: 'string'
                        }
                    },
                    required: ['name', 'file']
                }
            }
        },
        required: ['id', 'version', 'owner', 'description', 'links', 'images']
    };
    Store.validate = (0, validation_1.generateValidator)(Store.schema);
})(Store = exports.Store || (exports.Store = {}));
//# sourceMappingURL=store.js.map