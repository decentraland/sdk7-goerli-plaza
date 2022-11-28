import {
  InputAction,
  pointerEventsSystem,
  engine,
  Transform,
  Entity,
  MeshRenderer,
  MeshCollider,
  Material,
  Schemas,
} from "@dcl/ecs"
import { Quaternion, Vector3, Color3 } from "@dcl/ecs-math"
import { getUserData } from "~system/UserIdentity"
import { transformComponent } from "./system"
export * from "@dcl/sdk"


getUserData({})
  .then((value) => console.log(value))
  .catch((error) => console.log(error))

const DoorComponent = engine.defineComponent(
  {
    open: Schemas.Boolean,
  },
  888
)

const openPos: Quaternion = Quaternion.create(0, 1, 0)
const closedPos: Quaternion = Quaternion.create(0, 0, 0)

function createWall(position: Vector3, scale: Vector3, parent?: Entity) {
  const WallEntity = engine.addEntity()
  Transform.create(WallEntity, {
    position,
    scale,
    parent,
  })
  MeshRenderer.create(WallEntity, { mesh: { $case: "box", box: { uvs: [] } } })
  MeshCollider.create(WallEntity, { mesh: { $case: "box", box: {} } })
  return WallEntity
}
createWall(Vector3.create(5.75, 1, 3), Vector3.create(1.5, 2, 0.05))
createWall(Vector3.create(3.25, 1, 3), Vector3.create(1.5, 2, 0.05))

const doorPivotEntity = engine.addEntity()
Transform.create(doorPivotEntity, { position: Vector3.create(4, 1, 3), rotation: closedPos })

const doorEntity = createWall(Vector3.create(0.5, 0, 0), Vector3.create(1, 2, 0.05), doorPivotEntity)
DoorComponent.create(doorEntity, { open: false })
Material.create(doorEntity, {
  material: {
    $case: "pbr",
    pbr: {
      albedoColor: Color3.Red(),
      metallic: 0.9,
      roughness: 0.1,
    },
  },
})

pointerEventsSystem.onPointerDown(
  doorEntity,
  () => {
    const door = DoorComponent.getMutable(doorEntity)
    const nextPosition = door.open ? closedPos : openPos
    door.open = !door.open
    transformComponent(doorPivotEntity, { rotation: nextPosition }, 0.5)
  },
  { button: InputAction.IA_POINTER }
)
