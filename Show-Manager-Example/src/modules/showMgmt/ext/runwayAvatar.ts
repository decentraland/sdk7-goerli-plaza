import * as showMgmt from 'show-manager/dist'
import * as utils from '@dcl-sdk/utils'
import { MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

//FIXME EXTERNALIZE
export let startPositions = [
  { position: Vector3.create(1, 1, 1), scale: Vector3.create(1, 1, 1) },
  { position: Vector3.create(1, 1, 1), scale: Vector3.create(1, 1, 1) }
]

//FIXME EXTERNALIZE
export enum RunwayCoord {
  SOUTH,
  NORTH
}

//model animation templates

//models/whiteRabbit_Anim.glb - Walk,Heart_With_Hands,Idle,Run,Wave

const catwalckCube = engine.addEntity()
MeshRenderer.setBox(catwalckCube)
MeshCollider.setBox(catwalckCube)
Transform.create(catwalckCube, {
  position: Vector3.create(8, 0, 10),
  scale: Vector3.create(3, 1.421, 8)
})

// Coordinates for main Runway Walk
const point1 = Vector3.create(12.9, 0.725, 2.89)
const point2 = Vector3.create(10.13, 0.725, 4.92)
const point3 = Vector3.create(8, 0.725, 6.05)
const point4 = Vector3.create(8.16, 0.725, 13.28)
const path1: Vector3[] = [point1, point2, point3, point4]

// Coordinates for Return Walk
const point5 = Vector3.create(8.16, 0.725, 13.28)
const point6 = Vector3.create(8, 0.725, 6.05)
const point7 = Vector3.create(5.81, 0.725, 5.19)
const point8 = Vector3.create(3.54, 0.725, 3.24)
const path2: Vector3[] = [point5, point6, point7, point8]

const path3: Vector3[] = [point8, point7, point6, point5]
const path4: Vector3[] = [point4, point3, point2, point1]
/*
const path3 = path2.reverse()
const path4 = path1.reverse()*/
//model animation templates

//FIXME EXTERNALIZE
export let runwayPaths: any = {
  //starting south
  0: {
    0: {
      duration: 4,
      path: path1
    },
    1: {
      duration: 4,
      path: path2
    }
  },

  //starting north
  1: {
    0: {
      duration: 8,
      path: path3
    },
    1: {
      duration: 8,
      path: path4
    }
  }
}

//export let portalAnims = ["Flower.Open", "Flower.Close"]

const CLASSNAME = 'RunwayAvatar'
export class RunwayAvatar extends showMgmt.ShowEntityModel {
  id: string
  start: number
  poseIndex = 0
  //FIXME EXTERNALIZE
  poseDuration = [3333, 7500, 9000, 7500, 3333] //30 fps
  runwayPosition = -1
  walkAnim!: string
  poseAnims: any
  portalPosition = -1

  originalStart: number
  originalPosition: Vector3

  constructor(
    id: string,
    model: string,
    invisible: boolean,
    start: number,
    position: Vector3,
    scale: Vector3,
    idelAnim?: string
  ) {
    super(model, {
      idleAnim: idelAnim,
      startInvisible: invisible,
      transform: {
        position: position,
        rotation: Quaternion.Identity(),
        scale: scale
      }
    })
    this.id = id
    this.start = start
    this.originalStart = start
    this.originalPosition = Vector3.clone(position)
  }

  reset() {
    const METHOD_NAME = 'reset'
    console.log(CLASSNAME, METHOD_NAME, this.id, 'ENTRY')
    //TODO move to parent class to reset all stuff
    this.stopAllAnimations()
    this.start = this.originalStart
    this.poseIndex = 0
    this.runwayPosition = -1
    this.portalPosition = -1

    let transform = Transform.createOrReplace(this.entity)

    if (this.originalPosition) {
      transform.position = Vector3.clone(this.originalPosition)
    }

    utils.paths.stopPath(this.entity)
  }

  startModel(sequence: string[]) {
    const METHOD_NAME = 'startModel'
    console.log(CLASSNAME, METHOD_NAME, this.id, 'ENTRY')

    this.appear()

    this.walkAnim = sequence.splice(0, 1).toString()
    this.poseAnims = sequence

    this.runSequence()
  }

  runSequence() {
    const METHOD_NAME = 'runSequence'
    console.log(CLASSNAME, METHOD_NAME, this.id, 'ENTRY')
    this.runwayPosition++
    if (this.runwayPosition < this.poseAnims.length) {
      this.playAnimation(this.walkAnim, false, undefined, undefined, undefined, true)

      console.log(CLASSNAME, METHOD_NAME, this.id, 'RUNWAY POSITION IS', this.runwayPosition, this.poseIndex)

      utils.paths.startSmoothPath(
        this.entity,
        runwayPaths[this.start][this.runwayPosition].path,
        runwayPaths[this.start][this.runwayPosition].duration,
        60,
        true,
        () => {
          if (this.runwayPosition == this.poseAnims.length - 1) {
            console.log(CLASSNAME, METHOD_NAME, this.id, 'remove model from engine')
            this.hide()
            this.stopAllAnimations()
          } else {
            this.playAnimation(this.poseAnims[this.poseIndex], true, undefined, undefined, undefined, true)

            console.log(
              CLASSNAME,
              METHOD_NAME,
              this.id,
              'pausing for pose',
              this.poseIndex,
              this.poseAnims[this.poseIndex],
              this.poseDuration[this.poseIndex]
            )

            const self = this
            utils.timers.setTimeout(function () {
              console.log(
                CLASSNAME,
                METHOD_NAME,
                self.id,
                'pose over',
                self.poseIndex,
                self.poseAnims[self.poseIndex],
                self.poseDuration[self.poseIndex]
              )
              self.poseIndex++
              self.runSequence()
            }, this.poseDuration[this.poseIndex])
          }
        }
      )
    }
  }
}
