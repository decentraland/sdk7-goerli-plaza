import { Entity, TransformType, PBMaterial_PbrMaterial, engine, MeshRenderer, Transform, Material, VisibilityComponent, PBMeshRenderer_PlaneMesh, PBMeshRenderer, MeshCollider } from '@dcl/sdk/ecs'
import { Projector } from './projector'
import { Vector3, Quaternion, Plane } from '@dcl/sdk/math'

export class Screen {

  parent: Entity
  screenMesh: Entity
  uv: number[] = []
  isTwoSided: boolean = true
  isCollider: boolean = false

  corner00: Vector3
  corner10: Vector3
  corner11: Vector3
  corner01: Vector3

  constructor(_transform: TransformType, _twoSided: boolean, _mat: PBMaterial_PbrMaterial, uvs?: number[]) {

    this.parent = engine.addEntity()
    this.isTwoSided = _twoSided

    this.screenMesh = engine.addEntity()
    MeshRenderer.setPlane(this.screenMesh, this.uv)
    Transform.create(this.screenMesh, { rotation: Quaternion.fromEulerDegrees(0, 0, 0), parent: this.parent })
    Material.setPbrMaterial(this.screenMesh, _mat)

    Transform.create(this.parent, _transform)

    //calculate corner positions in world-space
    //bottom left
    this.corner00 = Vector3.create(_transform.scale.x / 2, -_transform.scale.y / 2, 0)
    Vector3.rotate(this.corner00, _transform.rotation)
    Vector3.add(this.corner00, _transform.position)

    //bottom right
    this.corner10 = Vector3.create(-_transform.scale.x / 2, -_transform.scale.y / 2, 0)
    Vector3.rotate(this.corner10, _transform.rotation)
    Vector3.add(this.corner10, _transform.position)

    //top right
    this.corner11 = Vector3.create(-_transform.scale.x / 2, _transform.scale.y / 2, 0)
    Vector3.rotate(this.corner11, _transform.rotation)
    Vector3.add(this.corner11, _transform.position)

    //top left
    this.corner01 = Vector3.create(_transform.scale.x / 2, _transform.scale.y / 2, 0)
    Vector3.rotate(this.corner01, _transform.rotation)
    Vector3.add(this.corner01, _transform.position)
  }

  // normal vector of the screen plane
  getNormal(): Vector3 {

    let normal = Vector3.rotate(Vector3.Forward(), Transform.get(this.parent).rotation)

    return normal
  }

  //update UV coords of the screen plane
  setUVs(_uv00: Vector3, _uv10: Vector3, _uv11: Vector3, _uv01: Vector3): number[] {

    let uvs = this.uv = [
      // -- Side A
      _uv00.x,
      _uv00.y,

      _uv10.x,
      _uv10.y,

      _uv11.x,
      _uv11.y,

      _uv01.x,
      _uv01.y,

      // -- Side B
      _uv00.x,
      _uv00.y,

      _uv10.x,
      _uv10.y,

      _uv11.x,
      _uv11.y,

      _uv01.x,
      _uv01.y
    ]

    const mutableMesh = MeshRenderer.getMutable(this.screenMesh)
    if (mutableMesh.mesh?.$case === 'plane') {
      mutableMesh.mesh.plane.uvs = uvs
    }

    return uvs
  }

  // in case the screen is transformed, update all corner positions
  updateCorners() {

    const transform = Transform.get(this.parent)

    this.updateCorner(this.corner00, Vector3.create(transform.scale.x / 2, -transform.scale.y / 2, 0))
    this.updateCorner(this.corner10, Vector3.create(-transform.scale.x / 2, -transform.scale.y / 2, 0))
    this.updateCorner(this.corner11, Vector3.create(-transform.scale.x / 2, transform.scale.y / 2, 0))
    this.updateCorner(this.corner01, Vector3.create(transform.scale.x / 2, -transform.scale.y / 2, 0))
  }

  // updates the world-space position of a single corner based on the screen's new transformation
  updateCorner(cornerVec: Vector3, offsetVec: Vector3) {

    const _transform = Transform.get(this.parent)

    //Vector3.copyFrom(offsetVec, cornerVec)
    cornerVec = Vector3.clone(offsetVec)
    cornerVec = Vector3.rotate(cornerVec, _transform.rotation)
    cornerVec = Vector3.add(cornerVec, _transform.position)

  }

  // project all 4 corners of the screen onto the projector plane (defined by its center and its normal vector)
  projectPoints(projNormal: Vector3, projPlanePos: Vector3) {

    this.updateCorners()
    this.getProjectedCorner("00", projNormal, projPlanePos)
    this.getProjectedCorner("10", projNormal, projPlanePos)
    this.getProjectedCorner("11", projNormal, projPlanePos)
    this.getProjectedCorner("01", projNormal, projPlanePos)
  }

  getProjectedCorner(cornerID: string, projNormal: Vector3, projPlanePos: Vector3): Vector3 {

    const transform = Transform.getMutable(this.parent)

    let cornerVec = Vector3.Up()
    let offsetVec = Vector3.Zero()

    switch (cornerID) {
      case "00": {
        offsetVec = Vector3.create(transform.scale.x / 2, -transform.scale.y / 2, 0)
        break
      }
      case "10":
        {
          offsetVec = Vector3.create(-transform.scale.x / 2, -transform.scale.y / 2, 0)
          break
        }
      case "11":
        {
          offsetVec = Vector3.create(-transform.scale.x / 2, transform.scale.y / 2, 0)
          break
        }
      case "01":
        {
          offsetVec = Vector3.create(transform.scale.x / 2, transform.scale.y / 2, 0)
          break
        }
    }

    // world-space position of the chosen vector
    //Vector3.copyFrom(offsetVec, cornerVec)
    cornerVec = offsetVec
    cornerVec = Vector3.rotate(cornerVec, transform.rotation)
    cornerVec = Vector3.add(cornerVec, transform.position)

    // math to do the projection onto the projector plane
    let vecToPoint = Vector3.subtract(cornerVec, projPlanePos)
    let scaler = Vector3.dot(vecToPoint, projNormal) / Math.pow(Vector3.length(projNormal), 2)
    let result = Vector3.scale(projNormal, scaler)
    result = Vector3.scale(result, -1)

    return Vector3.create(cornerVec.x + result.x, cornerVec.y + result.y, cornerVec.z + result.z)
  }


}

// groups the Screens that use the same projector, and stores a reference to that projector
export class ScreenGroup {
  screens: Screen[] = []
  projectorReference: Projector

  constructor(_projector: Projector) {
    this.projectorReference = _projector
  }

  addScreen(_screen: Screen) {
    this.screens.push(_screen)
  }

  updateScreens(_targetPos: Vector3): number[] {

    const projectorTransform = Transform.getMutable(this.projectorReference.parent)
    const projectorPos = this.projectorReference.getPos()
    const projectorNormal = this.projectorReference.getNormalVector()
    let result: number[] = []

    for (let i = 0; i < this.screens.length; i++) {

      if (!this.screens[i].isTwoSided) {

        // check whether the player's camera is looking at the screen from the front side
        let facingPlayerFactor = Vector3.dot(this.screens[i].getNormal(), Vector3.subtract(_targetPos, Transform.get(this.screens[i].parent).position))

        if (facingPlayerFactor >= 0) {
          VisibilityComponent.createOrReplace(this.screens[i].screenMesh, { visible: true })
          this.screens[i].projectPoints(this.projectorReference.getNormalVector(), this.projectorReference.getPos())
          result = this.screens[i].setUVs(
            this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("00", projectorNormal, projectorPos)),
            this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("10", projectorNormal, projectorPos)),
            this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("11", projectorNormal, projectorPos)),
            this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("01", projectorNormal, projectorPos))
          )
        } else {
          VisibilityComponent.createOrReplace(this.screens[i].screenMesh, { visible: false })
        }
        // if the screen is set to two-sided then update it regardless of the player's view    
      } else {
        this.screens[i].projectPoints(this.projectorReference.getNormalVector(), this.projectorReference.getPos())
        result = this.screens[i].setUVs(
          this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("00", projectorNormal, projectorPos)),
          this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("10", projectorNormal, projectorPos)),
          this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("11", projectorNormal, projectorPos)),
          this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("01", projectorNormal, projectorPos))
        )

      }

    }
    return result
  }
}

export class ColumnScreen {
  screens: Screen[] = []

  constructor(group: ScreenGroup, _pos: Vector3, _radius: number, _height: number, _isTwoSided: boolean, _mat: PBMaterial_PbrMaterial) {

    let screen1 = new Screen({
      position: Vector3.create(_pos.x + _radius / 2, _pos.y + _height / 2, _pos.z),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(_radius, _height, 1)
    },
      _isTwoSided,
      _mat)

    let screen2 = new Screen({
      position: Vector3.create(_pos.x - _radius / 2, _pos.y + _height / 2, _pos.z),
      rotation: Quaternion.fromEulerDegrees(0, 270, 0),
      scale: Vector3.create(_radius, _height, 1)
    },
      _isTwoSided,
      _mat)

    let screen3 = new Screen({
      position: Vector3.create(_pos.x, _pos.y + _height / 2, _pos.z + _radius / 2),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(_radius, _height, 1)
    },
      _isTwoSided,
      _mat)

    let screen4 = new Screen({
      position: Vector3.create(_pos.x, _pos.y + _height / 2, _pos.z - _radius / 2),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(_radius, _height, 1)
    },
      _isTwoSided,
      _mat)

    //add all sides of the column to the same screenGroup
    group.addScreen(screen1)
    group.addScreen(screen2)
    group.addScreen(screen3)
    group.addScreen(screen4)

    this.screens.push(screen1)
    this.screens.push(screen2)
    this.screens.push(screen3)
    this.screens.push(screen4)
  }
}