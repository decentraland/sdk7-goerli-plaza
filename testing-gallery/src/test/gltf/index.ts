import { engine, GltfContainer, TextShape, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testGltfs(position: Vector3) {
  // Gltf
  const starCoinGlb = 'src/test/gltf/star-coin.glb'
  const zombieGltf = 'src/test/gltf/zombie.glb'
  // post
  const post = createPost(position, {
    windowSize: { x: 1.5, y: 1.5 },
    fontSize: 1,
    title: '<< Test Gltf and collision mask'
  }).move(Vector3.create(2, 0, 0))

  // gltf posititioning
  const gltfEntity = engine.addEntity()
  Transform.create(gltfEntity, { position })

  // test timer
  const gltfTimer = circularSlider(1.0)
  engine.addSystem(gltfTimer.system)
  post.onNext(gltfTimer.forceNext)
  post.onPrevious(gltfTimer.forcePrevious)
  post.onPauseResume(gltfTimer.togglePause)

  // Tests
  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: starCoinGlb
    })
    post.displayText(`[${g_i}] (StartCoin) Default props`)
    post.displayVideo('src/test/gltf/coin.mp4')
  })

  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: starCoinGlb,
      invisibleMeshesCollisionMask: 0,
      visibleMeshesCollisionMask: i
    })
    post.displayText(`[${g_i}] (StartCoin) collisionMask: invisible=0, visible=${i}`)
  })

  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: starCoinGlb,
      invisibleMeshesCollisionMask: i,
      visibleMeshesCollisionMask: 0
    })
    post.displayText(`[${g_i}] (StartCoin) collisionMask: invisible=${i}, visible=0`)
  })

  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: zombieGltf
    })
    post.displayText(`[${g_i}] (Zombie) Default props`)
    post.displayVideo('src/test/gltf/zombie.mp4')
  })

  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: zombieGltf,
      invisibleMeshesCollisionMask: 0,
      visibleMeshesCollisionMask: i
    })
    post.displayText(`[${g_i}] (Zombie) collisionMask: invisible=0, visible=${i}`)
  })

  gltfTimer.addRange(0, 3, 1, (g_i, i) => {
    GltfContainer.createOrReplace(gltfEntity, {
      src: zombieGltf,
      invisibleMeshesCollisionMask: i,
      visibleMeshesCollisionMask: 0
    })
    post.displayText(`[${g_i}] (Zombie) collisionMask: invisible=${i}, visible=0`)
  })
}
