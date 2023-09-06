import { Schemas, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

const SCENE_SIZE_X = 1
const SCENE_SIZE_Y = 1

export const OnlyInScene = engine.defineComponent('OnlyInScene', {})

export function onlyInSceneSystem(dt: number) {
  for (const [entity, _onlyInScene] of engine.getEntitiesWith(OnlyInScene)) {
    const finalPos = utils.getWorldPosition(entity)

    if (finalPos.x < 0 || finalPos.x >= SCENE_SIZE_X * 16 || finalPos.y < 0 || finalPos.y >= SCENE_SIZE_Y * 16) {
      if (!VisibilityComponent.has(entity)) {
        VisibilityComponent.createOrReplace(entity, { visible: false })
      }
    } else if (VisibilityComponent.has(entity)) {
      VisibilityComponent.deleteFrom(entity)
    }
  }
}
