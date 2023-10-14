import { engine, GltfContainer, Transform, InputAction, pointerEventsSystem, TransformTypeWithOptionals, AudioSource, Entity, PointerEvents } from '@dcl/sdk/ecs'
import * as ui from 'dcl-ui-toolkit'
import * as utils from '@dcl-sdk/utils'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'

const timeLimit = 5000
const restartTime = 3000

export class ClickableDog {
  sessionActive: boolean = false
  readyToPlay: boolean = true

  clickCounter: ui.UICounter
  dogStatue: Entity
  clickSound: Entity
  bellSound: Entity

  constructor(
    transform: TransformTypeWithOptionals,
    endGameCallback: (count: number) => void
  ) {
    ReactEcsRenderer.setUiRenderer(ui.render)

    this.clickCounter = ui.createComponent(ui.UICounter, { 
      value: 0,
      startHidden: false,
    })

    this.dogStatue = engine.addEntity()
    GltfContainer.create(this.dogStatue, {
      src: 'models/PillarDog_01/PillarDog_01.glb'
    })
    Transform.create(this.dogStatue, transform)

    this.bellSound = engine.addEntity()
    AudioSource.create(this.bellSound, {
      audioClipUrl: 'sounds/bell.mp3',
      playing: false,
      loop: false
    })

    this.clickSound = engine.addEntity()
    AudioSource.create(this.clickSound, {
      audioClipUrl: 'sounds/click.mp3',
      playing: false,
      loop: false
    })

    pointerEventsSystem.onPointerDown(
      { entity: this.dogStatue, opts: { button: InputAction.IA_POINTER, hoverText: 'Click the Dog!' } },
      () => {
        if (!this.readyToPlay) {
          return
        }

        if (!this.sessionActive) {
          this.clickCounter.set(0)
          this.sessionActive = true
  
          utils.timers.setTimeout(() => {
            this.endGame()
            endGameCallback(this.clickCounter.read())
  
            utils.timers.setTimeout(() => {
              this.restartGame()
            }, restartTime)
  
          }, timeLimit)
        }

        this.processClick()
      }
    )
  }

  playSound(entity: Entity) {
    const audioSource = AudioSource.getMutable(entity)
    audioSource.playing = true
  }

  processClick() {
    this.clickCounter.increase()
    this.playSound(this.clickSound)
  }

  endGame() {
    this.readyToPlay = false
    this.sessionActive = false

    const hoverFeedback = PointerEvents.getMutable(this.dogStatue)
    hoverFeedback.pointerEvents[0].eventInfo!.hoverText = 'Time up!'

    this.playSound(this.bellSound)
  }

  restartGame() {
    this.readyToPlay = true

    const hoverFeedback = PointerEvents.getMutable(this.dogStatue)
    hoverFeedback.pointerEvents[0].eventInfo!.hoverText = 'Click the Dog!'
  }
}
