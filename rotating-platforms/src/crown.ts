import { AudioSource, engine, Entity, GltfContainer, Transform, TransformType, TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const crownPickupSound = engine.addEntity()
Transform.create(crownPickupSound)
AudioSource.create(crownPickupSound, { audioClipUrl: 'assets/scene/Audio/win.mp3' })

export function createCrown(model: string, transform: TransformType): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, transform)

  const size = Vector3.create(2.5, 2.5, 2.5)
  const centerOffset = Vector3.Zero()

  //utils.triggers.setLayerMask(engine.PlayerEntity,1)
  //utils.triggers.setTriggeredByMask(entity,1)

  //entity: Entity, layerMask: number, triggeredByMask: number, areas?: Array<TriggerAreaSpec>, onEnterCallback?: OnTriggerEnterCallback, onExitCallback?: OnTriggerExitCallback, debugColor?: Color3
  const trigger = engine.addEntity()
  Transform.create(trigger, { parent: entity, position: Vector3.Zero(), scale: size })
  TriggerArea.setBox(trigger)
  triggerAreaEventsSystem.onTriggerEnter(trigger, () => {
    console.log('enter crown')
    AudioSource.getMutable(crownPickupSound).playing = true
    const playerPosition = Transform.getOrNull(engine.PlayerEntity)?.position || Vector3.Zero()
    //console.log("engine.PlayerEntity",Transform.getOrNull(engine.PlayerEntity),playerPosition,AudioSource.get(crownPickupSound).playing)
    Transform.getMutable(crownPickupSound).position = playerPosition //.position
    engine.removeEntityWithChildren(entity)
  })

  return entity
}
