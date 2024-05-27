// import { engine, Schemas } from '@dcl/sdk/ecs'
// import { Sprite } from '../mocked-data/atlasSprites'

// const CoordsSchema = {
//   x: Schemas.Number,
//   y: Schemas.Number
// }

// const SpriteSchema = {
//   atlasSrc: Schemas.String,
//   atlasSize: Schemas.Optional(CoordsSchema),
//   x: 0,
//   y: 0,
//   w: 0,
//   h: 0
// }

// export const MarketResources = engine.defineComponent('rpg::MarketResources', {
//   balance: Schemas.Number,
//   withMana: Schemas.Boolean,
//   tradeClicked: Schemas.Boolean,
//   isSelling: Schemas.Boolean,
//   itemsArray: Schemas.Array(Schemas.Optional(InventoryItem)),
//   totalPrice: Schemas.Number,
//   buttonMaxSprite: Schemas.Optional(SpriteSchema),
//   selectedQuantity: Schemas.Number,
//   selectedItem: Schemas.Optional(InventoryItem)
// })
