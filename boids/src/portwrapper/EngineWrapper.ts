/**
 * attempt at sdk 6.x like syntax for 7.x SDK
 */
export class EngineWrapper {
  /*
  static addSystem(system:ISystem, priority?: number, name?: string){
    engine.addSystem(system,priority)
  }
  */
  static addSystem(system: Update, priority?: number, name?: string){
    engine.addSystem(system,priority)
  }
  
}
