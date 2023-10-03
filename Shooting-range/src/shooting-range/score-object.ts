/*    SCORE OBJECT
		contains all functional components of score objects, including file location model's 
	location path, interface for creation calls, on-object component, and management module
	(used for creating, enabling, disabling, and destroying splat objects). when placed
		score objects automatically decay after a period of time (get repooled for use later)
*/

import { Animator, Billboard, Entity, GltfContainer, Schemas, Transform, engine } from '@dcl/sdk/ecs'

export module ScoreObject {
  //when true debug logs are generated (toggle off when you deploy)
  const isDebugging: boolean = false

  /** score model locations */
  const MODEL_SCORE_OBJECTS: string[] = [
    'models/shooting-range/score-10.glb',
    'models/shooting-range/score-25.glb',
    'models/shooting-range/score-50.glb'
  ]

  /** defines all possible types of score objects */
  export enum SCORE_TYPE {
    TEN = 0,
    TWENTYFIVE = 1,
    FIFTY = 2
  }

  /** pool of existing objects, managing 3 types of scores */
  var pooledObjects: Entity[][] = [[], [], []]

  /** how many seconds a score will remain active */
  const SCORE_LIFESPAN = 0.65

  /** object interface used to define all data required to create a new target object */
  export interface ScoreDataObject {
    type: SCORE_TYPE
    pos: { x: number; y: number; z: number }
  }

  /** component data def, this will exist attached on the object's entity as a component */
  export const ScoreComponentData = {
    /** true when this object is rendered in the scene */
    isActive: Schemas.Boolean,
    /** time remaing until mark disable */
    decayTime: Schemas.Number
  }
  /** define component, adding it to the engine as a managed behaviour */
  export const ScoreComponent = engine.defineComponent('ScoreComponentData', ScoreComponentData)

  /** timed processing for component */
  const scoreProcessing = function scoreTimer(dt: number) {
    //process every entity that has this component
    for (const [entity] of engine.getEntitiesWith(ScoreComponent)) {
      const component = ScoreComponent.getMutable(entity)
      //skip if not active/processing
      if (!component.isActive) continue
      //add time
      component.decayTime += dt
      //check for toggle
      if (component.decayTime >= SCORE_LIFESPAN) {
        ScoreObject.Disable(entity)
      }
    }
  }
  /** add system to engine */
  engine.addSystem(scoreProcessing)

  /** creates a new score object, returning reference to its entity (this handles the creation of the entity as well so ns can handle pooling) */
  export function Create(data: ScoreDataObject): Entity {
    if (isDebugging)
      console.log(
        'Score Object: attempting to create object of type=' +
          data.type +
          ' at pos(x=' +
          data.pos.x +
          ', y=' +
          data.pos.y +
          ', z=' +
          data.pos.z +
          ')...'
      )

    //attempt to find pre-existing component
    for (let i = 0; i < pooledObjects[data.type].length; i++) {
      if (!ScoreComponent.get(pooledObjects[data.type][i]).isActive) {
        if (isDebugging)
          console.log('Score Object: recycled unused object (ID=' + pooledObjects[data.type][i].toString() + ')!')
        return Enable(pooledObjects[data.type][i], data)
      }
    }

    //create object
    //  create entity
    const entity = engine.addEntity()
    Transform.create(entity, {
      position: { x: data.pos.x, y: data.pos.y, z: data.pos.z },
      scale: { x: 2, y: 2, z: 2 }
    })
    //	add billboard (always facing player)
    Billboard.create(entity)
    //  add custom model
    GltfContainer.create(entity, {
      src: MODEL_SCORE_OBJECTS[data.type],
      visibleMeshesCollisionMask: undefined,
      invisibleMeshesCollisionMask: undefined
    })
    //add animator
    Animator.create(entity, {
      states: [{ clip: 'Pop', playing: true, loop: false, shouldReset: true }]
    })
    //  add component
    ScoreComponent.create(entity, { isActive: true, decayTime: 0 })

    //add entity to pooling
    pooledObjects[data.type].push(entity)
    if (isDebugging) console.log('Score Object: created new object (ID=' + entity.toString() + ')!')
    //provide entity reference
    return entity
  }

  /** enables the given object with the provided settings (assumes object was previously disabled) */
  export function Enable(entity: Entity, scoreData: ScoreDataObject): Entity {
    if (isDebugging) console.log('Score Object: re-enabling unused object (ID=' + entity.toString() + ')...')

    //reactivate requested component, initialized by type
    ScoreComponent.getMutable(entity).decayTime = 0
    ScoreComponent.getMutable(entity).isActive = true

    //place objects
    Transform.getMutable(entity).position = { x: scoreData.pos.x, y: scoreData.pos.y, z: scoreData.pos.z }

    //enable object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 2, y: 2, z: 2 }

    //play animation
    Animator.getClip(entity, 'Pop').playing = true

    if (isDebugging) console.log('Score Object: re-enabled unused object (ID=' + entity.toString() + ')!')
    return entity
  }

  /** disables all objects from the game */
  export function DisableAll() {
    if (isDebugging) console.log('Score Object: disabling all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      for (let j = 0; j < pooledObjects[i].length; j++) {
        Disable(pooledObjects[i][j])
      }
    }

    if (isDebugging) console.log('Score Object: disabled all objects!')
  }
  /** disables given object from game (does not destroy object, remains in pool) */
  export function Disable(entity: Entity) {
    const component = ScoreComponent.getMutable(entity)
    //disable via component
    component.isActive = false

    //hide object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 0, y: 0, z: 0 }
    if (isDebugging) console.log('Score Object: disabled object (ID=' + entity.toString() + ')!')
  }

  /** destroyes all objects in the game */
  export function DestroyAll() {
    if (isDebugging) console.log('Score Object: destroying all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      while (0 < pooledObjects[i].length) {
        const obj = pooledObjects[i].pop()
        if (obj != undefined) Destroy(obj)
      }
    }

    if (isDebugging) console.log('Score Object: destroyed all objects!')
  }
  /** destroys given object (removes from engine and pool) */
  export function Destroy(entity: Entity) {
    engine.removeEntity(entity)
  }
}
