import { Entity, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { create, followPath, talk } from 'dcl-npc-toolkit'
import { FollowPathData, NPCType } from 'dcl-npc-toolkit/dist/types'
import { dogeDialog } from './dialogs'

let doge: Entity

export function createDogeNpc() {
  const offsetpath = 5
  let dogePathPoints = [
    Vector3.create(offsetpath, 0.24, offsetpath),
    Vector3.create(offsetpath, 0.24, 16 - offsetpath),
    Vector3.create(16 - offsetpath, 0.24, 16 - offsetpath),
    Vector3.create(16 - offsetpath, 0.24, offsetpath)
  ]
  let dogePath: FollowPathData = {
    path: dogePathPoints,
    totalDuration: dogePathPoints.length * 6,
    loop: true
    // curve: true,
  }

  doge = create(
    {
      position: Vector3.clone(dogePathPoints[0]),
      scale: Vector3.create(2, 2, 2)
    },
    {
      type: NPCType.CUSTOM,
      model: 'assets/scene/Models/dogeNPC_anim4.glb', //'assets/scene/Models/marsha.glb',//'assets/scene/Models/Placeholder_NPC_02.glb',
      onActivate: () => {
        console.log('doge.NPC activated!')
        talk(doge, dogeDialog)
      },
      onWalkAway: () => {
        console.log('NPC', 'Doge', 'on walked away')
        followPath(doge, dogePath)
      },
      idleAnim: 'Idle',
      walkingAnim: 'Walk',
      faceUser: true, //continue to face user???
      portrait: {
        path: 'images/doge.png',
        height: 300,
        width: 300,
        offsetX: -10,
        offsetY: 0,
        section: { sourceHeight: 256, sourceWidth: 256 }
      },
      darkUI: true,
      coolDownDuration: 3,
      hoverText: 'WOW',
      onlyETrigger: true,
      onlyClickTrigger: false,
      onlyExternalTrigger: false,
      reactDistance: 5,
      continueOnWalkAway: false
      //dialogCustomTheme: RESOURCES.textures.dialogAtlas,
    }
  )
  followPath(doge, dogePath)
}
