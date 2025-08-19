import { Button } from './button'
import { Entity, GltfContainer, Transform, engine, pointerEventsSystem, InputAction } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { MessageBus } from '@dcl/sdk/message-bus'

export class Console {
  private consoleEntity: Entity

  constructor(
    entity: Entity,
    targetRing: number,
    button1Name: string,
    button2Name: string,
    button3Name: string,
    messagebus: MessageBus
  ) {
    // Use the provided entity
    this.consoleEntity = entity

    // Get button entities by name
    const button1Entity = engine.getEntityOrNullByName(button1Name)
    const button2Entity = engine.getEntityOrNullByName(button2Name)
    const button3Entity = engine.getEntityOrNullByName(button3Name)

    if (button1Entity) {
      // Set up pointer events for button 1
      pointerEventsSystem.onPointerDown(
        {
          entity: button1Entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log('clicked entity')
          // Play button animation and sound
          const button1 = new Button(button1Entity)
          button1.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 1 })
        }
      )
    }

    if (button2Entity) {
      // Set up pointer events for button 2
      pointerEventsSystem.onPointerDown(
        {
          entity: button2Entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log('clicked entity')
          // Play button animation and sound
          const button2 = new Button(button2Entity)
          button2.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 2 })
        }
      )
    }

    if (button3Entity) {
      // Set up pointer events for button 3
      pointerEventsSystem.onPointerDown(
        {
          entity: button3Entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log('clicked entity')
          // Play button animation and sound
          const button3 = new Button(button3Entity)
          button3.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 3 })
        }
      )
    }
  }
}
