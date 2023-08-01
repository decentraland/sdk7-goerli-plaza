import { Schemas, engine } from '@dcl/sdk/ecs'

// Config
export enum PortalColor {
	Blue = 0,
	Orange = 1
}

////////

export const GlowColor = engine.defineComponent('glowColor', { color: Schemas.Number })


export const Portal = engine.defineComponent(
	'portal',
	{ color: Schemas.EnumNumber<PortalColor>(PortalColor, PortalColor.Blue), coolDown: Schemas.Boolean },
	{ coolDown: false }
)
