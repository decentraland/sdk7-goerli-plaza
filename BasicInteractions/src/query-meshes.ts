// import {
//   engine,
//   Transform,
//   GltfContainer,
//   PointerEventsResult,
//   inputSystem,
//   InputAction,
//   PointerEventType,
//   pointerEventsSystem
// } from '@dcl/sdk/ecs'
// import { Vector3 } from '@dcl/sdk/math'
// import { PainterComponent } from './painter'

// // robots base
// export function setupQueryMeshes() {
//   const robots = engine.addEntity()

//   Transform.create(robots, { position: Vector3.create(12, 0, 2) })
//   GltfContainer.create(robots, { src: 'models/Robots.glb' })

//   // // Robot feedback cube 1
//   const r1 = createMesh(Vector3.create(13, 1, 1.5), 'Click robot 1', 0.5, false)

//   // // Robot feedback cube 2
//   const r2 = createMesh(Vector3.create(10.5, 1, 1.5), 'Click robot 2', 0.5, false)

//   // TODO: we can not distinguish btween mesh inside gltf yet

//   pointerEventsSystem.onPointerDown(
//     robots,
//     function (cmd) {
//       console.log(cmd.hit?.meshName)
//       if (cmd.hit?.meshName === 'Droid_01') {
//         PainterComponent.createOrReplace(r1)
//       } else if (cmd.hit?.meshName === 'Droid_02') {
//         PainterComponent.createOrReplace(r2)
//       }
//     },
//     {
//       button: InputAction.IA_POINTER,
//       hoverText: 'Click'
//     }
//   )
// }
