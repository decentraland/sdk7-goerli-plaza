import { Entity, Schemas, engine } from '@dcl/sdk/ecs'
import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'
import { rotateUVs } from './utilities'

export const SpinnerComponent = engine.defineComponent('spinner-id', {
  angle: Schemas.Number,
  speed: Schemas.Number,
  timeout: Schemas.Number
})


export function RotatorSystem(dt: number) {

  const spinnerGroup = engine.getEntitiesWith(SpinnerComponent)

  for (const [entity] of spinnerGroup) {

    const spinnerInfo = SpinnerComponent.getMutable(entity)

    spinnerInfo.angle -= dt * spinnerInfo.speed
    if (spinnerInfo.angle < 0) spinnerInfo.angle += 360
  }
}

export class Spinner {
  spinner: Entity
  texture: string
  visible: boolean = false

  constructor(_texture: string, _speed: number) {
    this.spinner = engine.addEntity()
    SpinnerComponent.create(this.spinner, {
      angle: 0,
      speed: _speed,
      timeout: 3
    })

    this.texture = _texture
  }

  getAngle(): number {
    return SpinnerComponent.get(this.spinner).angle
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

export type SpinnerAnimProps = EntityPropTypes & {
  children?: ReactEcs.JSX.Component[]
  spinner: Spinner

}

export function UISpinner(props: SpinnerAnimProps) {

  return <UiEntity
    uiTransform={props.uiTransform}
  >
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        display: props.spinner.visible ? 'flex' : 'none'
      }}
      uiBackground={{
        textureMode: 'stretch',
        color: props.uiBackground?.color,
        uvs: rotateUVs(props.spinner.getAngle()),
        texture: {
          src: props.spinner.texture,
          wrapMode: 'clamp'
        },
      }}>
      {props.children}
    </UiEntity>
  </UiEntity>
}


engine.addSystem(RotatorSystem)