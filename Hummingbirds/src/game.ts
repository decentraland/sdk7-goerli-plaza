
// import { createHummingBird } from "./hummingBird"


const ground = engine.addEntity()
Transform.create(ground, {
	position: {x:8, y:0, z:8},
	rotation: {x:0, y:0, z:0, w: 0},
	scale:  {x:1.6, y:1.6, z:1.6}
})
GLTFShape.create(ground, {
	src:'models/Ground.gltf',
	// isPointerBlocker: true,
	// visible: true,
	// withCollisions: true
})



// const tree = engine.addEntity()
// Transform.create(tree, {
// 	position: {x:8, y:0, z:8},
// 	rotation: {x:0, y:0, z:0, w: 0},
// 	scale:  {x:1.6, y:1.6, z:1.6}
// })
// GLTFShape.create(tree, {
// 	src:'models/Tree.gltf'
// })
// Animator.create(tree, {
// 	states:[
// 		{
// 			clip: "Tree_Action",
// 			loop: false,
// 			playing: false,
// 			shouldReset: true,
// 			name: "Tree_Action" 
// 		}
// 	]
// })
// OnPointerDown.create(tree, {
// 	button: 0,
// 	maxDistance: 15,
// 	hoverText: "Shake",
// })


// export function clickTree(){
// 	if(OnPointerDownResult.has(tree)){
// 		createHummingBird()
// 		let anim = Animator.getMutable(tree)
// 		anim.states[0].playing = true
// 	}
// }

// engine.addSystem(clickTree)



function createCube(x: number, y: number, z: number, spawner = false): Entity {
	const entity = engine.addEntity()
  
	Transform.create(entity, {
	  position: { x, y, z },
	  scale: { x: 1, y: 1, z: 1 },
	  rotation: { x: 0, y: 0, z: 0, w: 1 }
	})
  
	BoxShape.create(entity)
  
	if (spawner) {
	  OnPointerDown.create(entity, {
		button: ActionButton.PRIMARY,
		hoverText: 'Press E to spawn'
	  })
	}
  
	return entity
  }

  createCube(8, 1, 8, true)