import { ZombieComponent } from '../components/zombie'
import { playSound } from '../factory/sound'
import { ensureGameController } from '../game'



export function zombieKiller() {
  for (const [zombieEntity] of engine.getEntitiesWith(ZombieComponent)) {
	if (wasEntityClicked(zombieEntity, ActionButton.PRIMARY)) {
      dcl.log('BOOM!!! ', zombieEntity)

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
