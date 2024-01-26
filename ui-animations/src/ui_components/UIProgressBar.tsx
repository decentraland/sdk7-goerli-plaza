import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Callback, EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { UICounter, CustomCounter } from './UICounter'


export class ProgressBar {
  progressValue: number = 0
  loadingProgress: number = 0
  startColor: Color4 = Color4.fromHexString('#ff5511ff')
  endColor: Color4 = Color4.fromHexString('#22bb33ff')
  barColor: Color4 = Color4.fromHexString('#ff5511ff')
  frameImage: string
  barImage: string
  isFull: boolean = false
  onFull: Callback = () => { }

  constructor(_frameImage: string, _barImage: string, _startColor: Color4, _endColor: Color4, _onFull?: Callback) {
    this.startColor = _startColor
    this.endColor = _endColor
    this.frameImage = _frameImage
    this.barImage = _barImage


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
}

export type ProgressBarProps = EntityPropTypes & {
  children?: ReactEcs.JSX.Component[]
  progressBar: ProgressBar
}

export function UIProgressBar(props: ProgressBarProps) {
  return (
    <UiEntity
      // progress bar container
      uiTransform={props.uiTransform}
    >
      <UiEntity
        // counter container
        uiTransform={{
          width: '100%',
          height: '100%',

          positionType: 'absolute',
          position: { top: '-70%' },
          display: 'flex'
        }}
      >
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          positionType: 'absolute',
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: {
            src: props.progressBar.frameImage,
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
  )
}


