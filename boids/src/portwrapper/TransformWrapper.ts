
// const { Transform, BoxShape } = engine.baseComponents
/**
 * attempt at sdk 6.x like syntax
 */
export class TransformWrapper {
  /*
  static get(entity:Entity){
    return entity.getComponent(Transform)
  }*/
  
  static get(entity:Entity){
    return Transform.get(entity)
  }
  
}
