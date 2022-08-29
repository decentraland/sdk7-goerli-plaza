import { CircleHoverSystem, circularSystem } from './circularSystem'
import { timeOutUpdate } from './helper/setTimeout'
import { addSystem } from './helper/systems'

// My cube generator
function createCube(x: number, y: number, z: number) {
  const sdk = engine.baseComponents
  // Dynamic entity because we aren't loading static entities out of this scene code
  const myEntity = engine.addEntity(true)

  sdk.Transform.create(myEntity, {
    position: { x, y, z },
    scale: { x: 0.5, y: 0.5, z: 0.5},
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  sdk.BoxShape.create(myEntity, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    uvs: []
  })

  return myEntity
}


for (var x = 0.5; x < 16; x += 0.5) {
  for (var y = 0.5; y < 16; y += 0.5) {
    createCube(x, 0, y);
  }
}


addSystem(CircleHoverSystem, { t: 0 })


dcl.onUpdate((dt: number) => {
  engine.update(dt)
})



// engine.addSystem(timeOutUpdate)

