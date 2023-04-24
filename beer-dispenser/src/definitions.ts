import { Vector3 } from '@dcl/sdk/math'
import { engine, Schemas } from '@dcl/sdk/ecs'
/**
 * Types
 */

export enum BeerType {
  NONE,
  RED,
  YELLOW,
  GREEN
}

export type TapDataType = {
  model: string
  position: Vector3
  name: string
}

export const TAP_DATA: Record<string, TapDataType> = {
  [BeerType.RED]: {
    name: 'Red',
    model: 'models/redTap.glb',
    position: Vector3.create(0.368, 0, 0.31)
  },
  [BeerType.YELLOW]: {
    name: 'Yellow',
    model: 'models/yellowTap.glb',
    position: Vector3.create(0, 0, 0.31)
  },
  [BeerType.GREEN]: {
    name: 'Green',
    model: 'models/greenTap.glb',
    position: Vector3.create(-0.368, 0, 0.31)
  }
}

export function getTapData(tapBeerType: BeerType) {
  return (TAP_DATA as any)[tapBeerType] as TapDataType
}

/**
 * Component Definitions
 */

export const BeerGlass = engine.defineComponent('BeerGlass', {
  beingFilled: Schemas.Boolean,
  filled: Schemas.Boolean,
  beerType: Schemas.EnumNumber<BeerType>(BeerType, BeerType.NONE),
  drinking: Schemas.Boolean
})
export const PickedUp = engine.defineComponent('PickedUp', {
  child: Schemas.Entity
})

export const TapComponent = engine.defineComponent('TapComponent', {
  pouringTime: Schemas.Number,
  pouring: Schemas.Boolean,
  beerType: Schemas.EnumNumber<BeerType>(BeerType, BeerType.NONE)
})

export const TapBase = engine.defineComponent('TapBase', {
  beerType: Schemas.EnumNumber<BeerType>(BeerType, BeerType.NONE)
})
