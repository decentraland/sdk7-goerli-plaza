/**     TARGET STYLE DATA
    this file contains all the defs for available target styles. targets are
    made up of several sub-components (display objects & collision objects) of
    different types (static & rotating)
*/

/** defines all available styles */
export enum PLATFORM_STYLE_TYPE {
  STATIC_RED = 0,
  STATIC_GREEN = 1,
  STATIC_BLUE = 2,
  ROTATING_RED = 3,
  ROTATING_GREEN = 4,
  ROTATING_BLUE = 5
}

//ensure standardization between all data objects
/** defines an unmoving target pice */
export interface TargetPieceStaticDataObject {
  path: string //display model path
  position: { x: number; y: number; z: number } //position
}
/** defines a rotating target piece */
export interface TargetPieceRotatingDataObject {
  path: string //display model path
  position: { x: number; y: number; z: number } //position
  rotationSpeed: { x: number; y: number; z: number } //all rotation speeds
}
/** defines an entire target */
export interface TargetStyleDataObject {
  staticPieces: TargetPieceStaticDataObject[] | undefined
  rotatingPieces: TargetPieceRotatingDataObject[] | undefined
}

/** registry of all platform styles  */
export const TargetStyleData: TargetStyleDataObject[] = [
  //static targets
  //  red
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-static-red.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: undefined
  },
  //  green
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-static-green.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: undefined
  },
  //  blue
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-static-blue.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: undefined
  },
  //rotating
  //  red
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-stand-red.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-billet-red.glb',
        position: { x: 0, y: 1.88, z: 0 },
        rotationSpeed: { x: 10, y: 0, z: 0 }
      }
    ]
  },
  //  green
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-stand-green.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-billet-green.glb',
        position: { x: 0, y: 2.8, z: 0 },
        rotationSpeed: { x: 0, y: 10, z: 0 }
      }
    ]
  },
  //  blue
  {
    staticPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-stand-blue.glb',
        position: { x: 0, y: 0, z: 0 }
      }
    ],
    rotatingPieces: [
      {
        path: 'assets/scene/Models/shooting-range-advanced/target-rotating-billet-blue.glb',
        position: { x: 0, y: 2.25, z: -1 },
        rotationSpeed: { x: 0, y: 0, z: 10 }
      }
    ]
  }
]
