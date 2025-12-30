import { AudioSource, InputAction, Material, PointerEventType, Transform, engine, inputSystem } from '@dcl/sdk/ecs'
import { ColorPicker, HexColor, LoadingIndicator, Pixel } from './components'
import { Color3, Color4 } from '@dcl/sdk/math'
import { playersColor } from '.'

// System tracking if player is pointing on a pixel entity
export function pixelHoverSystem() {
  // Get Pixel Entities
  const pixels = engine.getEntitiesWith(Pixel)
  for (const [entity] of pixels) {
    const hoverEnter = inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)
    const hoverLeave = inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)

    // If pointer hovers over this pixel entity
    if (hoverEnter) {
      // Color pixel with players color
      Material.setPbrMaterial(entity, {
        albedoColor: Color4.fromHexString(playersColor),
        roughness: 0.5,
        emissiveColor: Color3.fromHexString(playersColor),
        emissiveIntensity: 0.5
      })

      // Play sound
      AudioSource.createOrReplace(entity, {
        audioClipUrl: 'assets/scene/Audio/click_2.mp3',
        playing: true
      })
    }

    // If pointer leaves pixel
    if (hoverLeave) {
      // Color pixel back to it's original color
      const originalColor = HexColor.get(entity).hexColor
      Material.setPbrMaterial(entity, {
        albedoColor: Color4.fromHexString(originalColor),
        roughness: 0.5,
        emissiveColor: Color3.fromHexString(originalColor),
        emissiveIntensity: 0.5
      })
    }
  }
}

// System tracking if player points on a color picker entity
export function colorPickerHoverSystem() {
  // Get ColorPicker Entities
  const colorPickers = engine.getEntitiesWith(ColorPicker)
  for (const [entity] of colorPickers) {
    const hoverEnter = inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)
    const hoverLeave = inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)

    // If pointer hovers over pixel
    if (hoverEnter) {
      const pos = Transform.getMutable(entity).position
      pos.z = -0.5

      // Play sound
      AudioSource.createOrReplace(entity, {
        audioClipUrl: 'assets/scene/Audio/click_1.mp3',
        playing: true
      })
    }

    // If pointer leaves pixel
    if (hoverLeave) {
      const pos = Transform.getMutable(entity).position
      pos.z = 0
    }
  }
}

// This System handles the bubble animation while pixel data loads
export function loadingIndicatorSystem() {
  const indicators = engine.getEntitiesWith(LoadingIndicator)
  for (const [entity] of indicators) {
    let indicator = LoadingIndicator.getMutable(entity)
    const scale = Transform.getMutable(entity).scale
    const thisHexColor = HexColor.get(entity).hexColor

    if (indicator.status == 'loading') {
      // If inidcator is bigger than a Pixel shrink it
      if (scale.x > 1) {
        scale.x = 0.1
        scale.y = 0.1
        scale.z = 0.1
      } else {
        // Grow indicator
        scale.x += 0.1
        scale.y += 0.1
        scale.z += 0.1
      }
    }

    if (indicator.status == 'finished') {
      // Reset indicator size to small
      scale.x = 0.1
      scale.y = 0.1
      scale.z = 0.1

      // Increase transparancy
      let color = Color4.fromHexString(thisHexColor)
      color.a = 0.25
      Material.setPbrMaterial(entity, {
        albedoColor: color,
        roughness: 0.5,
        emissiveColor: Color3.fromHexString(thisHexColor),
        emissiveIntensity: 0.5
      })
      indicator.status = 'finishedAnimation'
    }

    if (indicator.status == 'finishedAnimation') {
      // If animation is done remove indicator
      if (scale.x > 2) {
        engine.removeEntity(entity)
        // Play sound
        AudioSource.createOrReplace(entity, {
          audioClipUrl: 'assets/scene/Audio/pop_2.mp3',
          playing: true
        })
      } else {
        // Grow indicator
        scale.x += 0.4
        scale.y += 0.4
        scale.z += 0.4
      }
    }
  }
}
