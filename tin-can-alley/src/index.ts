import {
  CameraModeArea,
  CameraType,
  Entity,
  GltfContainer,
  InputAction,
  PointerEventType,
  Transform,
  engine,
  executeTask,
  inputSystem,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { createCan, hit } from './modules/can'
// import { coconutShyMeshVertices, coconutShyMeshIndices } from "./modules/meshData/coconutShyMesh"
// import { wallMeshVertices, wallMeshIndices } from "./modules/meshData/wallMesh"
import { loadColliders } from './modules/colliderSetup'
import { Vector3 } from '@dcl/sdk/math'
import CANNON from 'cannon'
import { createRifle, playFireAnim } from './modules/rifle'
import { Cooldown } from './components'
import { playshotWoodSound } from './modules/sound'
import { onlyInSceneSystem } from './modules/onlyRenderInScene'
import { setupUi } from './ui'

export function main() {
  engine.addSystem(onlyInSceneSystem)

  // Create base
  const base = engine.addEntity()
  // Create base shape
  Transform.create(base)
  // Set the mesh
  GltfContainer.create(base, {
    src: 'models/baseLight.glb'
  })

  const tinCanAlley = engine.addEntity()
  Transform.create(tinCanAlley)
  GltfContainer.create(tinCanAlley, {
    src: 'models/tinCanAlley.glb'
  })

  const rifle = createRifle('models/rifle.glb', Vector3.create(0.075, -2, 2), Vector3.create(-5, 0, 0))

  // Setup our world
  const world = new CANNON.World()
  world.quatNormalizeSkip = 0
  world.quatNormalizeFast = false
  world.gravity.set(0, -16, 0) // m/s²

  loadColliders(world)

  // Setup ground material
  const physicsMaterial = new CANNON.Material('groundMaterial')
  const ballContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, {
    friction: 1,
    restitution: 0.5
  })
  world.addContactMaterial(ballContactMaterial)

  // Setup cans
  // Bottom row
  const can1 = createCan(Vector3.create(7.4, 1.42, 9.535), physicsMaterial, world)
  const can2 = createCan(Vector3.create(7.7, 1.42, 9.535), physicsMaterial, world)
  const can3 = createCan(Vector3.create(8, 1.42, 9.535), physicsMaterial, world)
  const can4 = createCan(Vector3.create(8.3, 1.42, 9.535), physicsMaterial, world)
  const can5 = createCan(Vector3.create(8.6, 1.42, 9.535), physicsMaterial, world)

  // 2nd row
  const can6 = createCan(Vector3.create(7.55, 1.706, 9.535), physicsMaterial, world)
  const can7 = createCan(Vector3.create(7.85, 1.706, 9.535), physicsMaterial, world)
  const can8 = createCan(Vector3.create(8.15, 1.706, 9.535), physicsMaterial, world)
  const can9 = createCan(Vector3.create(8.45, 1.706, 9.535), physicsMaterial, world)

  // 3rd row
  const can10 = createCan(Vector3.create(7.7, 1.992, 9.535), physicsMaterial, world)
  const can11 = createCan(Vector3.create(8, 1.992, 9.535), physicsMaterial, world)
  const can12 = createCan(Vector3.create(8.3, 1.992, 9.535), physicsMaterial, world)

  // 4th row
  const can13 = createCan(Vector3.create(7.85, 2.278, 9.535), physicsMaterial, world)
  const can14 = createCan(Vector3.create(8.15, 2.278, 9.535), physicsMaterial, world)

  // Top can
  const can15 = createCan(Vector3.create(8, 2.564, 9.535), physicsMaterial, world)

  const cans: any[] = [can1, can2, can3, can4, can5, can6, can7, can8, can9, can10, can11, can12, can13, can14, can15]

  // Create a ground plane and apply physics material
  const groundShape: CANNON.Plane = new CANNON.Plane()
  const groundBody: CANNON.Body = new CANNON.Body({ mass: 0 })
  groundBody.addShape(groundShape)
  groundBody.material = physicsMaterial
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
  groundBody.position.set(0, 0.05, 0)
  world.addBody(groundBody) // Add ground body to world

  // Set high to prevent tunnelling
  const FIXED_TIME_STEPS = 1.0 / 60
  const MAX_TIME_STEPS = 10

  function physicsSystem(dt: number) {
    world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)
    for (let i = 0; i < cans.length; i++) {
      Transform.getMutable(cans[i].can).position = cans[i].body.position
      Transform.getMutable(cans[i].can).rotation = cans[i].body.quaternion
    }
  }

  engine.addSystem(physicsSystem)

  // Controls
  function shootSystem() {
    const result = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    if (result) {
      console.log('CD: ', Cooldown.get(rifle.rifle).on)
      if (Cooldown.get(rifle.rifle).on) return
      playFireAnim(rifle.rifle)
      if (result.hit !== undefined) {
        const targetPos = result.hit.position as Vector3
        for (let i = 0; i < cans.length - 1; i++) {
          if (cans[i].can === result.hit?.entityId) {
            let forwardVector: Vector3 = Vector3.rotate(
              Vector3.create(10, 0, 0),
              Transform.get(engine.CameraEntity).rotation
            )
            hit(cans[i].body, forwardVector, targetPos)
          } else {
            playshotWoodSound()
          }
        }
      }
    }
  }

  engine.addSystem(shootSystem)

  // Camera area modifier to match with rifle visuals
  const areaEntity = engine.addEntity()
  Transform.create(areaEntity, {
    position: Vector3.create(8, 0, 8)
  })
  CameraModeArea.create(areaEntity, {
    area: Vector3.create(16, 4, 16),
    mode: CameraType.CT_FIRST_PERSON
  })

  setupUi()
}
