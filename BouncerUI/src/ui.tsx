import {
  engine,
  executeTask,
  InputAction,
  inputSystem,
  PointerEventType,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { getUserData } from '~system/UserIdentity'
import { MessageBus } from '@dcl/sdk/message-bus'
import { movePlayerTo } from '~system/RestrictedActions'

import * as ui from 'dcl-ui-toolkit'


const sceneMessageBus = new MessageBus()

var authorized: boolean = false
// ADD ADMINS HERE 
export const allowListedIds = ['SceneAdmin', 'Dogman', 'Doggo']




export function setupUi() {
  checkAuth()
  ReactEcsRenderer.setUiRenderer(ui.render)
  

  engine.addSystem(() => {
    if(authorized){
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
      annPrompt.show()
    }
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
    
      bouncePrompt.show()
    }
  }
  })
  
}






const annPrompt = ui.createComponent(ui.FillInPrompt, {
  title: 'Announcement?',
  onAccept: (value: string) => {
    console.log('accepted values:', value)
    sceneMessageBus.emit('announcement',{val:value})
    annPrompt.hide()
  },
})

const bouncePrompt = ui.createComponent(ui.FillInPrompt, {
  title: 'Kick Player?',
  onAccept: (value: string) => {
    console.log('accepted values:', value)
    sceneMessageBus.emit('kick', {val:value})
    bouncePrompt.hide()
  },
})




export async function checkAuth() {
  const userData = await getUserData({})

  if (!userData || !userData.data || !userData.data.displayName) return false

  console.log('name: ', userData.data.displayName)
  console.log('Aproved? ', authorized)
  for (const id of allowListedIds) {
    if (userData && id === userData.data.displayName) {
      authorized = true
      break
    }
  }

  
} 








sceneMessageBus.on('kick', async  (info: any) => {
  executeTask(async () => {
    const userData = await getUserData({})
    if (!userData || !userData.data || !userData.data.displayName) return false

      if (info.val === userData.data.displayName) {
        console.log('player kicked')
        movePlayerTo({  newRelativePosition: Vector3.create(8, 8, 8) }).catch((error) => console.log(error))
      }
    })
  })
  



sceneMessageBus.on('announcement', (info: any) => {
  console.log('announcement', info)
  const announcement = ui.createComponent(ui.Announcement, {
    value: info.val,
    startHidden: false,
    duration: 5,
    color: Color4.Red(),
    size: 100,
    xOffset: 0,
    yOffset: 0,
  })
  
})