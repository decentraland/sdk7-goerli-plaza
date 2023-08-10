import { coconutShyMeshVertices, coconutShyMeshIndices } from "./meshData/coconutShyMesh"
import CANNON from "cannon"

export function loadColliders(cannonWorld: CANNON.World): void {
  // Coconut shy trimesh
  let coconutShyShape = new CANNON.Trimesh(coconutShyMeshVertices, coconutShyMeshIndices)
  const coconutShyBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(16, 0, 0),
  })
  coconutShyBody.addShape(coconutShyShape)
  cannonWorld.addBody(coconutShyBody)

  // Invisible walls
  //#region
  const wallShape = new CANNON.Box(new CANNON.Vec3(8, 32, 0.5))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(8, 0, 16.45),
  })
  cannonWorld.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(8, 0, -0.45),
  })
  cannonWorld.addBody(wallSouth)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(-0.45, 0, 8),
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  cannonWorld.addBody(wallWest)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16.45, 0, 8),
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  cannonWorld.addBody(wallEast)
  //#endregion
}
