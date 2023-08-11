import { getUserData } from '~system/UserIdentity'
import { spawn, getPortableExperiencesLoaded, kill } from '~system/PortableExperiences'
import { executeTask } from '@dcl/sdk/ecs'
import { hideUI, showUI } from './denyUI'
import { getPlayersInScene } from '~system/Players'
import { onEnterSceneObservable, onLeaveSceneObservable } from '@dcl/sdk/observables'

export let isWearingPE: boolean = false
export let hasWornPE: boolean = false

export async function checkPortableExperience() {
  const { loaded } = await getPortableExperiencesLoaded({})
  const userData = await getUserData({})

  if (!userData || !userData.data || !userData.data.avatar || !userData.data.avatar.wearables) return false

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
executeTask(async () => {
  let connectedPlayers = await getPlayersInScene({})
  connectedPlayers.players.forEach((player) => {
    console.log('player is nearby: ', player.userId)
  })
})

// Event when player enters scene
onEnterSceneObservable.add(async (player) => {
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
// Event when player enters scene
onLeaveSceneObservable.add((player) => {
  console.log('player left scene: ', player.userId)
  if (player.userId === player?.userId) {
    hideUI()
  }
})
