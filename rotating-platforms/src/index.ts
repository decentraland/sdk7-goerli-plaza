import { engine, executeTask, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { createCrown } from './crown'
import { createRotatingPlatform, Direction } from './rotatingPlatform'
import { triggers } from '@dcl-sdk/utils'

// enable debug mode by default in preview mode
executeTask(async () => {
  try {
    const { getRealm } = await import('~system/Runtime')
    const realm = await getRealm({})
    if (realm.realmInfo?.isPreview) {
      //triggers.enableDebugDraw(true)
    }
  } catch (err) {
    console.error(err)
  }
})

// Initial function executed when scene is evaluated and after systems are created
export function main() {
  // Create my main cube and color it.
  //create rotating systems

  // Stage 1 (Roundabouts)
  const roundaboutAShape = 'models/roundaboutA.glb'

  // Stage 2 (Wheels)
  const wheelAShape = 'models/wheelA.glb'

  // Adding base scene models
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'models/baseLight.glb' })
  Transform.create(base, {
    scale: Vector3.create(2, 1, 2),
    position: Vector3.create(0, 0, 0)
  })

  const platform = engine.addEntity()
  GltfContainer.create(platform, { src: 'models/staticPlatforms.glb' })
  Transform.create(platform, {
    position: Vector3.create(0, 0, 0)
  })

  // Contains the positions for each coin
  const platforms = [
    {
      model: roundaboutAShape,
      transformArgs: { position: Vector3.create(5.5, 3, 9.75) },
      direction: Direction.Y,
      duration: 1500
    },
    {
      model: 'models/roundaboutB.glb',
      transformArgs: { position: Vector3.create(5.5, 3, 17.25) },
      direction: Direction.invY,
      duration: 1500
    },
    {
      model: roundaboutAShape,
      transformArgs: { position: Vector3.create(5.5, 3, 24.75) },
      direction: Direction.Y,
      duration: 1500
    },
    {
      model: 'models/bridgeA.glb',
      transformArgs: { position: Vector3.create(10.5, 6.5, 29.5) },
      direction: Direction.invZ,
      duration: 4000
    },

    {
      model: wheelAShape,
      transformArgs: { position: Vector3.create(15.5, 5.5, 24.325) },
      direction: Direction.Z,
      duration: 8000
    },
    {
      model: 'models/wheelB.glb',
      transformArgs: { position: Vector3.create(15.5, 5.5, 16.325) },
      direction: Direction.invZ,
      duration: 8000
    },

    {
      model: wheelAShape,
      transformArgs: { position: Vector3.create(15.5, 5.5, 7.825) },
      direction: Direction.Z,
      duration: 8000
    },

    // Stage 3 (Barriers)
    {
      model: 'models/bridgeB.glb',
      transformArgs: { position: Vector3.create(21, 8.25, 2.5) },
      direction: Direction.X,
      duration: 4000
    },
    {
      model: 'models/barrierA.glb',
      transformArgs: { position: Vector3.create(27, 9.7, 7.5) },
      direction: Direction.Y,
      duration: 2000
    },
    {
      model: 'models/barrierB.glb',
      transformArgs: { position: Vector3.create(23.5, 10.7, 15) },
      direction: Direction.invY,
      duration: 2000
    },
    {
      model: 'models/barrierC.glb',
      //FIXME why is this not bombinb syntax??, its not being passed the entity arg
      transformArgs: { position: Vector3.create(27, 11.7, 22.5) },
      direction: Direction.Y,
      duration: 2000
    }
  ]

  // Crown
  createCrown('models/crown.glb', {
    //NOTE: for tesing moving crown to ground
    position: Vector3.create(27, 13.75, 28.5),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // Setup the coins
  for (const platform of platforms) {
    //const platform = platforms[p]
    createRotatingPlatform(platform.model, platform.transformArgs, platform.direction, platform.duration)
  }
}
