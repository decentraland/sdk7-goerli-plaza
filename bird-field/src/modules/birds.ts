
// Params

import { engine, GltfContainer, Raycast, RaycastQueryType, RaycastResult, Transform } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { DistanceBirdComopnent } from "./components"
import { realDistance } from "./utilities"


//// FIXED PARAMS


//set the center of the bird scattering area to the center of the scene
const CENTER = Vector3.create(24, 10, 24)

const SIDE_LENGTH: number = 20 // size of the area to spawn birds in
const ROWS: number = 10
const COLS: number = 10
const SPACING: number = SIDE_LENGTH / ROWS

//set the starting positions of the bird spawn grid to the south-west corner of the spawn area
const BASE = Vector3.create(CENTER.x - SIDE_LENGTH / 2, CENTER.y, CENTER.z - SIDE_LENGTH / 2)

const RADIUS: number = 8 // how close you can get to a bird before it reacts
const AMPLITUDE: number = 1



export function spawnBirds() {

  // TODO: find a way for rays to only be read once?
  let lastTimestamp: number = -1

  engine.addSystem(() => {
    for (const [entity, result] of engine.getEntitiesWith(RaycastResult)) {

      if (result.timestamp! > lastTimestamp && result.hits[0]) {

        console.log("GOT A RAYCAST HIT", result)
        lastTimestamp = result.timestamp!
        //if we hit the collider set the generated bird position's Y coord to the hitpoint's height
        const newPos = result.hits[0].position

        //spawn a bird at the generated and terrain adapted position
        Transform.create(entity, {
          position: newPos,
          rotation: Quaternion.fromEulerDegrees(0, Math.random() * 360, 0)
        })
        GltfContainer.create(entity, {
          src: "models/bird.glb"
        })
        DistanceBirdComopnent.create(entity, { elapsed: Math.random(), flying: false, originalPos: newPos })

      }
    }
  }
  )


  // TODO add delay before sending rays
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {

      //generate positions iterating through all rows and columns  and add large random offsets along X an Z (Y will adapt to the terrain later)
      const newPos = Vector3.create(
        BASE.x + i * SPACING + Math.random() * 20 - 10,
        BASE.y,
        BASE.z + j * SPACING + Math.random() * 20 - 10
      )

      const birdEntity = engine.addEntity()
      Transform.getMutable(birdEntity).position = newPos
      // create a ray at the X,Z coord of the generated position which starts high up and has a downward direction
      // cast the ray downward and try to intersect it with the terrain's collider
      Raycast.createOrReplace(birdEntity, {
        direction: {
          $case: 'globalDirection',
          globalDirection: Vector3.Down()
        },
				maxDistance: 22,
        queryType: RaycastQueryType.RQT_HIT_FIRST
      })
    }
  }
  engine.addSystem(proximitySystem)
}



// System that checks distances to each bird
export function proximitySystem(dt: number) {

  for (const [entity, birdInfo] of engine.getEntitiesWith(DistanceBirdComopnent)) {

    const playerTransform = Transform.getOrNull(engine.PlayerEntity)
    if (!playerTransform) { return }

    const playerPos = playerTransform.position

    // calculate the distance between the player and the birds original position
    let dist = realDistance(birdInfo.originalPos, playerPos)

    // if the player is within a certain distance from the birds original perching position
    if (dist < RADIUS) {

      const mutableBirdInfo = DistanceBirdComopnent.getMutable(entity)
      const mutableTransform = Transform.getMutable(entity)

      // calculate a ratio (0-1) based on how close the player is to the bird and multiply it with a constant to amplify the effect
      let multiplier = (1 - dist / RADIUS) * AMPLITUDE

      // calculate the direction pointing from the player to the bird's default position
      let playerDir = Vector3.subtract(birdInfo.originalPos, playerPos)

      // if the bird was idle, change it to flying and replace the GLTF model with the flying one
      if (!birdInfo.flying) {
        mutableBirdInfo.flying = true
        GltfContainer.createOrReplace(entity,
          { src: 'models/bird_fly.glb' }
        )
      }

      // move the bird away from the player on the X and Z axis based on the closeness multiplier
      mutableTransform.position = Vector3.add(birdInfo.originalPos, Vector3.multiplyByFloats(playerDir, multiplier, 0, multiplier))

      // always move the bird upwards on the Y axis (never downwards) regardless of player direction
      mutableTransform.position.y = birdInfo.originalPos.y + 6 * multiplier

      // increment the timer stored for each bird and use the sine of this time to wiggle the bird around the actual position calculated above
      mutableBirdInfo.elapsed += dt
      mutableTransform.position.x += Math.sin(birdInfo.elapsed * 10) * multiplier
      mutableTransform.position.y += Math.sin(birdInfo.elapsed * 8) * multiplier
      mutableTransform.position.z += Math.sin(birdInfo.elapsed * 11) * multiplier

      // make the flying bird always face the player
      mutableTransform.rotation = Quaternion.fromLookAt(mutableTransform.position, playerPos)
    }  // in case the player is farther from the bird than the given radius
    // make the flying bird change GLTF shape to the idle one
    else if (birdInfo.flying) {

      const mutableBirdInfo = DistanceBirdComopnent.getMutable(entity)
      const mutableTransform = Transform.getMutable(entity)

      mutableBirdInfo.flying = false
      GltfContainer.createOrReplace(entity,
        { src: 'models/bird.glb' }
      )

      //make the bird land on its original position
      mutableTransform.position = birdInfo.originalPos

    }
  }
}