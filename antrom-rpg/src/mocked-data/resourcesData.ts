import { Sprite } from '../utils'
import { resourcesMarketSprites } from './resourcesMarketSprites'

export enum Wearables {
  W_MAGE_STAFF = 'mage_staff'
  // W_RANGER_BOW = 'ranger_bow',
  // W_BERSERKER_AXE = 'berserker_axe',
  // W_MAGE = 'mage',
  // W_RANGER = 'ranger',
  // W_BERSERKER = 'berserker',
  // W_MAGE_HAT = 'mage_hat',
  // W_RANGER_HOOD = 'ranger_hood',
  // W_BERSERKER_HELM = 'berserker_helm'
}

export enum Items {
  I_BERRY = 'berry',
  I_BONE = 'bone',
  I_COIN = 'coins',
  I_TOKEN = 'token',
  I_MEAT = 'meat',
  I_WOOD = 'wood',
  I_IRON = 'iron'
}

export const ITEMS: Record<Items, Item> = {
  [Items.I_BERRY]: {
    name: 'Berry',
    sellPrice: 1,
    buyPrice: 5,
    sprite: resourcesMarketSprites.berry,
    id: Items.I_BERRY
  },
  [Items.I_BONE]: {
    name: 'Bone',
    sellPrice: 0,
    buyPrice: 1,
    sprite: resourcesMarketSprites.bone,
    id: Items.I_BONE
  },
  [Items.I_COIN]: {
    name: 'Coins',
    manaPrice: 0.1,
    sprite: resourcesMarketSprites.coins,
    id: Items.I_COIN
  },
  [Items.I_TOKEN]: {
    name: 'Premium Dungeon Tokens',
    manaPrice: 1,
    sprite: resourcesMarketSprites.token,
    id: Items.I_TOKEN
  },
  [Items.I_MEAT]: {
    name: '',
    // provisory sprite
    sprite: resourcesMarketSprites.token,
    id: Items.I_MEAT
  },
  [Items.I_WOOD]: {
    name: '',
    // provisory sprite
    sprite: resourcesMarketSprites.token,
    id: Items.I_WOOD
  },
  [Items.I_IRON]: {
    name: '',
    // provisory sprite
    sprite: resourcesMarketSprites.token,
    id: Items.I_IRON
  }
}

export const APPRENTICE_WEARABLES: Record<Wearables, Wearable> = {
  [Wearables.W_MAGE_STAFF]: {
    name: 'Mage Staff',
    craftCost: [{ item: ITEMS.wood, amount: 250 }],
    sprite: resourcesMarketSprites.token,
    id: Wearables.W_MAGE_STAFF
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
  { item: ITEMS.coins }
]

export type Item = {
  name: string
  sellPrice?: number
  buyPrice?: number
  manaPrice?: number
  craftCost?: CraftCost[]
  sprite: Sprite
  id: string
}

export type Wearable = {
  name: string
  craftCost?: CraftCost[]
  sprite: Sprite
  id: string
}

export type InventoryItem = {
  item: Item
  amount?: number
}

export type CraftCost = {
  item: Item
  amount: Number
}
