// import { SpawnerComponent } from './components/spawner'
// import { createCone } from './cone'

// const { Transform: TransformC, BoxShape, AudioSource, OnPointerDown } = engine.baseComponents
// //  let testCone = createCone()

// export function createCube(x: number, y: number, z: number, spawner = true): Entity {
//   const entity = engine.addEntity()


//   TransformC.create(entity, {
//     position: { x, y, z },
//     scale: { x: 1, y: 1, z: 1 },
//     rotation: { x: 0, y: 0, z: 0, w: 1 },
// 	//  parent: testCone
//   })

//   BoxShape.create(entity, {
//     withCollisions: true,
//     isPointerBlocker: true,
//     visible: true,
//     uvs: []
//   })

//   if (spawner) {
//     OnPointerDown.create(entity, {
//       button: 1,
//       hoverText: 'Click to spawn',
//       maxDistance: 100,
//       showFeedback: true
//     })
//     SpawnerComponent.create(entity, { lastPointerDownTs: 1 })
//   }

//   AudioSource.create(entity, {
//     audioClipUrl: 'sounds/pickUp.mp3',
//     loop: false,
//     pitch: 1,
//     playing: false,
//     volume: 1,
//   })

// //   engine.baseComponents.CameraModeArea.create(entity, {mode: CameraMode.THIRD_PERSON, area: {x:6, y: 6, z: 6}})


//   return entity
// }
