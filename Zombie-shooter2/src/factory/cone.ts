
export function createCone() {
	const cone = engine.addEntity()
  
	Transform.create(cone, {
	  position: { x: 3, y: 1, z: 3 }
	})
  
	MeshRenderer.create(cone, { cylinder: {    
	  radiusTop: 0,
	  radiusBottom: 1
	}})

	PointerEvents.create(cone, {
		pointerEvents: [
			{
			  eventType: PointerEventType.DOWN,
			  eventInfo: {
				button: ActionButton.PRIMARY,
				hoverText: 'Click',
				showFeedback: true
			  }
			}
		  ]
    })
  
	return cone
  }
