import { ZombieComponent } from '../components/zombie'
import { playSound } from '../systems/sound'

import { engine, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { GameControllerComponent } from '../components/gameController'


const _COOLDOWN = 0.7

var coolDown = 0

export function zombieKiller(dt: number) {

  coolDown -= dt

  const result = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
  if (result && coolDown <= 0) {

    playSound(engine.CameraEntity, 'sounds/explosion.mp3', true)
    coolDown = _COOLDOWN

    for (const [zombieEntity] of engine.getEntitiesWith(ZombieComponent)) {
      if (result.hit?.entityId === zombieEntity) {

        console.log('SHOT A ZOMbiE!!! ', zombieEntity)

        engine.removeEntity(zombieEntity)

        const lever = engine.getEntityOrNullByName('Lever')

        if (lever) {
          if (GameControllerComponent.has(lever)) {
            GameControllerComponent.getMutable(lever).score += 1
          }
        }


      }
    }
  }
}
