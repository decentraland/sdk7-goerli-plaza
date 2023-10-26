import * as CANNON from 'cannon/build/cannon'

export function loadColliders(world: CANNON.World): void {
  // Invisible walls
  const wallShape = new CANNON.Box(new CANNON.Vec3(16, 32, 1))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16, 0, 32)
  })
  world.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16, 0, 0)
  })
  world.addBody(wallSouth)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(0, 0, 16)
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  world.addBody(wallWest)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(32, 0, 16)
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  world.addBody(wallEast)
}
