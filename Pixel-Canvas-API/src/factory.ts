import {
  AudioSource,
  Entity,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  PointerEvents,
  Transform,
  TransformType,
  engine,
  executeTask,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import { canvas, playersColor, updatePlayersColor } from '.'
import { updateDatabase } from './api'
import { ColorPicker, HexColor, LoadingIndicator, Pixel } from './components'
import { sceneMessageBus } from './messageBus'

// Create Canvas, this is a parent object holding pixels
export function createCanvas(transform: Partial<TransformType>): Entity {
  const canvas = engine.addEntity()
  Transform.create(canvas, transform)
  return canvas
}

// Create Pixel child of Canvas
export function createPixel(canvas: Entity, posX: number, posY: number, hexColor: string, id: string) {
  const pixel = engine.addEntity()
  Transform.create(pixel, {
    parent: canvas,
    position: { x: posX, y: posY, z: 0 }
  })
  MeshRenderer.setBox(pixel)
  MeshCollider.setBox(pixel)
  Material.setPbrMaterial(pixel, {
    albedoColor: Color4.fromHexString(hexColor),
    roughness: 0.5,
    emissiveColor: Color3.fromHexString(hexColor),
    emissiveIntensity: 0.5
  })

  // Add custom components to pixel
  Pixel.create(pixel, { id: id })
  HexColor.create(pixel, { hexColor: hexColor })

  // This component tracks if players pointer hovers over entity
  PointerEvents.create(pixel, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_HOVER_ENTER,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: false
        }
      },
      {
        eventType: PointerEventType.PET_HOVER_LEAVE,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: false
        }
      }
    ]
  })

  // On Click
  pointerEventsSystem.onPointerDown(
    {
      entity: pixel,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'paint pixel'
      }
    },
    function () {
      const id = Pixel.get(pixel).id
      const pos = Transform.get(pixel).position

      // Play sound
      AudioSource.createOrReplace(pixel, {
        audioClipUrl: 'sounds/click_bright_002.mp3',
        playing: true
      })

      createLoadingIndicator(pos.x, pos.y, playersColor, 'loading')

      // Write pixel color into database via API
      executeTask(async () => {
        const updatedPixel = await updateDatabase(id, pos.x, pos.y, playersColor)
        console.log(updatedPixel)
        if (!updatedPixel) return

        // Send new pixel data to all players in scene
        sceneMessageBus.emit('updatePixelColor', {
          posX: posX,
          posY: posY,
          hexColor: playersColor
        })
      })
    }
  )
}

// This parent holds all the color entities
export function createColorPicker(transform: Partial<TransformType>) {
  const colorPicker = engine.addEntity()
  Transform.create(colorPicker, transform)
  return colorPicker
}

// Create cubes to pick color from
export function createColor(parent: Entity, x: number, y: number, hexColor: string) {
  const colorEntity = engine.addEntity()
  MeshRenderer.setBox(colorEntity)
  MeshCollider.setBox(colorEntity)
  Transform.create(colorEntity, {
    parent: parent,
    position: { x: x, y: y, z: 0 }
  })
  Material.setPbrMaterial(colorEntity, {
    albedoColor: Color4.fromHexString(hexColor),
    roughness: 0.5,
    emissiveColor: Color3.fromHexString(hexColor),
    emissiveIntensity: 0.5
  })
  HexColor.create(colorEntity, { hexColor: hexColor })
  ColorPicker.create(colorEntity)

  // This component tracks if players pointer hovers over entity
  PointerEvents.create(colorEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_HOVER_ENTER,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: false
        }
      },
      {
        eventType: PointerEventType.PET_HOVER_LEAVE,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: false
        }
      }
    ]
  })

  // On Click
  pointerEventsSystem.onPointerDown(
    {
      entity: colorEntity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'pick color'
      }
    },
    function () {
      const newColor: string = HexColor.get(colorEntity).hexColor
      console.log('Players new color:', newColor)
      updatePlayersColor(newColor)

      // Indicates click by moving cube away
      Transform.getMutable(colorEntity).position.z = 0.5

      // Play sound
      AudioSource.createOrReplace(colorEntity, {
        audioClipUrl: 'sounds/click_bright_001.mp3',
        playing: true
      })
    }
  )
}

/**
 *
 * @param status 'loading' or 'finished'
 */
export function createLoadingIndicator(x: number, y: number, hexColor: string, status: string) {
  // Remove indicator if it already exists
  const indicators = engine.getEntitiesWith(LoadingIndicator)
  for (const [entity] of indicators) {
    const indicator = LoadingIndicator.getMutable(entity)
    const position = Transform.get(entity).position
    const thisHexColor = HexColor.get(entity).hexColor
    if (position.x == x && position.y == y && thisHexColor == hexColor) {
      engine.removeEntity(entity)
    }
  }

  // Set transparancy
  let color = Color4.fromHexString(hexColor)
  color.a = 0.5

  // Create front indicator
  const indicatorFront = engine.addEntity()
  MeshRenderer.setSphere(indicatorFront)
  Transform.create(indicatorFront, {
    parent: canvas,
    position: { x: x, y: y, z: 0.5 },
    scale: { x: 0.1, y: 0.1, z: 0.1 }
  })
  Material.setPbrMaterial(indicatorFront, {
    albedoColor: color,
    roughness: 0.5,
    emissiveColor: Color3.fromHexString(hexColor),
    emissiveIntensity: 0.5
  })
  LoadingIndicator.create(indicatorFront, { status: status })
  HexColor.create(indicatorFront, { hexColor: hexColor })

  // Create back indicator
  const indicatorBack = engine.addEntity()
  MeshRenderer.setSphere(indicatorBack)
  Transform.create(indicatorBack, {
    parent: canvas,
    position: { x: x, y: y, z: -0.5 },
    scale: { x: 0.1, y: 0.1, z: 0.1 }
  })
  Material.setPbrMaterial(indicatorBack, {
    albedoColor: color,
    roughness: 0.5,
    emissiveColor: Color3.fromHexString(hexColor),
    emissiveIntensity: 0.5
  })
  LoadingIndicator.create(indicatorBack, { status: status })
  HexColor.create(indicatorBack, { hexColor: hexColor })
}
