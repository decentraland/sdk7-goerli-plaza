import { AudioSource, engine, GltfContainer, Transform, VisibilityComponent } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Particle, particleSystem } from './particles'
import { createSound } from './sound'
import { triggerAreaSystem } from './utils/triggerArea'

// Power glows
const powerBlueGlowEntity = engine.addEntity()
GltfContainer.create(powerBlueGlowEntity, { src: 'models/powerBlueGlow.glb' })
Transform.create(powerBlueGlowEntity)

const powerRedGlowEntity = engine.addEntity()
GltfContainer.create(powerRedGlowEntity, { src: 'models/powerRedGlow.glb' })
Transform.create(powerRedGlowEntity)

// Forcefield
const forcefieldEntity = engine.addEntity()
GltfContainer.create(forcefieldEntity, { src: 'models/forcefield.glb' })
Transform.create(forcefieldEntity)

// let forcefieldParticles: ISystem

// Sounds
const powerUp = createSound('sounds/powerUp.mp3')
const powerDown = createSound('sounds/powerDown.mp3')

export function createPowerBase(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })

  function togglePower(isPowerOn: boolean) {
    if (isPowerOn) {
      Transform.getMutable(powerBlueGlowEntity).scale = Vector3.One()
      VisibilityComponent.createOrReplace(forcefieldEntity)

      try {
        engine.addSystem(particleSystem)
      } catch (err) {}
      AudioSource.getMutable(powerUp).playing = true
      VisibilityComponent.createOrReplace(forcefieldEntity, { visible: true })
      for (const [entity] of engine.getEntitiesWith(Particle)) {
        VisibilityComponent.deleteFrom(entity)
      }
    } else {
      // NOTE: particles have colliders so need to move them elsewhere
      for (const [entity] of engine.getEntitiesWith(Particle)) {
        VisibilityComponent.createOrReplace(entity, { visible: false })
      }

      // Hide the blue glow
      Transform.getMutable(powerBlueGlowEntity).scale = Vector3.Zero()

      VisibilityComponent.createOrReplace(forcefieldEntity, { visible: false })

      engine.removeSystem(particleSystem)
      AudioSource.getMutable(powerDown).playing = true
    }
  }

  triggerAreaSystem.setTriggerArea(entity, Vector3.create(4, 4, 4), Vector3.create(0, 0.75, 0))
  triggerAreaSystem.onPlayerEnter(entity, () => {
    togglePower(true)
  })

  triggerAreaSystem.onPlayerExit(entity, () => {
    togglePower(false)
  })
}

// Power base where the power cube sits
