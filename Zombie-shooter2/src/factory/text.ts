
export function createText(value: string): Entity {
  const text = engine.addEntity()

  Transform.create(text, {
    position: { x: 10, y: 1, z: 10 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  TextShape.create(text, {
    text: value,
    font: 'SansSerif',
    fontAutoSize: false,
    fontSize: 5,
    height: 2,
    width: 4,
    lineCount: 1,
    lineSpacing: 1,
    opacity: 1,
    outlineWidth: 0.1,
    outlineColor: { r: 0, g: 0, b: 1 },
    textColor: { r: 1, g: 1, b: 1 },
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    shadowBlur: 1,
    shadowColor: { r: 1, g: 0, b: 0 },
    shadowOffsetX: 100,
    shadowOffsetY: 5,
    textWrapping: false,
    hTextAlign: 'center',
    vTextAlign: 'center',
    visible: true
  })

  return text
}
