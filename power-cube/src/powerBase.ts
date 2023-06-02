import {
  AudioSource,
  engine,
  GltfContainer,
  PointerEvents,
  PointerEventType,
  Transform,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Particle, particleSystem } from './particles'
import { createSound } from './sound'
import * as utils from '@dcl-sdk/utils'

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

// Sounds
const powerUp = createSound('sounds/powerUp.mp3')
const powerDown = createSound('sounds/powerDown.mp3')

export function createPowerBase(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })
  PointerEvents.create(entity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          showFeedback: false
        }
      }
    ]
  })

  function togglePower(isPowerOn: boolean) {
    if (isPowerOn) {
      // TODO: change this workaround until the DisableComponent is available
      Transform.getMutable(powerBlueGlowEntity).scale = Vector3.One()
      Transform.getMutable(forcefieldEntity).scale = Vector3.One()

      try {
        engine.addSystem(particleSystem)
      } catch (err) {}
      AudioSource.getMutable(powerUp).playing = true

      for (const [entity] of engine.getEntitiesWith(Particle)) {
        VisibilityComponent.deleteFrom(entity)
      }
    } else {
      // NOTE: particles have colliders so need to move them elsewhere
      for (const [entity] of engine.getEntitiesWith(Particle)) {
        VisibilityComponent.createOrReplace(entity, { visible: false })
      }

      // TODO: change this workaround until the DisableComponent is available
      // Hide the blue glow
      Transform.getMutable(powerBlueGlowEntity).scale = Vector3.Zero()
      Transform.getMutable(forcefieldEntity).scale = Vector3.Zero()

      engine.removeSystem(particleSystem)
      AudioSource.getMutable(powerDown).playing = true
    }
  }

  utils.triggers.addTrigger(
    entity,
    2,
    2,
    [
      {
        type: 'box',
        scale: Vector3.create(4, 4, 4),
        position: Vector3.create(0, 0.75, 0)
      }
    ],
    (entity) => {
      console.log('on enter', { entity })
      //if (args.length > 0)
      togglePower(true)
    },
    (entity) => {
      console.log('on exit', { entity })
      //if (args.length === 0)
      togglePower(false)
    }
  )
}

// Power base where the power cube sits
