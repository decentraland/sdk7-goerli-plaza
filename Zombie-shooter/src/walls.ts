import { Animator, Entity, engine } from '@dcl/sdk/ecs'
import { WallState } from './components/wallState'
import { getTriggerEvents, getActionEvents } from '@dcl/asset-packs/dist/events'
import { GameControllerComponent } from './components/gameController'

export function prepareWall(wall: Entity) {
  WallState.create(wall, { up: true })
}

export function breakWall(wall: Entity) {
  const wallState = WallState.getMutable(wall)
  if (wallState && wallState.up) {
    console.log('BREAK wall')
    wallState.up = false

    const actions = getActionEvents(wall)
    actions.emit('Play Fall Animation', {})
    actions.emit('Play Fall Sound', {})

    const lever = engine.getEntityOrNullByName('Lever')

    if (lever) {
      if (GameControllerComponent.has(lever)) {
        GameControllerComponent.getMutable(lever).livesLeft -= 1
      }
    }
  }
}

export function damageWall(wall: Entity) {
  const wallState = WallState.getMutable(wall)
  if (wallState && wallState.up) {
    console.log('damage wall')
    wallState.health -= 1

    const actions = getActionEvents(wall)
    actions.emit('Play Hit Animation', {})
  }
}

export function fixWall(wall: Entity) {
  const wallState = WallState.getMutable(wall)
  if (wallState && !wallState.up) {
    console.log('fix wall')
    wallState.up = true
    wallState.health = 5

    const actions = getActionEvents(wall)
    actions.emit('Play Hit Animation', {})
  }
}
