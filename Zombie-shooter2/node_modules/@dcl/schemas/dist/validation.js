"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateType = exports.generateValidator = exports.Ajv = void 0;
const ajv_1 = __importDefault(require("ajv"));
exports.Ajv = ajv_1.default;
/**
 * Generates a validator for a specific JSON schema of a type T
 * @public
 */
function generateValidator(schema) {
    const ajv = new ajv_1.default();
    return ajv.compile(schema);
}
exports.generateValidator = generateValidator;
/**
 * Validates a type with a schema in a functional way.
 * @public
 */
function validateType(theType, value) {
    return theType.validate(value);
}
exports.validateType = validateType;
//# sourceMappingURL=validation.js.map