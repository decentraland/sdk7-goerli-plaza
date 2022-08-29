"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rarity = void 0;
const validation_1 = require("../validation");
var Rarity;
(function (Rarity) {
    Rarity["UNIQUE"] = "unique";
    Rarity["MYTHIC"] = "mythic";
    Rarity["LEGENDARY"] = "legendary";
    Rarity["EPIC"] = "epic";
    Rarity["RARE"] = "rare";
    Rarity["UNCOMMON"] = "uncommon";
    Rarity["COMMON"] = "common";
})(Rarity = exports.Rarity || (exports.Rarity = {}));
(function (Rarity) {
    Rarity.schema = {
        type: 'string',
        enum: Object.values(Rarity)
    };
    Rarity.validate = (0, validation_1.generateValidator)(Rarity.schema);
    const maxSupplyByRarity = {
        [Rarity.UNIQUE]: 1,
        [Rarity.MYTHIC]: 10,
        [Rarity.LEGENDARY]: 100,
        [Rarity.EPIC]: 1000,
        [Rarity.RARE]: 5000,
        [Rarity.UNCOMMON]: 10000,
        [Rarity.COMMON]: 100000
    };
    const lightColorByRarity = {
        [Rarity.UNIQUE]: '#FFE617',
        [Rarity.MYTHIC]: '#FB7DE3',
        [Rarity.LEGENDARY]: '#A657ED',
        [Rarity.EPIC]: '#6397F2',
        [Rarity.RARE]: '#3AD682',
        [Rarity.UNCOMMON]: '#FF8563',
        [Rarity.COMMON]: '#D4E0E0'
    };
    const colorByRarity = {
        [Rarity.UNIQUE]: '#FFB626',
        [Rarity.MYTHIC]: '#FF63E1',
        [Rarity.LEGENDARY]: '#842DDA',
        [Rarity.EPIC]: '#3D85E6',
        [Rarity.RARE]: '#36CF75',
        [Rarity.UNCOMMON]: '#ED6D4F',
        [Rarity.COMMON]: '#ABC1C1'
    };
    function getMaxSupply(rarity) {
        return maxSupplyByRarity[rarity];
    }
    Rarity.getMaxSupply = getMaxSupply;
    function getColor(rarity) {
        return colorByRarity[rarity];
    }
    Rarity.getColor = getColor;
    function getGradient(rarity) {
        return [lightColorByRarity[rarity], colorByRarity[rarity]];
    }
    Rarity.getGradient = getGradient;
})(Rarity = exports.Rarity || (exports.Rarity = {}));
//# sourceMappingURL=rarity.js.map