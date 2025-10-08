import {
  AudioSource,
  engine,
  GltfContainer,
  PointerEvents,
  PointerEventType,
  Transform,
  VisibilityComponent, TriggerArea, triggerAreaEventsSystem
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Particle, particleSystem } from './particles'
import { createSound } from './sound'
import * as utils from '@dcl-sdk/utils'

// Power glows
const powerBlueGlowEntity = engine.addEntity()
GltfContainer.create(powerBlueGlowEntity, { src: 'assets/scene/Models/powerBlueGlow.glb' })
Transform.create(powerBlueGlowEntity)

const powerRedGlowEntity = engine.addEntity()
GltfContainer.create(powerRedGlowEntity, { src: 'assets/scene/Models/powerRedGlow.glb' })
Transform.create(powerRedGlowEntity)

// Forcefield
const forcefieldEntity = engine.addEntity()
GltfContainer.create(forcefieldEntity, { src: 'assets/scene/Models/forcefield.glb' })
Transform.create(forcefieldEntity)

// Sounds
const powerUp = createSound('assets/scene/Audio/powerUp.mp3')
const powerDown = createSound('assets/scene/Audio/powerDown.mp3')

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
      } catch (err) { }
      AudioSource.playSound(powerUp, 'assets/scene/Audio/powerUp.mp3')

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
      AudioSource.playSound(powerDown, 'assets/scene/Audio/powerDown.mp3')
    }
  }

  const trigger = engine.addEntity()
  Transform.create(trigger, { parent: entity, position: Vector3.create(0, 0.75, 0), scale: Vector3.create(4, 4, 4) })
  TriggerArea.setBox(trigger)
  triggerAreaEventsSystem.onTriggerEnter(trigger, () => {
    togglePower(true)
  })
  triggerAreaEventsSystem.onTriggerExit(trigger, () => {
    togglePower(false)
  })
}

// Power base where the power cube sits
