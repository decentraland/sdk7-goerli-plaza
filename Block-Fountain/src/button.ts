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

  constructor(
    model: string,
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    audioClipUrl: string,
    animationName: string,
    parent?: Entity
  ) {
    // Create new button entity
    const button = engine.addEntity()

    // Calculate button's rotation in Euler degrees
    const eulerRotationButton = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)

    // Add 3D model to button
    GltfContainer.create(button, {
      src: model
    })

    // Add transform to button
    Transform.createOrReplace(button, {
      position: position,
      rotation: eulerRotationButton,
      scale: scale
    })

    // If there's a parent entity, attach the button to it
    if (parent) {
      Transform.createOrReplace(button, {
        position: position,
        rotation: eulerRotationButton,
        scale: scale,
        parent: parent
      })
    }

    // Add audio source to button
    AudioSource.create(button, {
      audioClipUrl: 'sounds/click.mp3',
      loop: false,
      playing: false
    })

    // Add animator to button
    Animator.create(button, {
      states: [
        {
          clip: animationName,
          playing: false,
          loop: false
        }
      ]
    })

    // Initialize the button's properties
    this.buttonEntity = button
    this.buttonClickComponent = new ButtonClickComponent(animationName, audioClipUrl)
  }

  public press(): void {
    // Play the button animation
    Animator.playSingleAnimation(this.buttonEntity, this.buttonClickComponent.clickAnim)

    // Fetch the button's audio source and play it
    const buttonSource = AudioSource.getMutable(this.buttonEntity)
    buttonSource.playing = true
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
      audioClipUrl: 'sounds/click.mp3',
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
