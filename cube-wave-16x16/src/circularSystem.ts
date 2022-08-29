

var circularState: number = 0
// My system
export function circularSystem(dt: number) {
	circularState += 2 * Math.PI * dt

  const entitiesWithBoxShapes = engine.getEntitiesWith(engine.baseComponents.BoxShape)
  for (const [entity] of entitiesWithBoxShapes) {
    const transform = engine.baseComponents.Transform.getMutable(entity)
    if (transform) {
      transform.position.x = 8 + 2 * Math.cos(circularState)
      transform.position.z = 8 + 2 * Math.sin(circularState)
    }
  }
}




var hoverState: number = 0

export function CircleHoverSystem (dt: number){

	hoverState +=  Math.PI * dt * 0.5

	const entitiesWithBoxShapes = engine.getEntitiesWith(engine.baseComponents.BoxShape)
 
    // iterate over the entities of the group
	for (const [entity] of entitiesWithBoxShapes) {

		const transform = engine.baseComponents.Transform.getMutable(entity)


      // mutate the position
      transform.position.y = Math.cos(hoverState + Math.sqrt(Math.pow(transform.position.x - 8, 2) + Math.pow(transform.position.z - 8, 2)) / Math.PI) * 2 + 2;
      
      //entity.getComponent(Material).albedoColor.set(transform.position.x / 16, transform.position.y / 16, transform.position.z / 4);
    }
  
}