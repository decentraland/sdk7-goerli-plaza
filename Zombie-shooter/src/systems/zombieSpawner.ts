import { GameControllerComponent } from '../components/gameController'
// import { createCube } from '../cube'

import { createZombie } from '../zombie'
import { playSound } from './sound'
import { engine, AudioSource } from '@dcl/sdk/ecs'

export function zombieSpawnSystem(dt: number) {
  const gameControllers = engine.getEntitiesWith(GameControllerComponent)

  for (const [entity] of gameControllers) {
    const controller = GameControllerComponent.getMutable(entity)
    if (!controller.spawnActive) return

    if (controller.livesLeft <= 0) {
      lose()
    } else if (controller.score >= controller.winningScore) {
      win()
    }
    //else if(controller.maxZombies < engine.getEntitiesWith(MoveTransformComponent)){
    // TOO MANY ZOMBIES
    //}

    controller.spawnCountDown -= dt
    if (controller.spawnCountDown < 0) {
      controller.spawnCountDown = controller.spawnInterval
      console.log('SPAWNING NEW ZOMBIE')
      spawnZombie()
      playSound(entity, 'sounds/pickUp.mp3', true)
    }
  }
}

// how do I pass the controller component as a param to this function????
function lose() {
  console.log('GAME OVER!!')
  endGame()
}

function win() {
  console.log('YOU WIN!!')
  endGame()
}

function spawnZombie() {
  const xPos = 2 + Math.random() * 10

  createZombie(xPos)
}

function endGame() {
  const lever = engine.getEntityOrNullByName('Lever')

  if (lever) {
    if (GameControllerComponent.has(lever)) {
      GameControllerComponent.getMutable(lever).spawnActive = false
    }
  }

  console.log('GAME OVER')
  //TODO game over message
}
