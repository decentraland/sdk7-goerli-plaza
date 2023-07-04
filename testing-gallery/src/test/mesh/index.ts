import { MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testMeshes(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const meshTimer = circularSlider(1.0)
  engine.addSystem(meshTimer.system)
  post.onNext(meshTimer.forceNext)
  post.onPrevious(meshTimer.forcePrevious)
  post.onPauseResume(meshTimer.togglePause)

  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position })

  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 1.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 1.0)
    post.displayText('cylinder')
    post.displayImage('src/test/mesh/cylinder.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setSphere(meshEntity)
    MeshCollider.setSphere(meshEntity)
    post.displayText('sphere')
    post.displayImage('src/test/mesh/sphere.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setBox(meshEntity)
    MeshCollider.setBox(meshEntity)
    post.displayText('box')
    post.displayImage('src/test/mesh/box.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setPlane(meshEntity)
    MeshCollider.setPlane(meshEntity)
    post.displayText('plane')
    post.displayImage('src/test/mesh/plane.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 0.5)
    MeshCollider.setCylinder(meshEntity, 1.0, 0.5)
    post.displayText('cylynder (1, .5)')
    post.displayImage('src/test/mesh/cylinder-1-.5.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 0.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 0.0)
    post.displayText('cylynder (1, .0)')
    post.displayImage('src/test/mesh/cylinder-1-0.png')
  })
}
