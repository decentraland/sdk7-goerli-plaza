import { Sprite } from '../utils'
import { ITEMS, Item } from './resourcesData'

export type Wearable = {
  name: string
  craftCost?: CraftCost[]
  sprite: Sprite
  id: string
}

export type CraftCost = {
  item: Item
  amount: Number
}

export enum Wearables {
  W_MAGE = 'mage',
  W_MAGE_HAT = 'mage_hat',
  W_MAGE_STAFF = 'mage_staff'
  // W_RANGER = 'ranger',
  // W_RANGER_HOOD = 'ranger_hood',
  // W_RANGER_BOW = 'ranger_bow',
  // W_BERSERKER = 'berserker',
  // W_BERSERKER_AXE = 'berserker_axe',
  // W_BERSERKER_HELM = 'berserker_helm'
}

export const wearablesSprites: Record<Wearables, Sprite> = {
  [Wearables.W_MAGE]: {
    atlasSrc: 'images/wearables_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 512,
    y: 0,
    w: 128,
    h: 128
  },
  [Wearables.W_MAGE_HAT]: {
    atlasSrc: 'images/wearables_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 384,
    y: 0,
    w: 128,
    h: 128
  },
  [Wearables.W_MAGE_STAFF]: {
    atlasSrc: 'images/wearables_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 640,
    y: 0,
    w: 128,
    h: 128
  }
}

export const wearablesMarketSprites: { [key: string]: Sprite } = {
  background: {
    atlasSrc: 'images/apprenticemarket_spritesheet.png',
    atlasSize: { x: 1402, y: 1044 },
    x: 95,
    y: 100,
    w: 1210,
    h: 685
  },
  exit_icon: {
    atlasSrc: 'images/apprenticemarket_spritesheet.png',
    atlasSize: { x: 1402, y: 1044 },
    x: 180,
    y: 888,
    w: 38,
    h: 38
  },
  selected_frame: {
    atlasSrc: 'images/apprenticemarket_spritesheet.png',
    atlasSize: { x: 1402, y: 1044 },
    x: 1237,
    y: 883,
    w: 164,
    h: 160
  }
}

export const APPRENTICE_WEARABLES: Record<Wearables, Wearable> = {
  [Wearables.W_MAGE_STAFF]: {
    name: 'Mage Staff',
    craftCost: [
      { item: ITEMS.meat, amount: 250 },
      { item: ITEMS.wood, amount: 250 },
      { item: ITEMS.iron, amount: 250 }
    ],
    sprite: wearablesSprites.mage_staff,
    id: Wearables.W_MAGE_STAFF
  },
  [Wearables.W_MAGE_HAT]: {
    name: 'Mage Hat',
    craftCost: [
      { item: ITEMS.meat, amount: 250 },
      { item: ITEMS.wood, amount: 250 },
      { item: ITEMS.iron, amount: 250 }
    ],
    sprite: wearablesSprites.mage_hat,
    id: Wearables.W_MAGE_HAT
  },
  [Wearables.W_MAGE]: {
    name: 'Mage Hat',
    craftCost: [
      { item: ITEMS.meat, amount: 250 },
      { item: ITEMS.wood, amount: 250 },
      { item: ITEMS.iron, amount: 250 }
    ],
    sprite: wearablesSprites.mage,
    id: Wearables.W_MAGE
  }
}


// Sprite sheet elements sizes:
// items zone: 574*492 - aspect ratio: 0.86
// width ratio with background: 0.47