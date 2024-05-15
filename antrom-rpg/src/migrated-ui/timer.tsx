import { engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

export function setupTimer() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
let hours: string | undefined
let minutes: string = ''
let seconds: string = ''

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      position: { top: '30%', left: '1.5%' },
      positionType: 'absolute',
      width: 100,
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}
  >
    <UiEntity
      uiTransform={{
        positionType: 'relative'
      }}
      uiText={{
        value: hours ? hours : '',
        fontSize: 20,
        color: Color4.Yellow()
      }}
    />
    <UiEntity
      uiTransform={{
        positionType: 'relative'
      }}
      uiText={{
        value: hours ? ':' : '',
        fontSize: 20,
        color: Color4.Yellow()
      }}
    />
    <UiEntity
      uiTransform={{
        positionType: 'relative'
      }}
      uiText={{
        value: minutes,
        fontSize: 20,
        textAlign: 'middle-center',
        color: Color4.Yellow()
      }}
    />
    <UiEntity
      uiTransform={{
        positionType: 'relative'
      }}
      uiText={{
        value: ':',
        fontSize: 20,
        textAlign: 'middle-center',
        color: Color4.Yellow()
      }}
    />
    <UiEntity
      uiTransform={{
        positionType: 'relative'
      }}
      uiText={{
        value: seconds,
        fontSize: 20,
        textAlign: 'middle-center',
        color: Color4.Yellow()
      }}
    />
  </UiEntity>
)

engine.addSystem(timerSystem)

// This INITIAL_TIME must be saved when quest or event starts
const INITIAL_TIME = new Date()
export function timerSystem(dt: number) {
  const now = new Date()
  const difference = -(INITIAL_TIME.getTime() - now.getTime())
  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  seconds = formatNumber(Math.floor((difference / 1000) % 60))
  minutes = formatNumber(Math.floor((difference / (1000 * 60)) % 60))
  if (Math.floor(difference / (1000 * 60 * 60)) > 0) {
    hours = formatNumber(Math.floor(difference / (1000 * 60 * 60)))
  }
}


//