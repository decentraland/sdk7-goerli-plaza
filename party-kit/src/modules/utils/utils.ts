import { engine, Entity, Transform, VideoState } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function realDistance(pos1: Vector3, pos2: Vector3): number 
{
    const a = pos1.x - pos2.x
    const b = pos1.y - pos2.y
    const c = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b + c * c)
}

export function shuffle(array: number[]): number[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export function shuffleWithSeed(array:Entity[], seed:number) {                // <-- ADDED ARGUMENT
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed                                     // <-- ADDED LINE
  }

  return array;
}

export function random(seed:number) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}

// Returns a random integer between min and max both included
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
export function randomSign(): -1|1 {
  return (Math.random() < 0.5) ? -1 : 1
}


export function pitchShift(currentPitch:number, shift:number):number{
  return  (Math.pow( 2.0, (shift / 12.0 )) * currentPitch)
}


export function posToUVS(rangeX: [number, number], rangeY: [number, number], atlasSize: { width: number, height: number }) {
  //rangeX [minX, maxX] in px
  //rangeY [minY, maxY] in px
  
  return [
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height
  ]

}

export function posToUVSEmptyBackSide(rangeX: [number, number], rangeY: [number, number], atlasSize: { width: number, height: number }) {
  //rangeX [minX, maxX] in px
  //rangeY [minY, maxY] in px
  
  return [
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
      
      0,0,
      0,0,
      0,0,
      0,0
  ]

}

export function posToUVSDoubleSide(rangeX: [number, number], rangeY: [number, number], atlasSize: { width: number, height: number }) {
  //rangeX [minX, maxX] in px
  //rangeY [minY, maxY] in px
  
  return [
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,

      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
      rangeX[1] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[0]) / atlasSize.height,
      rangeX[0] / atlasSize.width, (atlasSize.height - rangeY[1]) / atlasSize.height,
  ]

}


//Logs the content of the object in a readable format
export function logObject(...obj: any[]) {
    console.log("Log Object:")
    for (const o of obj) {
        console.log(JSON.stringify(o, null, 2))
    }
}


// Deep comparison function for data change detection
export function isEqualObject(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    
    if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        return a.every((val, index) => isEqualObject(val, b[index]));
    }
    
    if (typeof a === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every(key => isEqualObject(a[key], b[key]));
    }
    
    return false;
}

export function isVectorInsideArea(vec: Vector3, areaPt1: Vector3, areaPt2: Vector3) {
    const minX = Math.min(areaPt1.x, areaPt2.x)
    const maxX = Math.max(areaPt1.x, areaPt2.x)
  
    const minZ = Math.min(areaPt1.z, areaPt2.z)
    const maxZ = Math.max(areaPt1.z, areaPt2.z)
  
    return vec.x > minX && vec.x < maxX && vec.z > minZ && vec.z < maxZ
}
  

export async function delay_ms(ms: number){
    return new Promise(resolve => {
        const delaySystemId = Date.now().toString() + Math.random().toString(36).substring(2, 9)
        let timer = 0
        engine.addSystem((dt: number) => {
            timer += dt * 1000
            if(timer >= ms){
                engine.removeSystem(delaySystemId)
                resolve(true)
            }
        }, undefined, delaySystemId)
    })
}

export function delay_ms_cb(ms: number, callback: () => void){
  
  const delaySystemId = Date.now().toString() + Math.random().toString(36).substring(2, 9)
  let timer = 0
  engine.addSystem((dt: number) => {
      timer += dt * 1000
      if(timer >= ms){
          engine.removeSystem(delaySystemId)
          callback()
      }
  }, undefined, delaySystemId)
  return delaySystemId
}

export async function fetchUserData(userId: string){
    const url = 'https://peer-eu1.decentraland.org/lambdas/profiles'
    const body = {"ids":[userId]}

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if(!response.ok) return null

    const data = (await response.json())[0]
    return data
}

export function videoEventToString(videoEvent: VideoState){
    switch(videoEvent){
        case VideoState.VS_BUFFERING:
            return 'BUFFERING'
        case VideoState.VS_PLAYING:
            return 'PLAYING'
        case VideoState.VS_PAUSED:
            return 'PAUSED'
        case VideoState.VS_ERROR:
            return 'ERROR'
        case VideoState.VS_LOADING:
            return 'LOADING'
        case VideoState.VS_NONE:
            return 'NONE'
        case VideoState.VS_READY:
            return 'READY'
        case VideoState.VS_SEEKING:
            return 'SEEKING'
        default:
            return 'UNKNOWN'
    }
}

export function removeExtendedUrn(urn: string): string {
  const urnParts = urn.split(":")
  let newUrn = ""
  for (let i = 0; i < urnParts.length; i++) {
    if(i != 0) newUrn += ":"
    newUrn += urnParts[i]
    if(urnParts[i].length > 40 && urnParts[i].charAt(0) == "0" && urnParts[i].charAt(1) == "x" && urnParts[i+1] != undefined) {
      newUrn += ":"
      newUrn += urnParts[i+1]
      break;
    }
  }
  return newUrn
}

/**
 * Gets the world position of an entity
 * @param entity
 * @returns a vector3 world position
 */
export function getWorldPosition(entity: Entity, position = Vector3.Zero()) {

  const transform = Transform.get(entity)
  //No transform
  if (!transform) return Vector3.Zero()

  let scaledPosition = {...transform.position}
  //Scale relative position by parent scale
  if (transform.parent) {
      const parentTransform = Transform.get(transform.parent)
      if(parentTransform) {
          scaledPosition.x = scaledPosition.x * parentTransform.scale.x
          scaledPosition.y = scaledPosition.y * parentTransform.scale.y
          scaledPosition.z = scaledPosition.z * parentTransform.scale.z
      }
  }
  //Update position
  position.x = position.x + scaledPosition.x
  position.y = position.y + scaledPosition.y
  position.z = position.z + scaledPosition.z

  //No more parents
  if (!transform.parent) return position;

  //Get world position of the parent
  return getWorldPosition(transform.parent, position)
}

export function QuaternionInvert(q:Quaternion):Quaternion{
  let conjugate = Quaternion.lengthSquared(q)
  return Quaternion.create(-q.x/conjugate, -q.y/conjugate, -q.z/conjugate, q.w/conjugate)
}

export function DegToRad(deg:number):number{
  return deg * Math.PI / 180
}

export function RadToDeg(rad:number):number{
  return rad * 180 / Math.PI
}

// Clamp a value between a minimum and a maximum
export function clamp(value:number, min:number, max:number):number{
  return Math.max(min, Math.min(value, max))
}
// Linear interpolation between two values constrained between a and b
export function clampedLerp(a:number, b:number, t:number):number{
  return clamp(a + (b - a) * t, a, b)
}

// export async function checkWearables(wearableUrn: string) {
//   const playerData = getPlayer()

//   console.log('has wearable. playerData:', JSON.stringify(playerData))

//   if (!playerData || !playerData.wearables) return false

//   console.log('has wearable. check urn:', wearableUrn)
//   console.log('has wearable. playerData.wearables:', JSON.stringify(playerData.wearables))
//   if(playerData.wearables.includes(wearableUrn)) return true
//   return false
// }
