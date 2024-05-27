import { Sprite, antromSprites } from './atlasSprites'

export const ITEMS: { [key: string]: Item } = {
  berry: {
    name: 'Berry',
    sellPrice: 1,
    buyPrice: 5,
    sprite: antromSprites.berry,
    id: 'berry'
  },
  bone: {
    name: 'Bone',
    sellPrice: 0,
    buyPrice: 1,
    sprite: antromSprites.bone,
    id: 'bone'
  },
  coin: {
    name: 'Coins',
    manaPrice: 0.1,
    sprite: antromSprites.coins,
    id: 'coins'
  },
  token: {
    name: 'Premium Dungeon Tokens',
    manaPrice: 1,
    sprite: antromSprites.token,
    id: 'token'
  }
}

export const RESOURCES_INVENTORY: InventoryItem[] = [
  { item: ITEMS.berry, amount: 10 },
  { item: ITEMS.bone, amount: 5 }
]

export const RESOURCES_MARKET: InventoryItem[] = [
  { item: ITEMS.berry },
  { item: ITEMS.bone },
  { item: ITEMS.token },
  { item: ITEMS.coin }
]

export type Item = {
  name: string
  sellPrice?: number
  buyPrice?: number
  manaPrice?: number
  sprite: Sprite
  id: string
}

export type InventoryItem = {
  item: Item
  amount?: number
}
