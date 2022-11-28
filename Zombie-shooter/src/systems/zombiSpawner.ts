import { GameControllerComponent } from '../components/gameController'
// import { createCube } from '../cube'
import { coneEntity } from '..'
import { createZombie } from '../zombie'
import { playSound } from './sound'

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
      dcl.log('SPAWNING NEW ZOMBIE')
      spawnZombie()
      playSound(entity, 'sounds/pickUp.mp3', true)
    }
  }
}

engine.addSystem(zombieSpawnSystem)

// how do I pass the controller component as a param to this function????
function lose() {
  dcl.log('GAME OVER!!')
  endGame()
}

function win() {
  dcl.log('YOU WIN!!')
  endGame()
}

function spawnZombie() {
  const xPos = 2 + Math.random() * 10

  createZombie(xPos)
}

function endGame() {
  if (GameControllerComponent.has(coneEntity)) {
    GameControllerComponent.getMutable(coneEntity).spawnActive = false
  }

  if (AudioSource.has(coneEntity)) {
    AudioSource.getMutable(coneEntity).playing = false
  }
}
