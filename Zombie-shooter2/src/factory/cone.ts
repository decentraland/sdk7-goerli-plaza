
export function createCone() {
	const cone = engine.addEntity()
  
	Transform.create(cone, {
	  position: { x: 3, y: 1, z: 3 }
	})
  
	MeshRenderer.create(cone, { mesh: { $case:"cylinder", cylinder: {    
	  radiusTop: 0,
	  radiusBottom: 1
	}}})

	MeshCollider.create(cone, { mesh: { $case:"cylinder", cylinder:{  
		radiusTop: 0,
		radiusBottom: 1
	}}})

	PointerHoverFeedback.create(cone, {
		pointerEvents: [
			{
			  eventType: PointerEventType.PET_DOWN,
			  eventInfo: {
				button: InputAction.IA_PRIMARY,
				hoverText: 'Click',
				showFeedback: true
			  }
			}
		  ]
    })
  
	return cone
  }
