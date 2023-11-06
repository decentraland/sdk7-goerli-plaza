import * as showMgmt from 'show-manager/src'
import { Entity, Font, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'
import { VideoScreens } from './videoScreens'

export abstract class ShowStatusDisplays {
  static messageBoard: Entity
  static currentShow: Entity

  static Initialise() {
    ShowStatusDisplays.messageBoard = engine.addEntity()
    Transform.create(ShowStatusDisplays.messageBoard, {
      parent: VideoScreens.S1,
      position: Vector3.create(0, 0, 0.2),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(0.25, (0.25 / 9) * 16, 0.25)
    })
    TextShape.create(ShowStatusDisplays.messageBoard, {
      text: '',
      fontSize: 1.6,
      font: Font.F_SERIF,
      textWrapping: true,
      width: 1.8,
      outlineColor: Color3.Black(),
      outlineWidth: 0.05
    })

    /// current show
    ShowStatusDisplays.currentShow = engine.addEntity()
    Transform.create(ShowStatusDisplays.currentShow, {
      position: Vector3.create(8, 7.7, 8),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2, 2, 2)
    })
    TextShape.create(ShowStatusDisplays.currentShow, {
      text: '',
      fontSize: 4,
      textWrapping: true,
      width: 15,
      outlineColor: Color3.Black(),
      outlineWidth: 0.2
    })
  }

  static setBoardMessage(text: string) {
    let messageText = TextShape.getMutableOrNull(ShowStatusDisplays.messageBoard)
    if (messageText) {
      messageText.text = text
    }
  }

  static hideBoard() {
    let messageText = TextShape.getMutableOrNull(ShowStatusDisplays.messageBoard)
    if (messageText) {
      messageText.text = ''
    }
    CountDownTimer.terminate()
  }

  static startNextShowCounter(runOfShow: showMgmt.ShowType[]) {
    console.log('STARTING NEW COUNTER, ', runOfShow)
    let currentTime = Date.now() / 1000
    let nextShow: showMgmt.ShowType | undefined
    for (let show of runOfShow) {
      console.log(show.artist, ' STARTS IN ', show.startTime ? show.startTime - currentTime : '---')
      if (show && show.startTime && show.startTime - currentTime > 0) {
        if (nextShow && nextShow !== undefined && nextShow.startTime) {
          if (show.startTime - currentTime < nextShow.startTime - currentTime) {
            nextShow = show
          }
        } else {
          nextShow = show
        }
      }
    }

    if (CountDownTimer.instance) {
      CountDownTimer.instance = null
    }

    if (!nextShow) {
      this.setBoardMessage("That's all for today on this stage. See you tomorrow!")
      return
    }

    console.log(
      'IDENTIFIED NEXT SHOW, ',
      nextShow,
      ' STARTING IN ',
      nextShow.startTime ? nextShow.startTime - currentTime : '---'
    )

    // contdown w nextShow

    CountDownTimer.createAndAddToEngine(nextShow)

    // TODO if last show over "return tomorrow"
  }

  static setArtistName(name?: string) {
    let currentShowText = TextShape.getMutableOrNull(ShowStatusDisplays.currentShow)
    if (currentShowText) {
      if (name && name !== undefined) {
        currentShowText.text = name
      } else {
        currentShowText.text = ''
      }
    }
  }

  static hideArtistName() {
    let currentShowText = TextShape.getMutableOrNull(ShowStatusDisplays.currentShow)
    if (currentShowText) {
      currentShowText.text = ''
    }
  }
}

export class CountDownTimer {
  static instance: CountDownTimer | null = null

  timeToEvent = 60 * 5
  secondsTimer = 1
  artistName: string = ''
  constructor(show: showMgmt.ShowType) {
    console.log('SHOW STARTS AT ', show.startTime, ' NOW IS ', Date.now() / 1000)
    if (!show) throw new Error('show must not be null')
    if (!show.startTime) throw new Error('show.startTime must not be null')
    this.timeToEvent = show.startTime - Date.now() / 1000
    this.artistName = show.artist ? show.artist : ''
  }

  static createAndAddToEngine(show: showMgmt.ShowType): CountDownTimer {
    if (CountDownTimer.instance == null) {
      CountDownTimer.instance = new CountDownTimer(show)
      engine.addSystem(CountDownTimer.update)
    }
    return CountDownTimer.instance
  }

  static terminate() {
    if (CountDownTimer.instance) {
      engine.removeSystem(CountDownTimer.update)
      CountDownTimer.instance = null
    }
  }

  static update(dt: number) {
    if (CountDownTimer.instance === undefined || CountDownTimer.instance === null) return

    CountDownTimer.instance.update(dt)
  }

  update(dt: number) {
    if (this.timeToEvent > 0) {
      this.secondsTimer -= dt
      this.timeToEvent -= dt

      if (this.secondsTimer < 0) {
        this.secondsTimer = 1
        let timeAsString = secondsToString(this.timeToEvent)
        ShowStatusDisplays.setBoardMessage(this.artistName + '\nstarts in just\n' + timeAsString)
      }
    } else {
      console.log('show about to start!')
      ShowStatusDisplays.hideBoard()
    }
  }
}

function secondsToString(rawSeconds: number) {
  let seconds = (Math.floor(rawSeconds) % 60).toString()
  let minutes = (Math.floor(rawSeconds / 60) % 60).toString()
  let hours = Math.floor(rawSeconds / 3600).toString()

  if (seconds.length == 1) {
    seconds = '0' + seconds
  }

  if (minutes.length == 1) {
    minutes = '0' + minutes
  }

  return hours + ':' + minutes + ':' + seconds
}
