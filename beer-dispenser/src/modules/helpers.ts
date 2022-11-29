import { Transform, engine, executeTask, Entity, Animator } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { getUserData } from '~system/UserIdentity'

export function getPlayerPosition() {
  return Transform.getOrNull(engine.PlayerEntity)?.position || Vector3.create()
}

export let currentPlayerId: string

void executeTask(async () => {
  const user = await getUserData({})
  if (!user.data) return
  currentPlayerId = user.data?.userId
})

export function* getEntitiesWithParent(parent: Entity) {
  for (const [entity, transform] of engine.getEntitiesWith(Transform)) {
    if (transform.parent === parent) {
      yield [entity, transform]
    }
  }
}

export function getEntityParent(entity: Entity) {
  return Transform.getOrNull(entity)?.parent || engine.RootEntity
}

export function playSingleAnim(entity: Entity, animName: string) {
  const animator = Animator.getMutableOrNull(entity)
  if (!animator) return

  const animItem = animator.states.find((item) => item.name === animName)
  if (!animItem) return

  // Reset all other animations
  for (const state of animator.states) {
    state.playing = false
  }

  animItem.playing = true
  animItem.loop = false

  return animItem
}
