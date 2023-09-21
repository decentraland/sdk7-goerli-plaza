import { engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { triggerEmote } from '~system/RestrictedActions'
import * as utils from '@dcl-sdk/utils'

export let danceAreas: any = [
  {
    transform: {
      position: Vector3.create(8, 0.65, 8),
      rotation: Quaternion.Identity(),
      scale: Vector3.One()
    },
    type: 'all'
  }
]

export function createDanceAreas() {
  for (let i in danceAreas) {
    const area = utils.addTestCube(
      {
        position: danceAreas[i].transform.position,
        rotation: danceAreas[i].transform.rotation,
        scale: danceAreas[i].transform.scale
      },
      undefined,
      undefined,
      Color4.create(0, 0, 0, 0),
      true,
      true
    )

    let dsystem = new DanceSystem(danceAreas[i].type)

    utils.triggers.addTrigger(
      area,
      utils.NO_LAYERS,
      utils.LAYER_1,
      [{ type: 'sphere', radius: 6.5 }],
      function (otherEntity) {
        console.log('in dance area')
        dsystem.active = true
      },
      function (otherEntity) {
        dsystem.active = false
      }
    )
  }
}

export class DanceSystem {
  static instances: DanceSystem[] = []

  active: boolean = false
  danceLength = 11
  timer = 2
  routine: string = ''

  routines: string[] = ['robot', 'tik', 'tektonik', 'hammer', 'headexplode', 'handsair', 'disco', 'dab']

  constructor(routine: string) {
    this.routine = routine

    if (DanceSystem.instances.length < 1) {
      engine.addSystem(DanceSystem.update)
    }
    DanceSystem.instances.push(this)
  }

  update(dt: number) {
    if (!this.active) return

    if (this.timer > 0) {
      this.timer -= dt
    } else {
      this.timer = this.danceLength
      if (this.routine && this.routine == 'all') {
        let rand = Math.floor(Math.random() * (this.routines.length - 1))
        if (this.routines[rand]) {
          triggerEmote({ predefinedEmote: this.routines[rand] })
        } else {
          console.log('warn array out of range')
        }
      } else {
        if (this.routine) triggerEmote({ predefinedEmote: this.routine })
      }
    }
  }

  static update(dt: number) {
    for (let instance of DanceSystem.instances) {
      instance.update(dt)
    }
  }
}
