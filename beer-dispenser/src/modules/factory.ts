import { BeerGlass, BeerType, getTapData, TapBase, TapComponent } from '../definitions'

export function createBeerGlass(model: string, position: Vector3) {
  const glassEntity = engine.addEntity()

  GltfContainer.create(glassEntity, { src: model })

  Transform.create(glassEntity, { position })

  Animator.create(glassEntity, {
    states: [
      {
        clip: 'Blank',
        name: 'Blank',
        playing: true
      },
      {
        clip: 'PourRed',
        name: 'PourRed',
        loop: false
      },
      {
        clip: 'PourYellow',
        name: 'PourYellow',
        loop: false
      },
      {
        clip: 'PourGreen',
        name: 'PourGreen',
        loop: false
      }
    ]
  })
  BeerGlass.create(glassEntity)

  PointerHoverFeedback.create(glassEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          hoverText: 'Pick up',
          maxDistance: 5,
          button: InputAction.IA_PRIMARY
        }
      }
    ]
  })
}

export function createTap(tapBeerType: BeerType, dispenseEntity: Entity) {
  const tapEntity = engine.addEntity()
  const tapData = getTapData(tapBeerType)

  TapComponent.create(tapEntity, {
    beerType: tapBeerType
  })
  GltfContainer.create(tapEntity, {
    src: tapData.model
  })
  Transform.create(tapEntity, {
    parent: dispenseEntity
  })
  Animator.create(tapEntity, {
    states: [
      {
        clip: 'Blank',
        name: 'Blank',
        playing: true,
        loop: false
      },
      {
        clip: 'Pour',
        name: 'Pour',
        loop: false
      }
    ]
  })

  PointerHoverFeedback.create(tapEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          hoverText: 'Pour',
          maxDistance: 5,
          button: InputAction.IA_PRIMARY
        }
      }
    ]
  })

  const tapColliderPosition = Vector3.add(tapData.position, Vector3.create(0, 0.05, 0))
  const colliderParentEntity = engine.addEntity()
  Transform.create(colliderParentEntity, {
    parent: tapEntity,
    position: tapColliderPosition
  })
  TapBase.create(colliderParentEntity, {
    beerType: tapBeerType
  })

  const colliderEntity = engine.addEntity()
  Transform.create(colliderEntity, {
    parent: colliderParentEntity,
    scale: Vector3.scale(Vector3.One(), 0.33),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })

  MeshCollider.setPlane(colliderEntity)
  // Debug to see the collider
  MeshRenderer.setPlane(colliderEntity)
}

export function playSound(audio: string, loop: boolean = false, position?: Vector3) {
  const entity = engine.addEntity()
  AudioSource.create(entity, {
    audioClipUrl: audio,
    loop,
    playing: true
  })

  Transform.create(entity, {
    position
  })

  return entity
}
