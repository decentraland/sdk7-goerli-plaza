import { ZombieComponent } from '../components/zombie'
import { playSound } from '../factory/sound'
import { ensureGameController } from '..'
import { engine, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'

export function zombieKiller() {
  for (const [zombieEntity] of engine.getEntitiesWith(ZombieComponent)) {
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, zombieEntity)) {
      console.log('BOOM!!! ', zombieEntity)

      const zombieTransform = Transform.getOrNull(zombieEntity)
      if (zombieTransform) {
        const soundEntity = engine.addEntity()
        Transform.create(soundEntity).position = zombieTransform.position
        playSound(soundEntity, 'sounds/explosion.mp3', true)
      }

      engine.removeEntity(zombieEntity)
      ensureGameController().score += 1
    }
  }
}
