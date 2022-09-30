function createCube(x: number, y: number, z: number, spawner = false): Entity {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: { x, y, z }
  })

  BoxShape.create(entity)


  if (spawner) {
    OnPointerDown.create(entity, {
      button: ActionButton.PRIMARY,
      hoverText: 'Press E to spawn'
    })
  }

  return entity
}

function circularSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(BoxShape, Transform)) {
    const transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.angleAxis(dt * 10, Vector3.Up()))
  }
}


function spawnerSystem() {
  const clickedCubes = engine.getEntitiesWith(BoxShape, OnPointerDownResult)
  for (const [] of clickedCubes) {
    createCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  }
}

const cube = createCube(8, 1, 8, true)
engine.addSystem(circularSystem)
engine.addSystem(spawnerSystem)


import { getUserData } from "@decentraland/Identity"

async () => {
  let data = await getUserData()
  log(data.userId)

  AvatarAttach.create(cube, {
	anchorPointId: AvatarAnchorPoint.LEFT_HAND,
	avatarId: data.userId
})
}


