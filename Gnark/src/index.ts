export * from '@dcl/sdk'
import {engine} from '@dcl/sdk/ecs'

import { createGLTF } from './gltf'
import { createGnark } from './gnark'

import { distanceSystem, walkAround } from './systems/gnarkAI'

// const _cubeEntity = createCube(8, 2, 8)
// const _coneEntity = createCone()
// const _nftEntity = createNft()
// const _textEntity = createText()

createGLTF(
  {
    position: { x: 16, y: 0, z: 16 },
    scale: { x: 1.6, y: 1.6, z: 1.6 },
    rotation: { x: 0, y: 180, z: 0, w: 1 }
  },
  'models/Temple.glb'
)
createGnark()
createGnark()

//  engine.addSystem(moveSystem)

//  engine.addSystem(timerSystem)

engine.addSystem(walkAround)
engine.addSystem(distanceSystem)
