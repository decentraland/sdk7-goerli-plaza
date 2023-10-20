import * as showMgmt from 'show-manager/src'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { RunwayAvatar, RunwayCoord, startPositions } from './ext/runwayAvatar'
import { SHOW_MGR } from './showSetup'

export function createShowEntities() {
  //START ADDING syncable objects
  // DJ Table
  const djTable = new showMgmt.ShowEntityModel('models/djTable.glb', {
    idleAnim: 'deckTableOff',
    transform: {
      position: Vector3.create(8, 0.7, 4),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(1, 1, 1)
    }
  })

  // Speakers
  const speakerR = new showMgmt.ShowEntityModel('models/speakers.glb', {
    startInvisible: false,
    idleAnim: 'L0',
    transform: {
      position: Vector3.create(8, 0.45, 8.7),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(1, 1, 1)
    }
  })

  const speakerL = new showMgmt.ShowEntityModel('models/speakers.glb', {
    startInvisible: false,
    idleAnim: 'L0',
    transform: {
      position: Vector3.create(8, 0.45, 8.7),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(-1, 1, 1)
    }
  })

  // parLights
  const parLight = new showMgmt.ShowEntityModel('models/parLight.glb', {
    startInvisible: false,
    idleAnim: 'L0',
    transform: {
      position: Vector3.create(8, 0, 8),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(1, 1, 1)
    }
  })

  // Dot Lights
  const dotLight01 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(12.265, 2.523, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -90),
      scale: Vector3.One()
    }
  })
  const dotLight02 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(12.12, 3.87, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -75),
      scale: Vector3.One()
    }
  })
  const dotLight03 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(11.694, 4.899, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -60),
      scale: Vector3.One()
    }
  })
  const dotLight04 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(11.016, 5.782, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -45),
      scale: Vector3.One()
    }
  })
  const dotLight05 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(10.133, 6.46, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -30),
      scale: Vector3.One()
    }
  })
  const dotLight06 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(9.104, 6.886, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, -15),
      scale: Vector3.One()
    }
  })
  const dotLight07 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(8, 7.032, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.One()
    }
  })
  const dotLight08 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(6.896, 6.886, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 15),
      scale: Vector3.One()
    }
  })
  const dotLight09 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(5.867, 6.46, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 30),
      scale: Vector3.One()
    }
  })
  const dotLight10 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(4.984, 5.782, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 45),
      scale: Vector3.One()
    }
  })
  const dotLight11 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(4.306, 4.899, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 60),
      scale: Vector3.One()
    }
  })
  const dotLight12 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(3.88, 3.87, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 75),
      scale: Vector3.One()
    }
  })
  const dotLight13 = new showMgmt.ShowEntityModel('models/dotLight.glb', {
    idleAnim: 'off',
    startInvisible: false,
    transform: {
      position: Vector3.create(3.735, 2.523, 5.45),
      rotation: Quaternion.fromEulerDegrees(0, 0, 90),
      scale: Vector3.One()
    }
  })

  SHOW_MGR.actionMgr.registerShowEntity('djTable', djTable)
  SHOW_MGR.actionMgr.registerShowEntity('speakerR', speakerR)
  SHOW_MGR.actionMgr.registerShowEntity('speakerL', speakerL)
  SHOW_MGR.actionMgr.registerShowEntity('parLight', parLight)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight01', dotLight01)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight02', dotLight02)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight03', dotLight03)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight04', dotLight04)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight05', dotLight05)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight06', dotLight06)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight07', dotLight07)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight08', dotLight08)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight09', dotLight09)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight10', dotLight10)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight11', dotLight11)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight12', dotLight12)
  SHOW_MGR.actionMgr.registerShowEntity('dotLight13', dotLight13)

  const whiterabbit1 = new RunwayAvatar(
    'model-whiterabbit-1',
    'models/whiteRabbit_Anim.glb',
    true,
    RunwayCoord.SOUTH,
    startPositions[RunwayCoord.SOUTH].position,
    startPositions[RunwayCoord.SOUTH].scale,
    'Idle'
  )
  SHOW_MGR.actionMgr.registerShowEntity(whiterabbit1.id, whiterabbit1)

  const whiterabbit2 = new RunwayAvatar(
    'model-whiterabbit-2',
    'models/whiteRabbit_Anim.glb',
    true,
    RunwayCoord.NORTH,
    startPositions[RunwayCoord.NORTH].position,
    startPositions[RunwayCoord.NORTH].scale,
    'Idle'
  )
  SHOW_MGR.actionMgr.registerShowEntity(whiterabbit2.id, whiterabbit2)

  SHOW_MGR.actionMgr.registerShowEntity(
    'middle_lights',
    new showMgmt.DefineTargetGroup({ name: 'middle_lights', targets: [dotLight04, dotLight05, dotLight06] })
  )

  SHOW_MGR.actionMgr
    .getRegisteredHandler(showMgmt.ShowPauseAllActionHandler.DEFAULT_NAME)
    .addOnProcessListener((action: showMgmt.ActionParams<string>, showActionMgr: showMgmt.ShowActionManager) => {
      //do stuff
      console.log('triggered addOnProcessListener')
    })
}
