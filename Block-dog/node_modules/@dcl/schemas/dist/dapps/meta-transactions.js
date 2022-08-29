"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaTransaction = void 0;
const validation_1 = require("../validation");
/**
 * @alpha
 */
var MetaTransaction;
(function (MetaTransaction) {
    MetaTransaction.schema = {
        type: 'object',
        properties: {
            from: { type: 'string' },
            params: {
                type: 'array',
                items: [{ type: 'string' }, { type: 'string' }],
                additionalItems: false,
                minItems: 2
            }
        },
        additionalProperties: false,
        required: ['from', 'params']
    };
    MetaTransaction.validate = (0, validation_1.generateValidator)(MetaTransaction.schema);
})(MetaTransaction = exports.MetaTransaction || (exports.MetaTransaction = {}));
//# sourceMappingURL=meta-transactions.js.map