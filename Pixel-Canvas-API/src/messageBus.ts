import { Material, Transform, engine } from '@dcl/sdk/ecs'
import { MessageBus } from '@dcl/sdk/message-bus'
import { HexColor, Pixel } from './components'
import { Color3, Color4 } from '@dcl/sdk/math'
import { createLoadingIndicator } from './factory'

// This is the global message bus for the whole scene
export const sceneMessageBus = new MessageBus()

// Everytime you or another player places a pixel a message is send.
// So everyone can see the most recent pixels,
// without calling API all the time
sceneMessageBus.on('updatePixelColor', (newPixel) => {
  console.log('MessageBus:')
  console.log(newPixel)
  // Get  all entities with custom component Pixel
  const pixels = engine.getEntitiesWith(Pixel)
  for (const [entity] of pixels) {
    const pos = Transform.getMutable(entity).position
    if (pos.x == newPixel.posX && pos.y == newPixel.posY) {
      // Change color of pixel
      Material.setPbrMaterial(entity, {
        albedoColor: Color4.fromHexString(newPixel.hexColor),
        roughness: 0.5,
        emissiveColor: Color3.fromHexString(newPixel.hexColor),
        emissiveIntensity: 0.5
      })

      // Update new color in custom component
      HexColor.getMutable(entity).hexColor = newPixel.hexColor

      // This is a short visual and accoustic 'plop' animation
      createLoadingIndicator(pos.x, pos.y, newPixel.hexColor, 'finished')
    }
  }
})
