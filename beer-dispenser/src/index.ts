import { CameraModeArea, CameraType, engine, GltfContainer, PointerEvents, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { BeerType } from './definitions'
import { pickingGlassSystem } from './modules/beerGlass'
import { createBeerGlass, createTap, SyncEntityIDs } from './modules/factory'
import { tapPumpSystem } from './modules/tap'
import { setupUi } from './ui'
import { syncEntity } from '@dcl/sdk/network'

export function main() {
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
  syncEntity(floor, [], SyncEntityIDs.TABLES)

  // camera modifiera area
  const cameraMod = engine.addEntity()

  Transform.create(cameraMod, { position: Vector3.create(8, 1, 8) })

  CameraModeArea.create(cameraMod, {
    area: Vector3.create(5, 2, 5),
    mode: CameraType.CT_FIRST_PERSON,
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
  createTap(BeerType.RED, dispenserEntity, SyncEntityIDs.RED)
  createTap(BeerType.GREEN, dispenserEntity, SyncEntityIDs.GREEN)
  createTap(BeerType.YELLOW, dispenserEntity, SyncEntityIDs.YELLOW)

  // Beer glasses
  const beerGlassModel = 'models/beerGlass.glb'
  createBeerGlass(beerGlassModel, Vector3.create(8.3, 1.25, 8), SyncEntityIDs.GLASS1)
  createBeerGlass(beerGlassModel, Vector3.create(7.8, 1.25, 8.3), SyncEntityIDs.GLASS2)
  createBeerGlass(beerGlassModel, Vector3.create(1.86, 0.8, 13.4), SyncEntityIDs.GLASS3)
  createBeerGlass(beerGlassModel, Vector3.create(2.3, 0.8, 14), SyncEntityIDs.GLASS4)
  createBeerGlass(beerGlassModel, Vector3.create(13.7, 0.8, 13.8), SyncEntityIDs.GLASS5)
  createBeerGlass(beerGlassModel, Vector3.create(13.9, 0.8, 14.3), SyncEntityIDs.GLASS6)
  createBeerGlass(beerGlassModel, Vector3.create(14.5, 0.8, 2.5), SyncEntityIDs.GLASS7)
  createBeerGlass(beerGlassModel, Vector3.create(13.7, 0.8, 1.9), SyncEntityIDs.GLASS8)
  createBeerGlass(beerGlassModel, Vector3.create(2.4, 0.8, 1.5), SyncEntityIDs.GLASS9)

  engine.addSystem(pickingGlassSystem)
  engine.addSystem(tapPumpSystem)

  // UI with GitHub link
  //setupUi()
}
