import { Material, MeshRenderer, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testMaterial(position: Vector3) {
  const post = createPost(position, {
    windowSize: { x: 1.5, y: 1.5 },
    fontSize: 1,
    title: '<< Ambient: Light Skybox (12:00)'
  }).move(Vector3.create(2, 0, 0))
  const cubeWithMaterialTimer = circularSlider(1.0)
  engine.addSystem(cubeWithMaterialTimer.system)
  post.onNext(cubeWithMaterialTimer.forceNext)
  post.onPrevious(cubeWithMaterialTimer.forcePrevious)
  post.onPauseResume(cubeWithMaterialTimer.togglePause)

  const entity = engine.addEntity()
  Transform.create(entity, { position })
  MeshRenderer.setSphere(entity)

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      albedoColor: Color4.Blue(),
      emissiveColor: Color4.Blue(),
      emissiveIntensity: 100
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Emissive=(0,0,1) EmissiveIntensity=100`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 0,
      roughness: 0,
      alphaTest: 0.5,
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=0 Roughness=0 Alpha=0.5`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 0.5,
      roughness: 0.2,
      alphaTest: 1,
      bumpTexture: { tex: { $case: 'texture', texture: { src: 'src/test/material/normal_mapping_normal_map.png' } } },
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=0.5 Roughness=0.2 Alpha=1 NormalMap`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 0,
      roughness: 1,
      alphaTest: 1,
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=0 Roughness=1 Alpha=1`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 0.5,
      roughness: 0.5,
      alphaTest: 1,
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=0.5 Roughness=0.5 Alpha=1`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 0,
      roughness: 0,
      alphaTest: 1,
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=0 Roughness=0 Alpha=1`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      metallic: 1,
      roughness: 0,
      alphaTest: 1,
      albedoColor: Color4.Blue()
    })
    post.displayText(`[${index}] Albedo=(0,0,1) Metallic=1 Roughness=0 Alpha=1`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })
}
