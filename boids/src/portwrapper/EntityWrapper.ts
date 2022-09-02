/**
 * attempt at sdk 6.x like syntax for 7.x SDK
 */
export class EntityWrapper {
  entity: Entity


  constructor(entity?: Entity) {
    if(entity !== undefined){
      this.entity = entity
    }else{
      this.entity = EntityWrapper.createEntity()
    }
  }

  /*
  static createEntity(){
    const ent = new Entity()
    engine.addEntity(ent)
    return ent
  }

  withCollisions(val:boolean){
    //default is off i think and dont want them on so turning off in sdk7???
    if(this.hasComponent_String("engine.shape")){
      this.getComponent_String("engine.shape").withCollisions = val
    }
  }
  setParent(parent: Entity){
    this.entity.setParent(parent)
  }
  //getComponent<T = any>(component: string): T;
  hasComponent<T>(component: ComponentConstructor<T>): boolean{
    return this.entity.hasComponent(component)
  }
  getComponent<T>(component: ComponentConstructor<T>|string): T{
    if (typeof component === 'string' || component instanceof String){
      return this.getComponent_String(component as string)
    }else{
      return this.getComponentM(component)
    }
  }
  hasComponent_String<T=any>(component: string): boolean{
    return this.entity.hasComponent(component)
  }
  getComponent_String<T=any>(component: string): T{
    return this.getComponentM_String(component as string)
  }
  getComponentM_String<T = any>(component: string): T{
    return this.entity.getComponent(component)
  }
  getComponentM<T>(component: ComponentConstructor<T>): T{
    return this.entity.getComponent(component)
  }
  addComponent<T extends object>(component: ComponentConstructor<T>,args?:any):T {
    return this.entity.addComponent(new component(args))
  }
  isAlive(){
    return this.entity.alive
  }*/

  

  static createEntity(){
    return engine.addEntity()
  }
  
  withCollisions(val:boolean){
    //default is off i think and dont want them on so turning off in sdk7???
    //if(this.entity.hasComponent_String("engine.shape")){
    //  this.entity.getComponent_String("engine.shape").withCollisions = val
    //}
  }
  setParent(parent: Entity){
    Transform.getMutable(this.entity).parent = parent
  }
  getComponent<T extends ISchema = ISchema<any>>(comp: ComponentDefinition<T>): ComponentType<T> {
    return this.getComponentM(comp)
  }

  getComponentM<T extends ISchema = ISchema<any>>(comp: ComponentDefinition<T>): ComponentType<T> {
    return comp.getMutable(this.entity)
  }
  getComponentR<T extends ISchema = ISchema<any>>(comp: ComponentDefinition<T>): DeepReadonly<ComponentType<T>> {
    return comp.get(this.entity)
  }
  addComponent<T extends ISchema = ISchema<any>>(comp: ComponentDefinition<T>, val?: ComponentType<T>) {
    return comp.create(this.entity, val)
  }
  
  hasComponent<T extends ISchema = ISchema<any>>(comp: ComponentDefinition<T>) {
    return comp.has(this.entity)
  }
  
  isAlive(){
    //engine.
    //engine.add
    return true
  }

  

  
}
