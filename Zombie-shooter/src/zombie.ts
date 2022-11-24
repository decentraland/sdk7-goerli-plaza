import { GameControllerComponent } from './components/gameController'
import { MoveTransformComponent } from './components/moveTransport'
import { coneEntity } from './game'
import { addClickBehavior } from './systems/clickable'
import { onMoveZombieFinish } from './systems/moveZombie'

import { playSound } from './systems/sound'

export function createZombie(xPos: number): Entity {
  const zombie = engine.addEntity()

  Transform.create(zombie, {
    position: { x: xPos, y: 1, z: 3 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  GltfContainer.create(zombie, {
    src: 'models/zombie.glb'
  })

  MoveTransformComponent.create(zombie, {
    start: { x: xPos, y: 1, z: 3 },
    end: { x: xPos, y: 1, z: 12 },
    duration: 6,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.04,
    hasFinished: false,
    interpolationType: 1
  })

  Animator.create(zombie, {
    states: [
      {
        clip: 'Walking',
        loop: true,
        name: 'Walk',
        playing: true,
        shouldReset: false,
        speed: 1,
        weight: 1
      },
      {
        clip: 'Attacking',
        loop: true,
        name: 'Attack',
        playing: false,
        shouldReset: false,
        speed: 1,
        weight: 1
      }
    ]
  })

  onMoveZombieFinish(zombie, () => {
    dcl.log('finished zombie', zombie)

    if (GameControllerComponent.has(coneEntity)) {
      GameControllerComponent.getMutable(coneEntity).livesLeft -= 1
    }

    const animator = Animator.getMutable(zombie)
    const walkAnim = animator.states[0] // animator.states.find( (anim) =>{return anim.clip=="Walking"})
    const attackAnim = animator.states[1] //animator.states.find( (anim) =>{ return anim.clip=="Attacking"})
    if (walkAnim && attackAnim) {
      walkAnim.playing = false
      walkAnim.loop = false
      attackAnim.playing = true
      attackAnim.loop = true
    }

    const nfts = engine.getEntitiesWith(NftShape)

    //only remove first
    for (const [entity] of nfts) {
      engine.removeEntity(entity)
      break
    }

    playSound(zombie, 'sounds/attack.mp3', true)
  })

  addClickBehavior(zombie, () => {
    dcl.log('BOOM!!!')

    engine.removeEntity(zombie)
    playSound(zombie, 'sounds/explosion.mp3', true)

    if (GameControllerComponent.has(coneEntity)) {
      GameControllerComponent.getMutable(coneEntity).score += 1
    }
  })

  return zombie
}
