import { InputAction, executeTask, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Scene } from './environment'
import { signedFetch } from '~system/SignedFetch'
import { Announcement } from './ui'

export function main() {
  const scene = new Scene()
  const ui = new Announcement()

  pointerEventsSystem.onPointerDown(
    { entity: scene.theFountainOfBrokenDreams, opts: { button: InputAction.IA_POINTER, hoverText: "Is your heart pure?" } },
    () => {
      executeTask(async () => {
        try {
          let response = await signedFetch({ 
            url: 'http://localhost:8080/check-validity', 
            init: {
              headers: { "Content-Type": "application/json" },
              method: "GET"
            }
          })

          if (!response.body) {
            throw new Error("Invalid response")
          }
      
          let json = await JSON.parse(response.body)
      
          console.log("Response received: ", json)

          if (!json.valid) {
            throw new Error("Does not pass validation check")
          }
          
          scene.passedValidation()
          ui.passedAnnouncement.show()

        } catch(error) {
          console.log(error)
          
          scene.failedValidation()
          ui.failedAnnouncement.show()
        }
      })
    }
  )
}
