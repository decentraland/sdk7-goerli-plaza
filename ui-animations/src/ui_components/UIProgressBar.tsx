import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { UICounter, CustomCounter } from './UICounter'


export class ProgressBar {
  progressValue: number = 0
  loadingProgress: number = 0
  startColor: Color4 = Color4.fromHexString('#ff5511ff')
  endColor: Color4 = Color4.fromHexString('#22bb33ff')
  barColor: Color4 = Color4.fromHexString('#ff5511ff')
  constructor(_startColor: Color4, _endColor: Color4) {
    this.startColor = _startColor
    this.endColor = _endColor
  }
  setProgressBar(value: number) {
    this.progressValue = value

    if (this.progressValue > 1) {
      this.progressValue = 0
    }
    this.setProgressValues(this.progressValue)
  }

  setProgressValues(value: number) {
    this.loadingProgress = (0.2 + value * 0.8) * 100
    this.barColor = Color4.lerp(this.startColor, this.endColor, value)
  }

  incrementProgressBAr(deltaValue: number) {
    this.progressValue += deltaValue
    if (this.progressValue > 1) {
      this.progressValue = 1
    }
    this.setProgressValues(this.progressValue)
  }
}

export type ProgressBarProps = Omit<EntityPropTypes, 'uiTransform' | 'uiBackground'> & {
  children?: ReactEcs.JSX.Component[]
  progressBar: ProgressBar
  uiTransform?: Omit<
    NonNullable<EntityPropTypes['uiTransform']>,
    ''
  >
  uiBackground?: Omit<
    NonNullable<EntityPropTypes['uiBackground']>,
    ''
  >
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
            src: "images/progressBar/bar_bg.png",
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
          minWidth: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center'
        }}
        uiBackground={{
          color: props.progressBar.barColor,
          textureMode: 'nine-slices',
          texture: {
            src: "images/progressBar/bar_rounded.png"
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
    </UiEntity>
  )
}


