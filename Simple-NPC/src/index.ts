import { ColliderLayer, engine, executeTask, Material } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'

import { setupUi } from './setupUI'
import { testscript } from './dialogs'
import { createDogeNpc } from './dogeNpc'

export function main() {
  // Still NPC
  let marsha = npc.create(
    {
      position: Vector3.create(9, 1, 8),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(1, 1, 1)
    },
    {
      type: npc.NPCType.CUSTOM,
      model: {
        src: 'assets/scene/Models/marsha.glb'
      },
      faceUser: true,
      portrait: { path: 'images/marsha.png' },
      onActivate: () => {
        npc.talk(marsha, testscript)
      },
      onWalkAway: () => {
        console.log('test on walk away function')
        npc.closeDialogWindow(marsha)
      }
    }
  )

  // walking NPC
  createDogeNpc()

  setupUi()
}
