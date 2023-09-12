import { Schemas, engine } from '@dcl/sdk/ecs'


// We use this component to track and group all spinning entities.
// engine.getEntitiesWith(Spinner)
export const Spinner = engine.defineComponent('spinner', { speed: Schemas.Number })

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Cube = engine.defineComponent('cube-id', {})

/**
 * BounceScaling is the flag-component with the time elapsed since creation.
 */
export const BounceScaling = engine.defineComponent('BounceScaling', { t: Schemas.Number })
