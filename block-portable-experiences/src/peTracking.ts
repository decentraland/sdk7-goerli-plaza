import { getPlayer } from '@dcl/sdk/src/players'
import { spawn, getPortableExperiencesLoaded, kill } from '~system/PortableExperiences'
import { PlayerIdentityData, engine, executeTask } from '@dcl/sdk/ecs'
import { hideUI, showUI } from './denyUI'
import { onEnterScene, onLeaveScene } from '@dcl/sdk/src/players'

export let isWearingPE: boolean = false
export let hasWornPE: boolean = false

let MyPlayer = getPlayer()

export async function checkPortableExperience() {
  const { loaded } = await getPortableExperiencesLoaded({})
  const userData = getPlayer()

  if (!userData || !userData.avatar || !userData.wearables) return false

  console.log('PORTABLE EXPERIENCES: ', loaded)
  console.log(loaded.length)

  for (const portableExperience of loaded) {
    const { pid } = portableExperience
    await kill({ pid })
  }

  if (loaded && loaded.length > 0) {
    isWearingPE = true
    hasWornPE = true
    showUI()
  } else {
    isWearingPE = false
  }

  console.log('HAS PE? ', loaded.length > 0)
  return loaded.length > 0
}

// Get all players already in scene
for (const [entity, data] of engine.getEntitiesWith(PlayerIdentityData)) {
  let player = getPlayer({ userId: data.address })
  console.log('player is nearby: ', player?.name)
}

// Event when player enters scene
onEnterScene(async (player) => {
  if (!player) return
  console.log('player entered scene: ', player.userId)
  if (player.userId === player?.userId) {
    await checkPortableExperience()

    if (!isWearingPE) {
      hasWornPE = false
    }

    if (hasWornPE || isWearingPE) {
      showUI()
    }
  }
})

// Event when player leaves scene
onLeaveScene(async (userId) => {
  if (!userId) return
  if (!MyPlayer) {
    MyPlayer = getPlayer()
    if (!MyPlayer) return
  }
  console.log('player left scene: ', userId)
  if (userId === MyPlayer.userId) {
    hideUI()
  }
})
