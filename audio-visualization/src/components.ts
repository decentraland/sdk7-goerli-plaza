import { Schemas, engine } from '@dcl/sdk/ecs'

export const VisualAmplitude = engine.defineComponent('amplitude', {})

export const VisualBar = engine.defineComponent('bar', { index: Schemas.Number })
