import { tinCanAlleyMeshVertices, tinCanAlleyMeshIndices } from './meshData/tinCanAlleyMesh'
import CANNON from 'cannon'

export function loadColliders(cannonWorld: CANNON.World): void {
  // Trimesh for the tin can alley model
  let tinCanAlleyShape = new CANNON.Trimesh(tinCanAlleyMeshVertices, tinCanAlleyMeshIndices)
  const tinCanAlleyBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(16, 0, 0)
  })
  tinCanAlleyBody.addShape(tinCanAlleyShape)
  cannonWorld.addBody(tinCanAlleyBody)

  // Invisible walls
  //#region
  const wallShape = new CANNON.Box(new CANNON.Vec3(8, 32, 0.5))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(8, 0, 16.45)
  })
  cannonWorld.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(8, 0, -0.45)
  })
  cannonWorld.addBody(wallSouth)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(-0.45, 0, 8)
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  cannonWorld.addBody(wallWest)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16.45, 0, 8)
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  cannonWorld.addBody(wallEast)
  //#endregion

  // Box colliders for the stand
  //#region
  const playerStand = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1, 0.638, 0.061)),
    position: new CANNON.Vec3(8, 0.689, 6.75)
  })
  cannonWorld.addBody(playerStand)

  const playerStandLip = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1, 0.045, 0.0265)),
    position: new CANNON.Vec3(8, 1.372, 6.835)
  })
  cannonWorld.addBody(playerStandLip)

  const mainStandBack = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1.534, 1.5, 0.056)),
    position: new CANNON.Vec3(8, 2.212, 10)
  })
  cannonWorld.addBody(mainStandBack)

  const mainStandShelf = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1.211, 0.0265, 0.1165)),
    position: new CANNON.Vec3(8, 1.245, 9.535)
  })
  cannonWorld.addBody(mainStandShelf)

  const mainStandShelfBase1 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.0655, 0.323, 0.0225)),
    position: new CANNON.Vec3(6.887, 1.094, 9.921)
  })
  cannonWorld.addBody(mainStandShelfBase1)

  const mainStandShelfBase2 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.0655, 0.323, 0.0225)),
    position: new CANNON.Vec3(9.107, 1.094, 9.921)
  })
  cannonWorld.addBody(mainStandShelfBase2)

  const mainStandShelfArm1 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.039, 0.0255, 0.25)),
    position: new CANNON.Vec3(6.887, 1.195, 9.648)
  })
  cannonWorld.addBody(mainStandShelfArm1)

  const mainStandShelfArm2 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.039, 0.0255, 0.25)),
    position: new CANNON.Vec3(9.107, 1.195, 9.648)
  })
  cannonWorld.addBody(mainStandShelfArm2)

  const mainStandFoot1 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.1135, 0.056, 0.751)),
    position: new CANNON.Vec3(7, 0.106, 10.006)
  })
  cannonWorld.addBody(mainStandFoot1)

  const mainStandFoot2 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.1135, 0.056, 0.751)),
    position: new CANNON.Vec3(9, 0.106, 10.006)
  })
  cannonWorld.addBody(mainStandFoot2)

  const mainStandLeg1 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.1095, 0.274, 0.138)),
    position: new CANNON.Vec3(7, 0.437, 10)
  })
  cannonWorld.addBody(mainStandLeg1)

  const mainStandLeg2 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.1095, 0.274, 0.138)),
    position: new CANNON.Vec3(9, 0.437, 10)
  })
  cannonWorld.addBody(mainStandLeg2)
  //#endregion
}
