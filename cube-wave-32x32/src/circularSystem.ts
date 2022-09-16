export type CircularSystemState = {
  t: number
}

// My system
export function circularSystem(dt: number, state: CircularSystemState) {
  state.t += 2 * Math.PI * dt

  const entitiesWithBoxShapes = engine.getEntitiesWith(BoxShape)
  for (const [entity] of entitiesWithBoxShapes) {
    const transform = Transform.getMutable(entity)
    if (transform) {
      transform.position.x = 8 + 2 * Math.cos(state.t)
      transform.position.z = 8 + 2 * Math.sin(state.t)
    }
  }
}



export function CircleHoverSystem (dt: number, state: CircularSystemState){

	state.t +=  Math.PI * dt * 0.5

	const entitiesWithBoxShapes = engine.getEntitiesWith(BoxShape)
 
    // iterate over the entities of the group
	for (const [entity] of entitiesWithBoxShapes) {

		const transform = Transform.getMutable(entity)


      // mutate the rotation
      transform.position.y = Math.cos(state.t + Math.sqrt(Math.pow(transform.position.x - 8, 2) + Math.pow(transform.position.z - 8, 2)) / Math.PI) * 2 + 2;
      
      //entity.getComponent(Material).albedoColor.set(transform.position.x / 16, transform.position.y / 16, transform.position.z / 4);
    }
  
}