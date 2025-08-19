import {
  engine,
  GltfContainer,
  Transform,
  InputAction,
  pointerEventsSystem,
  TransformTypeWithOptionals,
  AudioSource,
  Entity,
  PointerEvents
} from '@dcl/sdk/ecs'
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
  soundPlayer: Entity

  constructor(transform: TransformTypeWithOptionals, endGameCallback: (count: number) => void) {
    ReactEcsRenderer.setUiRenderer(ui.render)

    this.clickCounter = ui.createComponent(ui.UICounter, {
      value: 0,
      startHidden: false
    })

    this.dogStatue = engine.addEntity()
    GltfContainer.create(this.dogStatue, {
      src: 'assets/scene/Models/PillarDog_01/PillarDog_01.glb'
    })
    Transform.create(this.dogStatue, transform)

    this.soundPlayer = engine.addEntity()
    AudioSource.create(this.soundPlayer, {
      audioClipUrl: 'assets/scene/Audio/bell.mp3'
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

  processClick() {
    this.clickCounter.increase()
    AudioSource.playSound(this.soundPlayer, 'assets/scene/Audio/click.mp3')
  }

  endGame() {
    this.readyToPlay = false
    this.sessionActive = false

    const hoverFeedback = PointerEvents.getMutable(this.dogStatue)
    hoverFeedback.pointerEvents[0].eventInfo!.hoverText = 'Time up!'

    AudioSource.playSound(this.soundPlayer, 'assets/scene/Audio/bell.mp3')
  }

  restartGame() {
    this.readyToPlay = true

    const hoverFeedback = PointerEvents.getMutable(this.dogStatue)
    hoverFeedback.pointerEvents[0].eventInfo!.hoverText = 'Click the Dog!'
  }
}
