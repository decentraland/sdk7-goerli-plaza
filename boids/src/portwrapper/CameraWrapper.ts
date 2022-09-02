/**
 * attempt at sdk 6.x like syntax for 7.x SDK
 */
/*
root scene = 0
player = 1
camera = 2
*/
enum PlayerEnts{
  PLAYER = 1,
  CAMERA = 2
}
export class CameraWrapper {
  static getPosition(){
    return Transform.get((PlayerEnts.PLAYER as Entity)).position
  
  }
  static getPositionOrNull(){
    const v = Transform.getOrNull((PlayerEnts.PLAYER as Entity))
    if(v !== null){
      return v.position
    }else{
      return null
    }
  }
  
}
