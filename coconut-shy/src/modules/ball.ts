import {
  Animator,
  AvatarAnchorPointType,
  AvatarAttach,
  CameraMode,
  CameraModeArea,
  CameraType,
  ColliderLayer,
  Entity,
  GltfContainer,
  InputAction,
  PointerEvents,
  Transform,
  VisibilityComponent,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { playRandomHitSound, playthrowSound } from './sound'
import { Ball } from './components'
import CANNON from 'cannon'
import { areaEntity } from '..'

const THROW_STRENGTH_MULTIPLIER = 0.125

export function createBall(position: Vector3, cannonMaterial: CANNON.Material, cannonWorld: CANNON.World) {
  const ball = engine.addEntity()
  let body: CANNON.Body
  let world = cannonWorld
  let glowEntity = engine.addEntity()

  Ball.create(ball, {
    isActive: false,
    isThrown: true,
    glowEntity: glowEntity
  })

  Transform.create(ball, {
    position: position
  })
  GltfContainer.create(ball, {
    src: 'models/ball.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  // Setup glow

  GltfContainer.create(glowEntity, {
    src: 'models/ballGlow.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })
  Transform.create(glowEntity, {
    scale: Vector3.create(0, 0, 0),
    parent: ball
  })

  // Create physics body for ball
  body = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(
      Transform.get(ball).position.x,
      Transform.get(ball).position.y,
      Transform.get(ball).position.z
    ), // m
    shape: new CANNON.Sphere(0.12) // Create sphere shaped body with a diameter of 0.22m
  })

  toggleOnPointerDown(ball, body, true)

  // Add material and dampening to stop the ball rotating and moving continuously
  body.sleep()
  body.material = cannonMaterial
  body.linearDamping = 0.4
  body.angularDamping = 0.4
  world.addBody(body) // Add ball body to the world

  // Ball collision
  body.addEventListener('collide', () => {
    body.angularVelocity.setZero()
    playRandomHitSound()
  })

  Animator.create(ball, {
    states: [
      {
        clip: 'PickUp',
        playing: false,
        loop: false
      }
    ]
  })

  return { ball, body }
}

function playerPickup(ball: Entity, body: CANNON.Body): void {
  const ballComponent = Ball.getMutable(ball)
  Animator.playSingleAnimation(ball, 'PickUp')
  ballComponent.isActive = true
  body.sleep()
  ballComponent.isThrown = false
  body.position.set(
    Transform.get(engine.CameraEntity).position.x,
    Transform.get(engine.CameraEntity).position.y,
    Transform.get(engine.CameraEntity).position.z + 1
  )
  Transform.getMutable(ball).position = Vector3.create(
    Transform.get(engine.CameraEntity).position.x,
    Transform.get(engine.CameraEntity).position.y,
    Transform.get(engine.CameraEntity).position.z + 1
  )
  Transform.getMutable(ball).parent = engine.CameraEntity
  Transform.getMutable(ball).position = Vector3.create(0, -0.2, 0.5)
  playPickUpAnim(ball)
  toggleOnPointerDown(ball, body, false)
}

export function playerThrow(ball: Entity, body: CANNON.Body, throwDirection: Vector3, throwPower: number): void {
  CameraModeArea.deleteFrom(areaEntity)

  const ballComponent = Ball.getMutable(ball)
  playthrowSound()

  ballComponent.isActive = false
  ballComponent.isThrown = true
  Transform.getMutable(ball).parent = undefined

  // Physics
  body.wakeUp()
  body.velocity.setZero()
  body.angularVelocity.setZero()

  body.position.set(
    Transform.get(engine.CameraEntity).position.x + throwDirection.x,
    throwDirection.y + Transform.get(engine.CameraEntity).position.y,
    Transform.get(engine.CameraEntity).position.z + throwDirection.z
  )

  let throwPowerAdjusted = throwPower * THROW_STRENGTH_MULTIPLIER

  // Throw
  body.applyImpulse(
    new CANNON.Vec3(
      throwDirection.x * throwPowerAdjusted,
      throwDirection.y * throwPowerAdjusted,
      throwDirection.z * throwPowerAdjusted
    ),
    new CANNON.Vec3(body.position.x, body.position.y, body.position.z)
  )
}

function toggleOnPointerDown(ball: Entity, body: CANNON.Body, isOn: boolean): void {
  if (isOn) {
    // Create pointer Event
    pointerEventsSystem.onPointerDown(
      ball,
      (e) => {
        playerPickup(ball, body)
      },
      {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Pick up'
      }
    )
  } else {
    if (PointerEvents.get(ball).pointerEvents) pointerEventsSystem.removeOnPointerDown
  }
}

function playPickUpAnim(ball: Entity) {
  // Camera area modifier to match with picked ball visuals
  CameraModeArea.create(areaEntity, {
    area: Vector3.create(16, 4, 16),
    mode: CameraType.CT_FIRST_PERSON
  })
  VisibilityComponent.create(ball, { visible: true })
  Animator.stopAllAnimations(ball)
  Animator.playSingleAnimation(ball, 'PickUp')
}

export function setGlow(ball: Entity, isOn: boolean): void {
  const ballComponent = Ball.getMutable(ball)
  isOn
    ? (Transform.getMutable(ballComponent.glowEntity).scale = Vector3.create(1, 1, 1))
    : (Transform.getMutable(ballComponent.glowEntity).scale = Vector3.create(0, 0, 0))
}
