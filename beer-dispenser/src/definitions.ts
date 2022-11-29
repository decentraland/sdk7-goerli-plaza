import {Vector3} from '@dcl/sdk/math'
import {engine, Schemas} from '@dcl/sdk/ecs'
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

enum CustomComponentIds {
  BeerGlass = 2000,
  PickedUp = 2001,
  TapComponent = 2002,
  TapBase = 2003
}

export const BeerGlass = engine.defineComponent(
  {
    beingFilled: Schemas.Boolean,
    filled: Schemas.Boolean,
    beerType: Schemas.Enum<BeerType>(Schemas.Int),
    drinking: Schemas.Boolean
  },
  CustomComponentIds.BeerGlass
)
export const PickedUp = engine.defineComponent(
  {
    child: Schemas.Int
  },
  CustomComponentIds.PickedUp
)

export const TapComponent = engine.defineComponent(
  {
    pouringTime: Schemas.Number,
    pouring: Schemas.Boolean,
    beerType: Schemas.Enum<BeerType>(Schemas.Int)
  },
  CustomComponentIds.TapComponent
)

export const TapBase = engine.defineComponent(
  {
    beerType: Schemas.Enum<BeerType>(Schemas.Int)
  },
  CustomComponentIds.TapBase
)
