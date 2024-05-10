import { engine } from '@dcl/sdk/ecs'
import { ZombieComponent } from '../components/zombie'
import { breakWall, damageWall } from '../walls'
import { WallState } from '../components/wallState'
import { playSound } from './sound'

const _COOLDOWN = 2.6

export function attackSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(ZombieComponent)) {
    const zombie = ZombieComponent.getMutable(entity)
    if (zombie.rechedEnd) {
      zombie.coolDown -= dt

      if (zombie.coolDown <= 0) {
        zombie.coolDown = _COOLDOWN

        //only remove first
        for (const [wall, wallState] of engine.getEntitiesWith(WallState)) {
          if (wallState.up) {
            if (wallState.health > 1) {
              damageWall(wall)
            } else {
              breakWall(wall)
            }
            break
          }
        }

        playSound(entity, 'sounds/attack.mp3', true)
      }
    }
  }
}
