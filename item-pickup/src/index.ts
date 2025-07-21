import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { instantiatePickableItem, respawnSystem } from './modules/item'

export function main() {
  // Instantiate ground model
  GltfContainer.create(engine.addEntity(), {
    src: 'assets/scene/Models/baseLight.glb'
  })

  // Instantiate items bases
  const redBaseEntity = engine.addEntity()
  GltfContainer.create(redBaseEntity, {
    src: 'assets/scene/Models/spawnBaseRed.glb'
  })
  Transform.create(redBaseEntity, {
    position: Vector3.create(4, 0, 6)
  })

  const greenBaseEntity = engine.addEntity()
  GltfContainer.create(greenBaseEntity, {
    src: 'assets/scene/Models/spawnBaseGreen.glb'
  })
  Transform.create(greenBaseEntity, {
    position: Vector3.create(8, 0, 10)
  })

  const blueBaseEntity = engine.addEntity()
  GltfContainer.create(blueBaseEntity, {
    src: 'assets/scene/Models/spawnBaseBlue.glb'
  })
  Transform.create(blueBaseEntity, {
    position: Vector3.create(12, 0, 6)
  })

  // callback functions to run each time an item is picked
  const medkitAction = () => {
    console.log('PICKED UP MEDKIT')
  }

  const armorAction = () => {
    console.log('PICKED UP ARMOR')
  }

  const ammoAction = () => {
    console.log('PICKED UP AMMO')
  }

  // instantiate pickable items
  instantiatePickableItem('assets/scene/Models/medikit.glb', Vector3.create(4, 0.75, 6), 'sounds/medikitPickup.mp3', 3, medkitAction)

  instantiatePickableItem('assets/scene/Models/armor.glb', Vector3.create(12, 0.75, 6), 'sounds/armorPickup.mp3', 5, armorAction)

  instantiatePickableItem('assets/scene/Models/ammo.glb', Vector3.create(8, 0.75, 10), 'sounds/ammoPickup.mp3', 8, ammoAction)

  engine.addSystem(respawnSystem)
}
