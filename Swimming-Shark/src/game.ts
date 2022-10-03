

const seaBed = engine.addEntity()
Transform.create(seaBed, {
	position: {x:8, y:0, z:8},
	rotation: Quaternion.euler(0,90,0),
	scale:  {x:0.8, y:0.8, z:0.8}
})
GltfContainer.create(seaBed, {
	src:'models/Underwater.gltf',
})
