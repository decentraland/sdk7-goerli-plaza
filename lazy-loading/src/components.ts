import { engine, Schemas } from '@dcl/sdk/ecs'

const SubScene = {
  originalPos: Schemas.Vector3,
  showing: Schemas.Boolean
}
const Scene = {
    originalPos: Schemas.Vector3,
    showing: Schemas.Boolean
  }

export const SubSceneComp = engine.defineComponent('Subscene', SubScene)
export const SceneComp = engine.defineComponent('Scene', Scene)
