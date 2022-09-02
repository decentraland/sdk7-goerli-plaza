/**
 * attempt at sdk 6.x like syntax
 */

 type Vector3Type = {
  x: number; y: number; z: number 
}

export class Vector3Wrapper {
 
 
 y: number
 x: number
 z: number
 delegate:Vector3.MutableVector3

 constructor(x:number,y:number,z:number) {
   this.x = x
   this.y = y
   this.z = z

   this.delegate = Vector3Wrapper.create(x,y,z)
 }


 static create(x:number,y:number,z:number){
   return Vector3.create(x,y,z)
 }
 static copyFrom(src: Vector3Type, dest: Vector3.MutableVector3) {
   src.x = dest.x
   src.y = dest.y
   src.z = dest.z
 }
 
 static Lerp(start: Vector3Type, end: Vector3Type, amount: number) {
   return Vector3.lerp(start,end,amount)
 }
 static Zero(){
   return Vector3.Zero()
 }
 static One(){
   return Vector3.One()
 }
 subtract(v:Vector3.ReadonlyVector3):Vector3.MutableVector3{
   return Vector3.subtract(this.delegate,v)
 }
 add(v:Vector3.ReadonlyVector3):Vector3.MutableVector3{
   return Vector3.add(this.delegate,v)
 }
 static scaleInPlace(vec:Vector3.MutableVector3,v:number,dest:Vector3.MutableVector3,){
   Vector3.scaleToRef(vec,v,dest)
 }
 static scaleToRef(vec:Vector3.MutableVector3,v:number,dest:Vector3.MutableVector3,){
   Vector3.scaleToRef(vec,v,dest)
 }
 
 scale(v:number):Vector3.MutableVector3{
   return Vector3.scale(this.delegate,v)
 }
}
