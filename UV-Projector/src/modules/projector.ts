import { Entity, Material, MeshRenderer, PBMaterial_PbrMaterial, Transform, TransformType, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

export class Projector {

    parent: Entity
    planeMesh: Entity
    originMarker: Entity
    uMarker: Entity
    vMarker: Entity
    aspect: number = 9 / 16

    constructor(trans: TransformType, isVideoFlipped: boolean, mat?: PBMaterial_PbrMaterial) {
        this.parent = engine.addEntity()
        this.planeMesh = engine.addEntity()
        MeshRenderer.setPlane(this.planeMesh)
        Transform.create(this.planeMesh, { rotation: (Quaternion.fromEulerDegrees(180, 0, 0)), parent: this.parent })
        if (mat) {
            Material.setPbrMaterial(this.planeMesh, mat)
        }

        VisibilityComponent.createOrReplace(this.planeMesh, { visible: false }) //Set to true for debug

        Transform.create(this.parent, trans)

        //workaround for flipped video UV
        if (isVideoFlipped) {
            Transform.getMutable(this.parent).scale.y *= -1
        }

        this.originMarker = engine.addEntity()
        MeshRenderer.setBox(this.originMarker)
        Transform.create(this.originMarker, { scale: Vector3.create(0.1, 0.1, 0.1) })

        this.uMarker = engine.addEntity()
        MeshRenderer.setBox(this.uMarker)
        Transform.create(this.uMarker, { scale: Vector3.create(0.1, 0.1, 0.1) })

        this.vMarker = engine.addEntity()
        MeshRenderer.setBox(this.vMarker)
        Transform.create(this.vMarker, { scale: Vector3.create(0.1, 0.1, 0.1) })

        //DEBUG SHAPES - Set to True to turn on
        VisibilityComponent.createOrReplace(this.originMarker, { visible: true })
        VisibilityComponent.createOrReplace(this.uMarker, { visible: true })
        VisibilityComponent.createOrReplace(this.vMarker, { visible: true })
    }

    getNormalVector(): Vector3 {

        let normal = Vector3.rotate(Vector3.Forward(), Transform.get(this.parent).rotation)

        return normal
    }

    getPos(): Vector3 {

        let pos = Transform.get(this.parent).position

        return pos
    }

    projectPoint(_point: Vector3): Vector3 {

        let normal = this.getNormalVector()
        let vecToPoint = Vector3.subtract(_point, Transform.get(this.parent).position)
        let scaler = Vector3.dot(vecToPoint, normal) / Math.pow(Vector3.length(normal), 2)
        let result = Vector3.scale(normal, scaler)

        return Vector3.scale(result, -1)
    }

    getUVfromCoords(_point: Vector3): Vector3 {

        const origin = this.getOrigin()
        //Vector3.copyFrom(this.getOrigin(), origin)

        const U = Vector3.subtract(this.getCorner("10"), origin)
        const V = Vector3.subtract(this.getCorner("01"), origin)

        Transform.getMutable(this.uMarker).position = Vector3.add(U, origin)
        Transform.getMutable(this.vMarker).position = Vector3.add(V, origin)

        let vecToPoint = Vector3.subtract(_point, origin)

        let uCoord = Vector3.dot(vecToPoint, U) / Math.pow(Vector3.length(U), 2)
        let vCoord = Vector3.dot(vecToPoint, V) / Math.pow(Vector3.length(V), 2)

        return Vector3.create(uCoord, vCoord)
    }

    getOrigin(): Vector3 {

        let originCorner = this.getCorner("00")

        Transform.getMutable(this.originMarker).position = originCorner

        return originCorner
    }

    getCorner(cornerID: string): Vector3 {

        const _transform = Transform.getMutable(this.parent)
        let corner = Vector3.create(0, 1, 0)

        switch (cornerID) {
            case "00":
                {
                    corner = Vector3.create(_transform.scale.x / 2, -_transform.scale.y / 2, 0)
                    break
                }
            case "10":
                {
                    corner = Vector3.create(-_transform.scale.x / 2, -_transform.scale.y / 2, 0)
                    break
                }
            case "11":
                {
                    corner = Vector3.create(-_transform.scale.x / 2, _transform.scale.y / 2, 0)
                    break
                }
            case "01":
                {
                    corner = Vector3.create(_transform.scale.x / 2, _transform.scale.y / 2, 0)
                    break
                }
        }

        corner = Vector3.rotate(corner, _transform.rotation)
        corner = Vector3.add(corner, _transform.position)
        return corner 
    }

    setScaleHorizontal(_scale: number) {
        Vector3.scale(Transform.get(this.parent).scale, _scale * 9 / 16)
    }
}