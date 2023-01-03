import { engine, inputSystem, InputAction, PointerEventType, Entity, Transform, AvatarAttach, AvatarAnchorPointType, Animator } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { BeerGlass, PickedUp, TapBase } from '../definitions'
import { playSound } from './factory'
import { currentPlayerId, getEntityParent, getPlayerPosition } from './helpers'


export function pickingGlassSystem() {
  // If there is some PickedUp, so the behvior is to listen when this
  //  can be dropped
  for (const [entity, pickedUp] of engine.getEntitiesWith(PickedUp)) {
    const tryToDropCommand = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
    if (tryToDropCommand) {
      const hitPosition = tryToDropCommand.hit?.position || getPlayerPosition()
      const hitEntity = tryToDropCommand.hit?.entityId as Entity
      const hitParentEntity = getEntityParent(hitEntity)
      let drop = false

      // If there is a tap base (the collider)
      if (TapBase.getOrNull(hitParentEntity)) {
        Transform.createOrReplace(pickedUp.child, {
          parent: hitParentEntity
        })
        drop = true
      } else {
        // Only it's allowed to hold the beer in surface parallel to floor
        const diff = Vector3.subtract(Vector3.Up(), tryToDropCommand.hit?.normalHit || Vector3.Zero())
        if (Vector3.length(diff) < 0.01) {
          Transform.createOrReplace(pickedUp.child, {
            position: hitPosition
          })
          drop = true
        }
      }

      // TODO: These line crashes the renderer
      // AvatarAttach.deleteFrom(entity)
      // engine.removeEntity(entity)
      if (drop) {
        PickedUp.deleteFrom(entity)
        playSound('sounds/putDown.mp3', false, hitPosition)
      }
    }

    const glass = BeerGlass.get(pickedUp.child)

    const tryToDrinkCommand = inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)
    if (glass.filled && tryToDrinkCommand) {
      BeerGlass.getMutable(pickedUp.child).filled = false
      Animator.playSingleAnimation(pickedUp.child, 'Blank')
      playSound('sounds/swallow.mp3', false, getPlayerPosition())
    }
    return
  }

  // Only happens when there isn't any PickedUp component
  for (const [entity, glass] of engine.getEntitiesWith(BeerGlass)) {
    if (!glass.beingFilled && inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      const parentBeer = engine.addEntity()
      PickedUp.create(parentBeer, {
        child: entity
      })

      AvatarAttach.create(parentBeer, {
        avatarId: currentPlayerId,
        anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND
      })
      Transform.createOrReplace(entity, {
        position: Vector3.create(0, 0.1, 0.175),
        rotation: Quaternion.fromEulerDegrees(0, -90, 30),
        parent: parentBeer
      })

      playSound('sounds/pickUp.mp3', false, getPlayerPosition())
    }
  }
}
