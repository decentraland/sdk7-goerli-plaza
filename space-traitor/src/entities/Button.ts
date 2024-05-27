import { engine, GltfContainer, Transform, TextShape, AudioSource, removeEntityWithChildren, MeshRenderer, Material, Font, InputAction, PointerEventType, PointerEvents, inputSystem, Animator, Entity, TransformType, MeshCollider } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export class Button {
  public button = engine.addEntity()
  private animation: any
  action: () => void
  constructor(
    model: string,
    action: () => void,
    caption: string,
    position: Vector3,
    rotation: Quaternion,
    scale?: Vector3,
  ) {
    MeshCollider.setBox(this.button)
    if(scale === undefined){
        scale = Vector3.create(1,1,1)
    }
    Transform.createOrReplace(this.button, {
      position: position,
      scale: scale,
      rotation: rotation
    })
    GltfContainer.createOrReplace(this.button,{ src: model })
    Animator.createOrReplace(this.button,{
      states: [{
        clip: 'trigger',
        playing: true,
        loop: false,
        weight: 0.02,
        speed: 1.7
      }
      ]
    })
    PointerEvents.createOrReplace(this.button, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_POINTER,
            showFeedback: true,
            hoverText: caption,
            maxDistance: 5
          }
        }
      ]
    })
    engine.addSystem(() => {
      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN,this.button)) {
        action()
        this.play()
      }
    })

    this.action = action
  }

  play() {
    AudioSource.createOrReplace(this.button, {
      audioClipUrl: 'sounds/click.mp3',
      loop: false,
      playing: true,
    })
    Animator.stopAllAnimations(this.button,true) 
    Animator.playSingleAnimation(this.button,this.animation)
  }
}