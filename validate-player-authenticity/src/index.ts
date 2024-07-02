import { InputAction, executeTask, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Scene } from './environment'
import { signedFetch } from '~system/SignedFetch'
import { setupUi } from './ui'
import * as ui from 'dcl-ui-toolkit'

export function main() {
  const scene = new Scene()

  setupUi()

  pointerEventsSystem.onPointerDown(
    {
      entity: scene.theFountainOfBrokenDreams,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Is your heart pure?' }
    },
    () => {
      executeTask(async () => {
        try {
          let response = await signedFetch({
            url: 'http://localhost:3002/check-validity',
            init: {
              headers: { 'Content-Type': 'application/json' },
              method: 'GET'
            }
          })

          if (!response.body) {
            throw new Error('Invalid response')
          }

          let json = await JSON.parse(response.body)

          console.log('Response received: ', json)

          if (!json.valid) {
            throw new Error('Does not pass validation check')
          }

          scene.passedValidation()
          const announce = ui.createComponent(ui.Announcement, {
            value: 'Your intentions are pure',
            duration: 5,
            startHidden: false
          })
          announce.show()
        } catch (error) {
          console.log(error)

          scene.failedValidation()
          const announce = ui.createComponent(ui.Announcement, {
            value: 'Your dark schemes are not welcome here, be gone!',
            duration: 5,
            startHidden: false
          })
        }
      })
    }
  )
}
