"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyShape = void 0;
const validation_1 = require("../validation");
var BodyShape;
(function (BodyShape) {
    BodyShape["MALE"] = "BaseMale";
    BodyShape["FEMALE"] = "BaseFemale";
})(BodyShape = exports.BodyShape || (exports.BodyShape = {}));
(function (BodyShape) {
    BodyShape.schema = {
        type: 'string',
        enum: Object.values(BodyShape)
    };
    BodyShape.validate = (0, validation_1.generateValidator)(BodyShape.schema);
})(BodyShape = exports.BodyShape || (exports.BodyShape = {}));
//# sourceMappingURL=body-shape.js.map