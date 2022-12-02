import { Entity, engine, Transform, TextShape } from "@dcl/sdk/ecs"

export function createText(parent: Entity, value: string): Entity {
  const text = engine.addEntity()

  Transform.create(text, {
    position: { x: 0, y: 1, z: 0 },
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
    textColor: { r: 1, g: 1, b: 1, a: 0 },
    shadowBlur: 1,
    shadowColor: { r: 1, g: 0, b: 0 },
    shadowOffsetX: 100,
    shadowOffsetY: 5,
  })

  return text
}
