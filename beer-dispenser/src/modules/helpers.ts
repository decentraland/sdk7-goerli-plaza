import { Transform, engine, executeTask, Entity, Animator } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { getPlayer } from '@dcl/sdk/src/players'
import { getUserData } from '~system/UserIdentity'

export function getPlayerPosition() {
  return Transform.getOrNull(engine.PlayerEntity)?.position || Vector3.create()
}

export let currentPlayerId: string | undefined = undefined



export async function getPlayerID() {
  const user = await getUserData({})
  if (!user || !user.data) {
    console.log('No user found')
    return
  }
  console.log('User found', user.data.userId)

  currentPlayerId = user.data.userId
}
