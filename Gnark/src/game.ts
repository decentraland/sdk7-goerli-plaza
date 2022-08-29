import { circularSystem } from './systems/circular'
import { playSounds } from './systems/sound'
import { addStateSystem } from './helper/systemWithState'
import { createCube } from './cube'
import { createCone } from './cone'
import { createNft } from './nft'
import { createText } from './text'
import { createZombie } from './zombie'
import { moveSystem, onMoveFinish } from './systems/moveSystem'
import { createGLTF } from './gltf'
import { createGnark } from './gnark'
import { timerSystem } from './systems/timeOutSystem'
import { distanceSystem, walkAround } from './systems/gnarkAI'

// const _cubeEntity = createCube(8, 2, 8)
// const _coneEntity = createCone()
// const _nftEntity = createNft()
// const _textEntity = createText()

let temple = createGLTF({
    position: {x:16,y: 0, z:16},
    scale: {x:1.6, y:1.6, z:1.6},
	rotation: {x:0, y:180, z:0, w:1}
  }, "models/Temple.glb")


const gnark=  createGnark()

const gnark2=  createGnark()

// const zombie = createZombie()



// addStateSystem(circularSystem, { t: 0 })
// addStateSystem(playSounds, { t: 0 })
//  engine.addSystem(moveSystem)

//  engine.addSystem(timerSystem)

engine.addSystem(walkAround)
engine.addSystem(distanceSystem)