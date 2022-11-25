import { PathDataComponent } from './components/path'
import { SpeedComponent } from './components/swimSpeed'
import { cpoints } from './sharkPath'

export function createShark() {
  const shark = engine.addEntity()
  Transform.create(shark, {
    position: { x: 8, y: 3, z: 8 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
    scale: { x: 0.5, y: 0.5, z: 0.5 }
  })
  GltfContainer.create(shark, {
    src: 'models/shark.glb'
  })
  Animator.create(shark, {
    states: [
      {
        clip: 'swim',
        loop: true,
        playing: true,
        speed: 0.5,
        weight: 0.5,
        name: 'swim'
      },
      {
        clip: 'bite',
        loop: true,
        playing: false,
        shouldReset: false,
        name: 'bite'
      }
    ]
  })

  PathDataComponent.create(shark, {
    path: cpoints,
    origin: 0,
    target: 1,
    startRot: Quaternion.Zero(),
    endRot: Quaternion.Zero(),
    fraction: 0,
    paused: false
  })

  SpeedComponent.create(shark, {
    speed: 0.5
  })

  // MoveTransformComponent.create(shark, {
  // 	hasFinished: false,
  // 	start: cpoints[0],
  // 	end: cpoints[1],
  // 	fraction: 0
  // })

  // RotateTransformComponent.create(shark, {
  // 	hasFinished: false,
  // 	start: Quaternion.Zero(),
  // 	end: Quaternion.Zero(),
  // 	fraction: 1,
  // 	interpolationType: 0
  // })
}
