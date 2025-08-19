import { AudioSource, engine, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import {} from '@dcl/sdk/math'
import { GameControllerComponent } from './components/gameController'

import { moveSystem } from './systems/moveZombie'
import { zombieSpawnSystem } from './systems/zombieSpawner'
import { createText } from './text'
import { setupUi } from './ui'
import { zombieKiller } from './systems/zombieKiller'
import { getTriggerEvents, getActionEvents } from '@dcl/asset-packs/dist/events'
import { WallState } from './components/wallState'
import { fixWall, prepareWall } from './walls'
import { attackSystem } from './systems/zombieAttack'

const _LIVES = 4
const _WINNING_SCORE = 15
const _SPAWN_INTERVAL = 3

export function main() {
  // lever
  const lever = engine.getEntityOrNullByName('Lever')

  if (lever) {
    createText(lever, 'Click to Play')

    const actions = getActionEvents(lever)

    actions.on('Activate', () => {
      console.log('STARTING GAME')

      if (GameControllerComponent.has(lever)) {
        if (!GameControllerComponent.get(lever).spawnActive) {
          const controller = GameControllerComponent.getMutable(lever)
          controller.spawnActive = true
          controller.livesLeft = _LIVES
          controller.score = 0
        } else return
      } else {
        GameControllerComponent.create(lever, {
          spawnActive: true,
          livesLeft: _LIVES,
          score: 0,
          spawnCountDown: 0,
          spawnInterval: _SPAWN_INTERVAL,
          winningScore: _WINNING_SCORE,
          maxZombies: 10
        })
      }

      for (const [wall] of engine.getEntitiesWith(WallState)) {
        fixWall(wall)
      }

      AudioSource.playSound(lever, 'assets/scene/Audio/pickUp.mp3', true)
    })
  }

  // walls
  const wall1 = engine.getEntityOrNullByName('Wall1')
  const wall2 = engine.getEntityOrNullByName('Wall2')
  const wall3 = engine.getEntityOrNullByName('Wall3')
  const wall4 = engine.getEntityOrNullByName('Wall4')
  if (wall1 && wall2 && wall3 && wall4) {
    prepareWall(wall1)
    prepareWall(wall2)
    prepareWall(wall3)
    prepareWall(wall4)
  }

  AudioSource.create(engine.CameraEntity)

  // UI with GitHub link
  setupUi()
}

engine.addSystem(zombieSpawnSystem)
engine.addSystem(moveSystem)
engine.addSystem(zombieKiller)
engine.addSystem(attackSystem)
