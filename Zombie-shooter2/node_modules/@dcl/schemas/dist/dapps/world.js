"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.isInsideWorldLimits = exports.getWorld = void 0;
const validation_1 = require("../validation");
/**
 * Get World
 * @alpha
 */
function getWorld() {
    return {
        validWorldRanges: [
            {
                xMin: -150,
                yMin: -150,
                xMax: 150,
                yMax: 150
            },
            {
                xMin: 62,
                yMin: 151,
                xMax: 162,
                yMax: 158
            },
            {
                xMin: 151,
                yMin: 144,
                xMax: 162,
                yMax: 150
            },
            {
                xMin: 151,
                yMin: 59,
                xMax: 163,
                yMax: 143
            }
        ]
    };
}
exports.getWorld = getWorld;
/**
 * Check if is inside World Limits
 * @alpha
 */
function isInsideWorldLimits(x, y) {
    const validWorldRanges = getWorld().validWorldRanges;
    for (const range of validWorldRanges) {
        if (x >= range.xMin &&
            x <= range.xMax &&
            y >= range.yMin &&
            y <= range.yMax) {
            return true;
        }
    }
    return false;
}
exports.isInsideWorldLimits = isInsideWorldLimits;
/**
 * @alpha
 */
var World;
(function (World) {
    World.schema = {
        type: 'object',
        required: ['validWorldRanges'],
        properties: {
            validWorldRanges: {
                type: 'array',
                default: [
                    {
                        xMin: -150,
                        yMin: -150,
                        xMax: 150,
                        yMax: 150
                    }
                ],
                items: {
                    type: 'object',
                    required: ['xMin', 'yMin', 'xMax', 'yMax'],
                    properties: {
                        xMin: {
                            type: 'integer'
                        },
                        yMin: {
                            type: 'integer'
                        },
                        xMax: {
                            type: 'integer'
                        },
                        yMax: {
                            type: 'integer'
                        }
                    }
                }
            }
        },
        additionalProperties: false
    };
    World.validate = (0, validation_1.generateValidator)(World.schema);
})(World = exports.World || (exports.World = {}));
//# sourceMappingURL=world.js.map