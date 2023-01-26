import { engine, Entity, IEngine, Schemas, Transform } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"


enum EventType {
  Finish
}
type EventMapType = Map<EventType, { cb: (entities: Entity[]) => void }>


const KeepRotating = engine.defineComponent('KeepRotating', {
  rotationVelocity: Schemas.Quaternion,
  rotation: Schemas.Quaternion,
  finished: Schemas.Boolean
})


const KeepRotatingState = engine.defineComponent('KeepRotatingState',
  {
    state: Schemas.Array(Schemas.Number)
  }
)

/**
 * OOP to create a system
 * Usage: KeepRotatingSystem.instance.addKeepRotating(entity,rotation);
 */
export class KeepRotatingSystem {
  private static _instance: KeepRotatingSystem | null = null
  static get instance(): KeepRotatingSystem {
    return this.createAndAddToEngine()
  }
  private systemFnCache!: (dt: number) => void
  private eventsMap = new Map<Entity, EventMapType>()

  private constructor() {
    KeepRotatingSystem._instance = this

  }

  static createAndAddToEngine(): KeepRotatingSystem {
    if (this._instance == null) {
      this._instance = new KeepRotatingSystem()
      engine.addSystem(this._instance.system)
    }
    return this._instance
  }

  createUpdateFn() {
    if (this.systemFnCache === undefined) {
      console.log("createUpdateFn", this)
      this.systemFnCache = (dt: number) => {
        //log("createUpdateFn called",this)
        this.system(dt)
      }
    }
    return this.systemFnCache
  }

  system(dt: number) {
    //console.log("class.system")
    for (const [entity, keepRotating, keepRotatingState, transform] of engine.getEntitiesWith(KeepRotating, KeepRotatingState, Transform)) {
      const transform = Transform.getMutable(entity)//entity.getComponent(Transform)
      const keepRotating = KeepRotating.getMutable(entity)

      keepRotating.rotation = Quaternion.slerp(
        Quaternion.Identity(),
        keepRotating.rotationVelocity,
        dt
      )
      transform.rotation = Quaternion.multiply(transform.rotation, keepRotating.rotation)

    }
  }
  addKeepRotating(entity: Entity, rotationVelocity: Quaternion) {
    KeepRotating.createOrReplace(entity, {
      rotation: Quaternion.Identity(),
      rotationVelocity: rotationVelocity,
      finished: false
    })
    KeepRotatingState.createOrReplace(entity)
  }
  removeKeepRotating(entity: Entity) {
    KeepRotating.deleteFrom(entity)
    KeepRotatingState.deleteFrom(entity)
  }
  onFinish(entity: Entity, cb: (entities: Entity[]) => void) {
    const event = this.eventsMap.get(entity) || this.eventsMap.set(entity, new Map()).get(entity)!
    event.set(EventType.Finish, { cb })
  }
  removeOnFinish(entity: Entity) {
    this.eventsMap.get(entity)?.delete(EventType.Finish)
    if (this.eventsMap.get(entity)?.size === 0) {
      this.eventsMap.delete(entity)
    }
  }
}


/**
 * functional programming way to create a system
 * 
 * USAGE
 * export const keepRotatingSystem = createKeepRotatingSystem(engine)
 * keepRotatingSystem.addKeepRotating(entity,rotation);
 * 
 * @param targetEngine 
 * @returns 
 */
export function createKeepRotatingSystem(targetEngine: IEngine) {
  const KeepRotating = targetEngine.defineComponent('KeepRotating', {
    rotationVelocity: Schemas.Quaternion,
    rotation: Schemas.Quaternion,
    finished: Schemas.Boolean
  })

  const KeepRotatingState = targetEngine.defineComponent('KeepRotatingState',
    {
      state: Schemas.Array(Schemas.Number)
    }
  )

  enum EventType {
    Finish
  }
  type EventMapType = Map<EventType, { cb: (entities: Entity[]) => void }>

  const eventsMap = new Map<Entity, EventMapType>()

  function system(dt: number) {

    for (const [entity, keepRotating, keepRotatingState, transform] of targetEngine.getEntitiesWith(KeepRotating, KeepRotatingState, Transform)) {
      const transform = Transform.getMutable(entity)//entity.getComponent(Transform)
      const keepRotating = KeepRotating.getMutable(entity)

      keepRotating.rotation = Quaternion.slerp(
        Quaternion.Identity(),
        keepRotating.rotationVelocity,
        dt
      )
      transform.rotation = Quaternion.multiply(transform.rotation, keepRotating.rotation)

    }
  }

  targetEngine.addSystem(system)

  return {
    addKeepRotating(entity: Entity, rotationVelocity: Quaternion) {
      KeepRotating.createOrReplace(entity, {
        rotation: Quaternion.Identity(),
        rotationVelocity: rotationVelocity,
        finished: false
      })
      KeepRotatingState.createOrReplace(entity)
    },
    removeKeepRotating(entity: Entity) {
      KeepRotating.deleteFrom(entity)
      KeepRotatingState.deleteFrom(entity)
    },
    onFinish(entity: Entity, cb: (entities: Entity[]) => void) {
      const event = eventsMap.get(entity) || eventsMap.set(entity, new Map()).get(entity)!
      event.set(EventType.Finish, { cb })
    },
    removeOnFinish(entity: Entity) {
      eventsMap.get(entity)?.delete(EventType.Finish)
      if (eventsMap.get(entity)?.size === 0) {
        eventsMap.delete(entity)
      }
    }
  }
}

//uncomment  to use FP way
//export const keepRotatingSystem = createKeepRotatingSystem(engine)
