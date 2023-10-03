import { Schemas, engine } from '@dcl/sdk/ecs'

export enum PrecipType {
  drop,
  flake
}

// Holds if particle is raindrop or snowflake
export const IsPrecip = engine.defineComponent('isPrecipComponent', {
  type: Schemas.EnumNumber(PrecipType, PrecipType.drop)
})

// Defines spin propertie of snowflake
export const Spin = engine.defineComponent('spin', {
  dir: Schemas.Vector3
})
