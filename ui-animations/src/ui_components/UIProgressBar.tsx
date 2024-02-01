import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Callback, EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { UICounter, CustomCounter } from './UICounter'


export class ProgressBar {
  progressValue: number = 0
  loadingProgress: number = 0
  startColor: Color4 = Color4.fromHexString('#ff5511ff')
  endColor: Color4 = Color4.fromHexString('#22bb33ff')
  barColor: Color4 = Color4.fromHexString('#ff5511ff')
  backgroundImage: string
  barImage: string
  forgroundImage: string
  isForgroundSet: boolean = false
  useColor: boolean = false
  isFull: boolean = false
  visible: boolean = false
  onFull: Callback = () => { }

  constructor(_frameImage: string, _barImage: string, _startColor: Color4, _endColor: Color4, _useColor: boolean, _onFull?: Callback, _forgroundImage?: string) {
    this.startColor = _startColor
    this.endColor = _endColor
    this.backgroundImage = _frameImage
    this.barImage = _barImage

    this.forgroundImage = _forgroundImage ? _forgroundImage : ''
    this.isForgroundSet = _forgroundImage ? true : false

    this.useColor = _useColor

    if (_onFull) {
      this.onFull = _onFull
    }
  }
  setProgressBar(value: number) {
    this.progressValue = value

    if (this.progressValue > 1) {
      this.progressValue = 1
      if (!this.isFull) {
        this.isFull = true
        this.onFull()
      }
    }
    else {
      this.isFull = false
    }
    this.setProgressValues(this.progressValue)
  }

  setProgressValues(value: number) {
    this.loadingProgress = (0.1 + value * 0.9) * 100
    this.barColor = Color4.lerp(this.startColor, this.endColor, value)
  }

  incrementProgressBar(deltaValue: number) {
    this.progressValue += deltaValue
    if (this.progressValue > 1) {
      this.progressValue = 1

      if (!this.isFull) {
        this.isFull = true
        this.onFull()
      }
    }
    else {
      this.isFull = false
    }
    this.setProgressValues(this.progressValue)
  }

  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }

  toggle() {
    this.visible = !this.visible
  }
}

export type ProgressBarProps = EntityPropTypes & {
  children?: ReactEcs.JSX.Component[]
  progressBar: ProgressBar
}

export function UIImageBar(props: ProgressBarProps) {
  return (
    <UiEntity
      // progress bar container
      uiTransform={props.uiTransform}
    >
      <UiEntity uiTransform={{
        width: '100%',
        height: '100%',
        display: props.progressBar.visible ? 'flex' : 'none',
        positionType: 'absolute'
      }}>


        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            positionType: 'absolute',
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: props.progressBar.backgroundImage,
            },
            uvs: [

              1, 0,
              1, 1,
              0, 1,
              0, 0,
            ]

          }}
        >
          <UiEntity
            //loading bar scaling edge aprt
            uiTransform={{
              height: ((props.progressBar.progressValue + 0.02) * 100 + '%') as PositionUnit,
              //height: '100%',
              width: '100%',
              positionType: 'absolute',
              position: { bottom: '0%' },


            }}
            uiBackground={{
              color: props.progressBar.useColor ? Color4.create(props.progressBar.barColor.r - 0.3, props.progressBar.barColor.g - 0.3, props.progressBar.barColor.b - 0.3, props.progressBar.barColor.a) : undefined,
              textureMode: 'stretch',
              texture: {
                src: props.progressBar.barImage
              },
              uvs: [
                1, 0,
                1, props.progressBar.progressValue + 0.02,
                0, props.progressBar.progressValue + 0.02,
                0, 0,
              ]

            }}
          ></UiEntity>

          <UiEntity
            //loading bar scaling part
            uiTransform={{
              height: (props.progressBar.progressValue * 100 + '%') as PositionUnit,
              //height: '100%',
              width: '100%',
              positionType: 'absolute',
              position: { bottom: '0%' },


            }}
            uiBackground={{
              color: props.progressBar.useColor ? props.progressBar.barColor : undefined,
              textureMode: 'stretch',
              texture: {
                src: props.progressBar.barImage
              },
              uvs: [
                1, 0,
                1, props.progressBar.progressValue,
                0, props.progressBar.progressValue,
                0, 0,
              ]

            }}
          >

          </UiEntity>
          <UiEntity
            //loading bar FOREGROUND
            uiTransform={{
              width: '100%',
              height: '100%',
              positionType: 'absolute',
              display: props.progressBar.isForgroundSet ? 'flex' : 'none'
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: {
                src: props.progressBar.forgroundImage,
              },
              uvs: [
                0, 0,
                1, 0,
                1, 1,
                0, 1
              ]

            }}
          ></UiEntity>
        </UiEntity>
        {props.children}
      </UiEntity>
    </UiEntity>
  )
}
export function UIProgressBar(props: ProgressBarProps) {
  return (
    <UiEntity
      // progress bar container
      uiTransform={props.uiTransform}
    >
      <UiEntity uiTransform={{
        width: '100%',
        height: '100%',
        display: props.progressBar.visible ? 'flex' : 'none'
      }}>


        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            positionType: 'absolute',
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: {
              src: props.progressBar.backgroundImage,
            },
            textureSlices: {
              top: 0.49,
              bottom: 0.49,
              left: 0.49,
              right: 0.49
            }
          }}
        />

        <UiEntity
          //loading bar scaling part
          uiTransform={{
            width: (props.progressBar.loadingProgress + '%') as PositionUnit,
            height: '100%',
            minWidth: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center'
          }}
          uiBackground={{
            color: props.progressBar.barColor,
            textureMode: 'nine-slices',
            texture: {
              src: props.progressBar.barImage
            },
            textureSlices: {
              top: 0.49,
              bottom: 0.49,
              left: 0.49,
              right: 0.49
            },
          }}
        >
        </UiEntity>
        {props.children}
      </UiEntity>
    </UiEntity>
  )
}


