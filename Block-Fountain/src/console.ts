import { Button } from './button';
import { Entity, GltfContainer, Transform, engine, pointerEventsSystem, InputAction } from '@dcl/sdk/ecs';
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { MessageBus } from '@dcl/sdk/message-bus';

export class Console {
  private consoleEntity: Entity;
  
  constructor(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    parent: Entity,
    model: string,
    targetRing: number,
    button1Model: string,
    button1Anim: string,
    button2Model: string,
    button2Anim: string,
    button3Model: string,
    button3Anim: string,
    messagebus: MessageBus
) {
    
    // Create a new entity
    this.consoleEntity = engine.addEntity();

    // Create a quaternion rotation from Euler angles
    const eulerRotation = Quaternion.fromEulerDegrees(
      rotation.x,
      rotation.y,
      rotation.z
    );


    // Set the entity's transform and parent
    Transform.create(this.consoleEntity, {
       position: position,
       rotation: eulerRotation,
       scale: scale,
       parent: parent
    });

    // Add a 3D model to the entity
    GltfContainer.create(this.consoleEntity, {
        src: model
    });

    const audioClipUrl = 'sounds/click.mp3';

    // Create three button instances
    const button1 = new Button(button1Model, position, rotation, scale, audioClipUrl, button1Anim, parent)
    const button2 = new Button(button2Model, position, rotation, scale, audioClipUrl, button2Anim, parent)
    const button3 = new Button(button3Model, position, rotation, scale, audioClipUrl, button3Anim, parent)

    // Set up pointer events for each button instance
    pointerEventsSystem.onPointerDown(
        {
        entity: button1.buttonEntity,
        opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log("clicked entity")
          button1.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 1 })
        }
    );

    pointerEventsSystem.onPointerDown(
        {
        entity: button2.buttonEntity,
        opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log("clicked entity")
          button2.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 2 })
        }
    );

  pointerEventsSystem.onPointerDown(
        {
        entity: button3.buttonEntity,
        opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        function () {
          console.log("clicked entity")
          button3.press()
          messagebus.emit('fountainAnim', { ring: targetRing, anim: 3 })
        }
    );
  }
}