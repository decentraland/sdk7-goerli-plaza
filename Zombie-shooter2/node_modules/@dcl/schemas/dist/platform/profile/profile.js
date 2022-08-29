"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const validation_1 = require("../../validation");
const avatar_1 = require("./avatar");
/**
 * Profile
 * @alpha
 */
var Profile;
(function (Profile) {
    Profile.schema = {
        type: 'object',
        required: ['avatars'],
        properties: {
            avatars: {
                type: 'array',
                items: avatar_1.Avatar.schema
            }
        },
        additionalProperties: true
    };
    const schemaValidator = (0, validation_1.generateValidator)(Profile.schema);
    Profile.validate = (profile) => schemaValidator(profile);
})(Profile = exports.Profile || (exports.Profile = {}));
//# sourceMappingURL=profile.js.map