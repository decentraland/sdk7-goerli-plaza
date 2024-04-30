import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import {
  BallFlag,
  CollisionFlag,
  PaddleFlag,
  WallFlag,
  BrickFlag,
  LastHitFlag
} from '../components/definitions'
import { playSound } from '../gameObjects/sound'
import { Sounds } from './sharedConstants'

// 2D collision detection
export function CollisionDetection(dt: number) {
  for (const [ballEntity, ballFlag, transform] of engine.getEntitiesWith(
    BallFlag,
    Transform
  )) {
    const ballPos = transform.position
    const ballSize = transform.scale
    const ballPosX = ballPos.x - ballSize.x / 2
    const ballPosZ = ballPos.z + ballSize.z / 2
    for (const [hitEntity, _collisionFlag, transform] of engine.getEntitiesWith(
      CollisionFlag,
      Transform
    )) {
      const brickPos = transform.position
      const brickSize = transform.scale
      const brickPosX = brickPos.x - brickSize.x / 2
      const brickPosZ = brickPos.z + brickSize.z / 2
      let collisionNorm: Vector3

      if (
        ballPosX + ballSize.x >= brickPosX &&
        ballPosX <= brickPosX + brickSize.x &&
        ballPosZ - ballSize.z <= brickPosZ &&
        ballPosZ >= brickPosZ - brickSize.z &&
        ballFlag.collider === true
      ) {
        playSound(Sounds.S_HIT)

        /**
         * Here we remove the component to the paddle.
         * This component avoids the double hit on the paddle
         * (cause of an erroneous normal calculation and a rare rebound).
         */

        for (const [lastHitEntity] of engine.getEntitiesWith(LastHitFlag)) {
          LastHitFlag.deleteFrom(lastHitEntity)
          CollisionFlag.createOrReplace(lastHitEntity)
        }

        const isBrick = BrickFlag.getOrNull(hitEntity) !== null
        const isWall = WallFlag.getOrNull(hitEntity) !== null
        const isPaddle = PaddleFlag.getOrNull(hitEntity) !== null
        const mutableBallFlag = BallFlag.getMutable(ballEntity)

        // If is wall, use wall's normal (defined when the wall is created)
        if (isWall) {
          collisionNorm = WallFlag.get(hitEntity).normal

          mutableBallFlag.direction = reflectVector(
            collisionNorm,
            isPaddle,
            isWall,
            isBrick
          )
          // If is brick or paddle calculate collisionNormal
        } else if (isPaddle || isBrick) {
          collisionNorm = collisionNormal(ballEntity, hitEntity)
          mutableBallFlag.direction = reflectVector(
            collisionNorm,
            isPaddle,
            isWall,
            isBrick
          )
          // Then, if is brick, remove it
          if (isBrick && !isPaddle) {
            engine.removeEntity(hitEntity)
            // Then, if is paddle, remove its collision flag to avoid double hit
          } else if (isPaddle && !isBrick) {
            CollisionFlag.deleteFrom(hitEntity)
            LastHitFlag.createOrReplace(hitEntity)
          }
        } else if (
          (isWall && isPaddle) ||
          (isWall && isBrick) ||
          (isBrick && isPaddle)
        ) {
          console.error(
            'The hit entity must have a single type (paddle, brick or wall). '
          )
        }
        break
      }
    }
  }
}

/**
 * Calculate reflected vector.
 *
 * @param normal - normal to the impact surface to calculate the reflected direction
 * @param isPaddle - Boolean input defines if the hit entity is a paddle
 * @param isWall - Boolean input defines if the hit entity is a wall
 * @param isBrick - Boolean input defines if the hit entity is a brick
 *
 * @returns The normalized reflected vector to define ball's new direction.
 */
function reflectVector(
  normal: Vector3,
  isPaddle: boolean,
  isWall: boolean,
  isBrick: boolean
): Vector3 {
  let incident: Vector3 = Vector3.Zero()
  for (const [_ballEntity, ballFlag] of engine.getEntitiesWith(BallFlag)) {
    incident = ballFlag.direction
  }
  const dot = 2 * Vector3.dot(incident, normal)
  const reflected = Vector3.subtract(
    incident,
    Vector3.multiplyByFloats(normal, dot, dot, dot)
  )

  // HACKS: Collision issues
  if (isWall || isBrick) {
    if (normal.x == 1 && reflected.x < 0) reflected.x *= -1
    if (normal.x == -1 && reflected.x > 0) reflected.x *= -1
    if (normal.z == 1 && reflected.z < 0) reflected.z *= -1
    if (normal.z == -1 && reflected.z > 0) reflected.z *= -1
  }
  if (isPaddle && reflected.z <= 0) reflected.z *= -1

  // Remove shallow angles to prevent stale gameplay
  if (reflected.z >= 0 && reflected.z <= 0.25) reflected.z = 0.35
  if (reflected.z <= 0 && reflected.z >= -0.25) reflected.z = -0.35

  return Vector3.normalize(reflected)
}

/**
 * Calculate surface normal to use it for reflected vector calculation.
 *
 * @param ballEntity - The first input is the ball entity
 * @param hitEntity - The second input is the hit entity

 *
 * @returns hit surface normal.
 */

function collisionNormal(ballEntity: Entity, hitEntity: Entity): Vector3 {
  const ballPosition: Vector3 = Transform.get(ballEntity).position
  const hitEntityPosition: Vector3 = Transform.get(hitEntity).position
  const ballDirection: Vector3 = BallFlag.get(ballEntity).direction
  const hitEntityWidth = Transform.get(hitEntity).scale.x
  const hitEntityHeight = Transform.get(hitEntity).scale.z
  const delta: Vector3 = Vector3.subtract(ballPosition, hitEntityPosition)
  let normal: Vector3 = Vector3.create(0, 0, 0)

  // Paddle change normal depend of wich of its sectors is collided
  if (PaddleFlag.getOrNull(hitEntity) !== null) {
    normal = normal = Vector3.create(0, 0, 1)
    // Paddle normal logic
    if (delta.x < -hitEntityWidth / 2 / 2 && ballDirection.x >= 0) {
      normal = Vector3.add(normal, Vector3.Left())
    }
    if (delta.x > hitEntityWidth / 2 / 2 && ballDirection.x <= 0) {
      normal = Vector3.add(normal, Vector3.Right())
    }

    // If the ball hits a birck
  } else if (BrickFlag.getOrNull(hitEntity) !== null) {
    const brickCenter: Vector3 = Transform.get(hitEntity).position
    const ballCenter: Vector3 = Transform.get(ballEntity).position
    const distance: Vector3 = Vector3.subtract(ballCenter, brickCenter)
    const distanceX = Math.abs(distance.x)
    const distanceZ = Math.abs(distance.z)
    const aspectRatio = hitEntityWidth / hitEntityHeight
    if (distanceX / aspectRatio > distanceZ) {
      if (ballDirection.x > 0) {
        normal = Vector3.create(-1, 0, 0)
      } else {
        normal = Vector3.create(1, 0, 0)
      }
    } else {
      if (ballDirection.z > 0) {
        normal = Vector3.create(0, 0, -1)
      } else {
        normal = Vector3.create(0, 0, 1)
      }
    }
  }

  return Vector3.normalize(normal)
}
