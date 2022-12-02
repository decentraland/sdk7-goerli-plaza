import { Entity, engine, Transform, TextShape, TextAlignMode } from "@dcl/sdk/ecs"

export function createText(parent: Entity, value: string): Entity {
  const text = engine.addEntity()

  Transform.create(text, {
    position: { x: 10, y: 1, z: 10 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
    parent: parent
  })

  TextShape.create(text, {
    text: value,
    fontAutoSize: false,
    fontSize: 5,
    height: 2,
    width: 4,
    outlineWidth: 0.1,
    outlineColor: { r: 0, g: 0, b: 1 },
    textColor: { r: 1, g: 1, b: 1, a: 1 },
    shadowBlur: 1,
    shadowColor: { r: 1, g: 0, b: 0 },
    shadowOffsetX: 100,
    shadowOffsetY: 5,
    textAlign: TextAlignMode.TAM_BOTTOM_LEFT
  })

  return text
}
