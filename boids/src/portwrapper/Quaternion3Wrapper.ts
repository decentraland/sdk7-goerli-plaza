

/**
 * attempt at sdk 6.x like syntax
 */
export class QuaternionWrapper {
  y: number
  x: number
  z: number
  w: number

  
  static Euler(x:number,y:number,z:number){
    return Quaternion.euler(x,y,z)
  }
  static Zero(){
    return Quaternion.Zero()
  }
  
  constructor(x:number,y:number,z:number,w:number) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }


/*
  static LookRotation(direction: Vector3,up?:Vector3) {
    return Quaternion.LookRotation(direction,up)
  }
  static Slerp(rotation: { x: number; y: number; z: number; w: number }, lookRot: any, amount: number = 1): Quaternion {
    return Quaternion.Slerp(rotation,lookRot,amount)
  }
  */

  //END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX
  //END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX//END SDK6 SYNTAX

  //START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX
  //START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX//START SDK7 SYNTAX
  
  static LookRotation(direction: Vector3.MutableVector3,up?: Vector3.MutableVector3) {
    return Quaternion.lookRotation(direction,up)
  }
  static Slerp(rotation: { x: number; y: number; z: number; w: number }, lookRot: any, amount: number): Quaternion.MutableQuaternion {
    return Quaternion.slerp( rotation, lookRot, amount )
  }

  
}
