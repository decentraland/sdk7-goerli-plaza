import { spawnEnemy } from '../enemy'
import { engine, AudioSource, Transform } from '@dcl/sdk/ecs'
import { ShipShapes, SpawnerComponent, SpawnerShape } from '../components/customComponents'

// General config
const BASE_SPAWN_TIME = 4
const MAX_TIME_OFFSET = 6
const POSITION_Z = 30

const spaceships = {
  redSpaceship: 'assets/scene/Models/redSpaceship.glb',
  greenSpaceship: 'assets/scene/Models/greenSpaceship.glb',
  blueSpaceship: 'assets/scene/Models/blueSpaceship.glb'
}

// Randomise the spawn time
function getRandomSpawnTime(): number {
  return BASE_SPAWN_TIME + Math.random() * MAX_TIME_OFFSET
}

export function enemySpawnSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(SpawnerComponent)) {
    const spawner = SpawnerComponent.getMutable(entity)

    spawner.timeToNextSpawn -= dt

    if (spawner.timeToNextSpawn < 0) {
      spawner.timeToNextSpawn = getRandomSpawnTime()

      const spawnerTransform = Transform.get(entity)

      var x: number
      var y: number
      var shape: ShipShapes
      switch (spawner.spawnerShape) {
        case SpawnerShape.SQUARE:
          x = spawnerTransform.position.x - spawner.size / 2 + Math.random() * spawner.size
          y = spawnerTransform.position.y - spawner.size / 2 + Math.random() * spawner.size
          shape = ShipShapes.BLUE
          break
        case SpawnerShape.CIRCLE:
          const randomRadius = (spawner.size / 2) * Math.sqrt(Math.random())
          const angle = Math.random() * 2 * Math.PI
          x = spawnerTransform.position.x + randomRadius * Math.cos(angle)
          y = spawnerTransform.position.y + randomRadius * Math.sin(angle)
          shape = ShipShapes.RED
          break
        case SpawnerShape.TRIANGLE:
          const r1 = Math.random()
          const r2 = Math.random()
          const sqrtR1 = Math.sqrt(r1)
          const pointA = [3.114, -3.106]
          const pointB = [0, 2.289]
          const pointC = [-3.114, -3.106]
          x =
            spawnerTransform.position.x +
            (1 - sqrtR1) * pointA[0] +
            sqrtR1 * (1 - r2) * pointB[0] +
            sqrtR1 * r2 * pointC[0]
          y =
            spawnerTransform.position.y +
            (1 - sqrtR1) * pointA[1] +
            sqrtR1 * (1 - r2) * pointB[1] +
            sqrtR1 * r2 * pointC[1]

          shape = ShipShapes.GREEN
          break
      }

      spawnEnemy(shape, x, y, POSITION_Z)
    }
  }
}
