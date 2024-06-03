import { engine, Schemas } from '@dcl/sdk/ecs'

const SpriteSchema = Schemas.Map({
  atlasSrc: Schemas.String,
  atlasSize: Schemas.Map({ x: Schemas.Number, y: Schemas.Number }),
  x: Schemas.Number,
  y: Schemas.Number,
  w: Schemas.Number,
  h: Schemas.Number
})

const ItemSchema = Schemas.Map({
  name: Schemas.String,
  sellPrice: Schemas.Number,
  buyPrice: Schemas.Number,
  withMana: Schemas.Boolean,
  sprite: SpriteSchema,
  id: Schemas.String
})

const InventoryItemSchema = Schemas.Map({
  item: ItemSchema,
  amount: Schemas.Optional(Schemas.Number)
})

const MarketResourceSchema = Schemas.Map({
  isVisible: Schemas.Boolean,
  balance: Schemas.Number,
  tradeClicked: Schemas.Boolean,
  isSelling: Schemas.Boolean,
  itemsArray: Schemas.Array(InventoryItemSchema),
  totalPrice: Schemas.Number,
  buttonMaxSprite: SpriteSchema,
  selectedQuantity: Schemas.Number,
  selectedItem: Schemas.Optional(InventoryItemSchema)
})

export const MarketResources = engine.defineComponentFromSchema(
  'rpg::MarketResources',
  MarketResourceSchema
)

const CraftCostSchema = {
  item: ItemSchema,
  amount: Schemas.Number
}

const WearableSchema = Schemas.Map({
  name: Schemas.String,
  craftCost: Schemas.Array(Schemas.Map(CraftCostSchema)),
  sprite: SpriteSchema,
  id: Schemas.String
})

const WearablesResourcesSchema = Schemas.Map({
  isVisible: Schemas.Boolean,
  selectedWearable: WearableSchema,
  backgroundSprite: SpriteSchema,
  clickedPurchaseSprite: SpriteSchema,
  purchaseSprite: SpriteSchema,
  leftButton: SpriteSchema,
  rightButton: SpriteSchema
})

export const WearablesResources = engine.defineComponentFromSchema(
  'rpg::WearablesResources',
  WearablesResourcesSchema
)
