import { engine, executeTask, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { createCrown } from './crown'
import { createRotatingPlatform, Direction } from './rotatingPlatform'
import { triggers } from '@dcl-sdk/utils'
import { setupUi } from './ui'

// Initial function executed when scene is evaluated and after systems are created
export function main() {
  //create rotating systems

  // Stage 1 (Roundabouts)
  const roundaboutAShape = 'assets/scene/Models/roundaboutA.glb'

  // Stage 2 (Wheels)
  const wheelAShape = 'assets/scene/Models/wheelA.glb'

  // Adding base scene models
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'assets/scene/Models/baseLight.glb' })
  Transform.create(base, {
    scale: Vector3.create(2, 1, 2),
    position: Vector3.create(0, 0, 0)
  })

  const platform = engine.addEntity()
  GltfContainer.create(platform, { src: 'assets/scene/Models/staticPlatforms.glb' })
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
      model: 'assets/scene/Models/roundaboutB.glb',
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
      model: 'assets/scene/Models/bridgeA.glb',
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
      model: 'assets/scene/Models/wheelB.glb',
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
      model: 'assets/scene/Models/bridgeB.glb',
      transformArgs: { position: Vector3.create(21, 8.25, 2.5) },
      direction: Direction.X,
      duration: 4000
    },
    {
      model: 'assets/scene/Models/barrierA.glb',
      transformArgs: { position: Vector3.create(27, 9.7, 7.5) },
      direction: Direction.Y,
      duration: 2000
    },
    {
      model: 'assets/scene/Models/barrierB.glb',
      transformArgs: { position: Vector3.create(23.5, 10.7, 15) },
      direction: Direction.invY,
      duration: 2000
    },
    {
      model: 'assets/scene/Models/barrierC.glb',
      //FIXME why is this not bombinb syntax??, its not being passed the entity arg
      transformArgs: { position: Vector3.create(27, 11.7, 22.5) },
      direction: Direction.Y,
      duration: 2000
    }
  ]

  // Crown
  createCrown('assets/scene/Models/crown.glb', {
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

  // UI with GitHub link
  setupUi()
}
