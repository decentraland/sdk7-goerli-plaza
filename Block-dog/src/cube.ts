const { Transform: TransformC, BoxShape, AudioSource } = engine.baseComponents

export function createCube(x: number, y: number, z: number): Entity {
  const entity = engine.addEntity()

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

  AudioSource.create(entity, {
    audioClipUrl: 'sounds/pickUp.mp3',
    loop: false,
    pitch: 1,
    playing: false,
    volume: 1,
  })

  return entity
}
