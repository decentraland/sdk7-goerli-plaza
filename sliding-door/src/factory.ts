import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  pointerEventsSystem,
  Schemas,
  InputAction
} from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'

export function createWall(position: Vector3, scale: Vector3, parent?: Entity) {
  const entity = engine.addEntity()
  Transform.create(entity, {
    position,
    scale,
    parent
  })
  MeshRenderer.create(entity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    } 
  })
  MeshCollider.create(entity, {
    mesh: {
      $case: 'box',
      box: {}
    }
  })
  return entity
}

export function setMaterial(entity: Entity) {
  Material.create(entity, {
    material: {
      $case: "pbr",
      pbr: {
        albedoColor: Color3.Red(),
        metallic: 0.9,
        roughness: 0.1
      }
    }
  })
}