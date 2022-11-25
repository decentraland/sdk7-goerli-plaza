
// const { Transform, BoxShape } = engine.baseComponents
/**
 * attempt at sdk 6.x like syntax
 */
export class TransformWrapper {
  /*
  static get(entity:Entity){
    return entity.getComponent(Transform)
  }*/

  //END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX
  //END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX

  //START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX
  //START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX
  
  static get(entity:Entity){
    return Transform.get(entity)
  }
  
}
