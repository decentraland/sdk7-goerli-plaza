import { MoveTransformComponent } from './components/moveTransport'

const { Transform, GLTFShape } = engine.baseComponents

export function createZombie(): Entity {
  const zombie = engine.addEntity()

  Transform.create(zombie, {
    position: { x: 12, y: 1, z: 3 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  GLTFShape.create(zombie, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    src: 'models/zombie.glb'
  })

  MoveTransformComponent.create(zombie, {
    start: { x: 12, y: 1, z: 3 },
    end: { x: 12, y: 1, z: 13 },
    duration: 10,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.02,
    hasFinished: false,
    interpolationType: 15
  })

  return zombie
}
