import { Entity, engine } from '@dcl/sdk/ecs'
import { getDatabase, initDatabase } from './api'
import { Quaternion } from '@dcl/sdk/math'
import { createCanvas, createColor, createColorPicker, createPixel } from './factory'
import { colorPickerHoverSystem, loadingIndicatorSystem, pixelHoverSystem } from './systems'
import { setupUi } from './ui'

const canvasWidth = 16
const canvasHeight = 16

const colors = [
  '#FFFFFF', // White
  '#FFFF00', // Yellow
  '#FF7F00', // Orange
  '#FF0000', // Red
  '#FF00FF', // Magenta
  '#800080', // Purple
  '#0000FF', // Blue
  '#00FFFF', // Cyan
  '#008000', // Green
  '#006400', // Dark Green
  '#8B4513', // Brown
  '#D2B48C', // Tan
  '#D3D3D3', // Light Grey
  '#A9A9A9', // Medium Grey
  '#696969', // Dark Grey
  '#000000' // Black
]

// This is the color player paints with
export let playersColor: string = colors[1]
export function updatePlayersColor(hexColor: string) {
  playersColor = hexColor
}

// Make canvas globaly accessable
export const canvas: Entity = createCanvas({
  position: { x: 4, y: 0.25, z: 8 },
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: { x: 0.5, y: 0.5, z: 0.5 }
})

export async function main() {
  // Load pixels from database
  let pixelData = await getDatabase()

  // If there are no pixel, create new ones in database
  if (pixelData.length == 0) {
    // Writes empty pixels into databse
    pixelData = await initDatabase(canvasWidth, canvasHeight, colors[15])
  }
  console.log(pixelData)

  // Fill canvas with pixel from database
  pixelData.forEach((pixel: { posX: number; posY: number; hexColor: string; _id: string }) => {
    createPixel(canvas, pixel.posX, pixel.posY, pixel.hexColor, pixel._id)
  })

  // Create color picker
  const colorPicker = createColorPicker({
    position: { x: 12, y: 1, z: 6 },
    rotation: Quaternion.fromEulerDegrees(0, 45, 0),
    scale: { x: 0.25, y: 0.25, z: 0.25 }
  })

  // Fill color picker with colors
  const width = 4
  const height = 4
  let index = 0
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      createColor(colorPicker, x, y, colors[index])
      index++
    }
  }

  // Start systems
  engine.addSystem(pixelHoverSystem)
  engine.addSystem(colorPickerHoverSystem)
  engine.addSystem(loadingIndicatorSystem)

  // UI with GitHub link
  setupUi()
}
