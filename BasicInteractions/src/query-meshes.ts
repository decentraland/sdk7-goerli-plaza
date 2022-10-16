import { PainterComponent } from './painter'
import { createMesh } from './utils'

// robots base
export function setupQueryMeshes() {
  const robots = engine.addEntity()

  Transform.create(robots, { position: Vector3.create(12, 0, 2) })
  GltfContainer.create(robots, { src: 'models/Robots.glb' })

  // // Robot feedback cube 1
  createMesh(Vector3.create(13, 1, 1.5), 'Click robot 1', 0.5, false)

  // // Robot feedback cube 2
  const r2 = createMesh(Vector3.create(10.5, 1, 1.5), 'Click robot 2', 0.5, false)

  // TODO: we can not distinguish btween mesh inside gltf yet
  engine.addSystem(() => {
    const results = PointerEventsResult.getOrNull(engine.RootEntity)
    if (results) {
      //   log({ results })
    }

    if (wasEntityClicked(r2, InputAction.IA_POINTER)) {
      PainterComponent.createOrReplace(r2)
    }
  })

  // // Click event
  // robots.addComponent(
  //   new OnPointerDown(
  //     (e) => {
  //       log(e.hit.meshName)
  //       if (e.hit.meshName === 'Droid_01') {
  //         activate(robot1Cube)
  //       } else if (e.hit.meshName === 'Droid_02') {
  //         activate(robot2Cube)
  //       }
  //     },
  //     { button: ActionButton.POINTER, showFeedback: false }
  //   )
  // )
}
