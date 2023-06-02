import { engine, GltfContainer, PointerEvents, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { BeerType } from './definitions'
import { pickingGlassSystem } from './modules/beerGlass'
import { createBeerGlass, createTap } from './modules/factory'
import { tapPumpSystem } from './modules/tap'
export * from '@dcl/sdk'

function setup() {
  // Create tables
  const tables = engine.addEntity()
  Transform.create(tables, {
    position: Vector3.create(0, 0, 0)
  })
  GltfContainer.create(tables, { src: 'models/tables.glb' })
  PointerEvents.create(tables, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          showFeedback: false
        }
      }
    ]
  })

  // Create floor
  const floor = engine.addEntity()
  Transform.create(floor, {
    position: Vector3.create(0, 0, 0)
  })
  GltfContainer.create(floor, {
    src: 'models/baseDarkWithCollider.glb'
  })
  PointerEvents.create(floor, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          showFeedback: false
        }
      }
    ]
  })

  // Create dispenser
  const dispenserEntity = engine.addEntity()
  GltfContainer.create(dispenserEntity, {
    src: 'models/beerDispenser.glb'
  })
  Transform.create(dispenserEntity, {
    position: Vector3.create(8, 1.25, 7.5)
  })

  // Create taps
  createTap(BeerType.RED, dispenserEntity)
  createTap(BeerType.GREEN, dispenserEntity)
  createTap(BeerType.YELLOW, dispenserEntity)

  // Beer glasses
  const beerGlassModel = 'models/beerGlass.glb'
  createBeerGlass(beerGlassModel, Vector3.create(8.3, 1.25, 8))
  createBeerGlass(beerGlassModel, Vector3.create(7.8, 1.25, 8.3))
  createBeerGlass(beerGlassModel, Vector3.create(1.86, 0.8, 13.4))
  createBeerGlass(beerGlassModel, Vector3.create(2.3, 0.8, 14))
  createBeerGlass(beerGlassModel, Vector3.create(13.7, 0.8, 13.8))
  createBeerGlass(beerGlassModel, Vector3.create(13.9, 0.8, 14.3))
  createBeerGlass(beerGlassModel, Vector3.create(14.5, 0.8, 2.5))
  createBeerGlass(beerGlassModel, Vector3.create(13.7, 0.8, 1.9))
  createBeerGlass(beerGlassModel, Vector3.create(2.4, 0.8, 1.5))

  engine.addSystem(pickingGlassSystem)
  engine.addSystem(tapPumpSystem)
}

setup()
