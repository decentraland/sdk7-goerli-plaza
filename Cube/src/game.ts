
function createCube(x: number, y: number, z: number, spawner = false): Entity {
  const meshEntity = engine.addEntity()

  Transform.create(meshEntity, {
    position: { x, y, z }
  })

  MeshRenderer.create(meshEntity, { box: { uvs: [] } })
  MeshCollider.create(meshEntity, { box: {} })

  if (spawner) {
    PointerEvents.create(meshEntity, {
		pointerEvents: [
			{
			  eventType: PointerEventType.PET_DOWN,
			  eventInfo: {
				button: InputAction.IA_PRIMARY,
				hoverText: 'Press E to spawn',
				maxDistance: 100,
				showFeedback: true
			  }
			}
		  ]
    })
  }

  return meshEntity
}

function circularSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MeshRenderer, Transform)) {
    const transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.angleAxis(dt * 10, Vector3.Up()))
  }
}


function spawnerSystem() {
  for (const [entity] of engine.getEntitiesWith(PointerEvents)) {
    if (wasEntityClicked(entity, InputAction.IA_PRIMARY)) {
      createCube(
        1 + Math.random() * 8,
        Math.random() * 8,
        1 + Math.random() * 8,
        false
      )
    }
  }

  if (wasEntityClicked(engine.RootEntity, InputAction.IA_SECONDARY)) {
	const cubeTransform = Transform.getMutable(cube)
	cubeTransform.scale.y += 0.3
  }
}

const cube = createCube(8, 1, 8, true)
engine.addSystem(circularSystem)
engine.addSystem(spawnerSystem)

