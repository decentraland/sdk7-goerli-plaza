
const { Transform, GLTFShape } = engine.baseComponents

export function createGLTF(
	transform:{
	position: {x:number,y:number,z:number} ,
	scale: { x: number, y: number, z: number },
    rotation: { x: number, y: number, z: number, w: number }
}, model:string
): Entity {
  const gltf = engine.addEntity()

  Transform.create(gltf, transform)

  GLTFShape.create(gltf, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    src: model
  })


  return gltf
}
