import { Schemas, engine } from '@dcl/sdk/ecs'
import { PortalColor } from './portals'





////////

export const GlowColor = engine.defineComponent("glowColor", { color: Schemas.Number })
//TODO: Make type enum

export const Portal = engine.defineComponent("portal", { color: Schemas.Number, coolDown: Schemas.Boolean }, { coolDown: false })
//export const Portal = engine.defineComponent("portal", { color: Schemas.EnumNumber<PortalColor>(PortalColor, PortalColor.Blue), coolDown: Schemas.Boolean }, { coolDown: false })