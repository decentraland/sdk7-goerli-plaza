import { CircleHoverSystem } from './circularSystem'
import { addSystem } from './helper/systems'
import { Billboard, engine, MeshRenderer, TextShape, Transform } from "@dcl/sdk/ecs"

// My cube generator
function createCube(x: number, y: number, z: number) {
  // Dynamic entity because we aren't loading static entities out of this scene code
  const myEntity = engine.addEntity(true)

  Transform.create(myEntity, {
    position: { x, y, z },
    scale: { x: 0.5, y: 0.5, z: 0.5 }
  })

  MeshRenderer.setBox(myEntity)

  return myEntity
}

for (let x = 0.5; x < 16; x += 0.5) {
  for (let y = 0.5; y < 16; y += 0.5) {
    createCube(x, 0, y)
  }
}

addSystem(CircleHoverSystem, { t: 0 })

const sign = engine.addEntity(true)
Transform.create(sign, {
  position: { x: 8, y: 6, z: 8 },
  scale: { x: 1.2, y: 1.2, z: 1.2 },
  rotation: { x: 0, y: 0, z: 0, w: 0 }
})

TextShape.create(sign, {
  text: 'Stress test SDK v7.0-EA\n16x16 cubes',
  fontAutoSize: false,
  fontSize: 5,
  height: 2,
  width: 4,
  lineCount: 1,
  lineSpacing: 1,
  outlineWidth: 0.1,
  outlineColor: { r: 0, g: 0, b: 1 },
  textColor: { r: 1, g: 0, b: 0, a: 1 },
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  shadowBlur: 1,
  shadowColor: { r: 1, g: 0, b: 0 },
  shadowOffsetX: 0,
  shadowOffsetY: 5,
  textWrapping: false
})

Billboard.create(sign)
