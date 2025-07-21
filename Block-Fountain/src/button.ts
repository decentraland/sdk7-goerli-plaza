import {
  engine,
  Animator,
  Transform,
  Entity,
  GltfContainer,
  AudioSource,
  CameraType,
  QuaternionType
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ECS6ComponentAudioSource } from '~system/EngineApi'

export class ButtonClickComponent {
  constructor(public clickAnim: string, public audioSource: string) {}
}

export class Button {
  private buttonClickComponent: ButtonClickComponent
  public buttonEntity: Entity

  constructor(entity: Entity) {
    // Use the provided entity
    this.buttonEntity = entity

    // Get the animator component to find the animation name
    const animator = Animator.get(this.buttonEntity)
    if (animator && animator.states.length > 0) {
      const animationName = animator.states[0].clip
      this.buttonClickComponent = new ButtonClickComponent(animationName, 'assets/scene/assets/scene/Audio/click.mp3')
    } else {
      // Fallback to default animation name
      this.buttonClickComponent = new ButtonClickComponent('ButtonA_Action', 'assets/scene/assets/scene/Audio/click.mp3')
    }
  }

  public press(): void {
    // Play the button animation
    Animator.playSingleAnimation(this.buttonEntity, this.buttonClickComponent.clickAnim)

    // Fetch the button's audio source and play it
    AudioSource.playSound(this.buttonEntity, this.buttonClickComponent.audioSource)
  }
}

export class Switch {
  private onAnimState: string
  private offAnimState: string
  private audioSource: ECS6ComponentAudioSource
  private switchEntity: Entity

  constructor(
    model: string,
    position: Vector3,
    rotation: Vector3,
    onAnim: string,
    offAnim: string,
    audioClipUrl: string,
    parent?: Entity
  ) {
    // Create new switch entity
    this.switchEntity = engine.addEntity()

    // Calculate switch rotation in Euler degrees
    const eulerRotationSwitch = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)

    // Add a 3D model to the switch
    GltfContainer.create(this.switchEntity, {
      src: model
    })

    // Add a transform to the switch
    Transform.createOrReplace(this.switchEntity, {
      position: position,
      rotation: eulerRotationSwitch
    })

    // If there's a parent entity, attach the switch to it
    if (parent) {
      Transform.createOrReplace(this.switchEntity, {
        position: position,
        rotation: eulerRotationSwitch,
        parent: parent
      })
    }

    // Create audio source for switch
    this.audioSource = AudioSource.create(this.switchEntity, {
      audioClipUrl: 'assets/scene/assets/scene/Audio/click.mp3',
      loop: false,
      playing: false
    })

    // Create animator for the switch with two states
    Animator.createOrReplace(this.switchEntity, {
      states: [
        {
          clip: onAnim,
          playing: false,
          loop: false
        },
        {
          clip: offAnim,
          playing: false,
          loop: false
        }
      ]
    })

    // Initialize the switch's properties
    this.onAnimState = onAnim
    this.offAnimState = offAnim
  }

  public toggle(value: boolean): void {
    // Determine which animation to play based on value
    const animationClipName = value ? 'onAnim' : 'offAnim'

    // Stop any currently playing animation
    Animator.stopAllAnimations(this.switchEntity)

    // Play the selected animation
    Animator.playSingleAnimation(this.switchEntity, animationClipName)

    // Start playing the audio source for the switch
    const audioSource = this.audioSource
    audioSource.playing = true
    audioSource.loop = false
  }
}
