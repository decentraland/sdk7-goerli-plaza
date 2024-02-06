import { Transform, engine, executeTask, Entity, Animator } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { getPlayer } from '@dcl/sdk/src/players'

export function getPlayerPosition() {
  return Transform.getOrNull(engine.PlayerEntity)?.position || Vector3.create()
}

export let currentPlayerId: string

void executeTask(async () => {
  const user = getPlayer()
  if (!user) return
  currentPlayerId = user.userId
})
