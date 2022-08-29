import { CubeIdentifierComponent } from "../components/cube"

const { Transform: TransformC, BoxShape, AudioSource, OnPointerDown } = engine.baseComponents

export function createCube(x: number, y: number, z: number, spawner = true): Entity {
  const entity = engine.addEntity()

  CubeIdentifierComponent.create(entity, { id: entity })

  TransformC.create(entity, {
    position: { x, y, z },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  BoxShape.create(entity, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    uvs: []
  })

  if (spawner) {
    OnPointerDown.create(entity, {
      button: 1,
      hoverText: 'Press E to spawn',
      maxDistance: 100,
      showFeedback: true
    })
  }

  AudioSource.create(entity, {
    audioClipUrl: 'sounds/pickUp.mp3',
    loop: false,
    pitch: 1,
    playing: false,
    volume: 1
  })

  return entity
}
