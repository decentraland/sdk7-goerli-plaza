import {
	engine, Entity, Material, MeshCollider, MeshRenderer, Transform
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

export function createWall(position: Vector3, scale: Vector3, parent?: Entity) {
	const entity = engine.addEntity()
	Transform.create(entity, {
		position,
		scale,
		parent
	})
	MeshRenderer.setBox(entity)
	MeshCollider.setBox(entity)
	return entity
}

export function setMaterial(entity: Entity) {
	Material.setPbrMaterial(entity, {
		albedoColor: Color4.Red(),
		metallic: 0.9,
		roughness: 0.1
	})
}