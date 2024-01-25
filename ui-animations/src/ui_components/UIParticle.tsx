import { AudioSource, Entity, Schemas, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import * as utils from '@dcl-sdk/utils'
import { SpriteAnim } from './UIAnimatedSprite'
import { pitchShift, smoothPath } from './utilities'
import { SpriteAnimation, UIAnimatedSprite } from './UIAnimatedSprite'

export const Particle = engine.defineComponent('particle-id', {})
// export class Tween {
export class ParticleEmitter {
  particles: Entity[]
  MAX_POOL_SIZE: number = 32
  interpolationType = utils.InterpolationType.LINEAR
  spawnCount: number = 0
  constructor() {
    this.particles = []
  }

  getParticleFromPool(): Entity {

    if (this.particles.length < this.MAX_POOL_SIZE) {

      let particle = engine.addEntity()
      this.particles.push(particle)
      return particle
    }
    else {

      let particle = this.particles.shift()
      if (particle) {
        this.particles.push(particle)
        return particle
      }
    }

    let particle = engine.addEntity()
    return particle
  }

  spawnSingle(_startPosX: number, _startPosY: number, _endPosX: number, _endPosY: number) {
    this.spawnCount += 1
    console.log("Spawned so far: " + this.spawnCount)

    let particle = this.getParticleFromPool()
    Transform.createOrReplace(particle, { scale: Vector3.create(60, 60, 10) })
    Particle.createOrReplace(particle)
    SpriteAnim.createOrReplace(particle, {
      id: this.particles.indexOf(particle).toString(),
      countU: 4,
      countV: 2,
      stepU: 1 / 4,
      stepV: 1 / 2,
      currentSpriteU: 0,
      currentSpriteV: 0,
      elapsed: 0,
      freq: 1 / 100,
    })

    utils.paths.startSmoothPath(
      particle,
      [
        Vector3.create(_startPosX, _startPosY, 0),
        Vector3.create(((_endPosX + _startPosX) / 2) + Math.random() * 20 - 10, ((_endPosY + _startPosY) / 2) + Math.random() * 10 - 5, 0),
        Vector3.create(_endPosX, _endPosY, 0),
      ],
      2,
      20,
      false,
      () => {
        //this.coins = this.coins.filter((object) => this.coins.indexOf(object) !== this.coins.indexOf(coin))
        Particle.deleteFrom(particle)
      }
    )

    let pitches = [-2, 2, 5, 7, 6]

    console.log("SOUNDS:")
    AudioSource.createOrReplace(particle, {
      audioClipUrl: "sounds/coin_acquire.mp3",
      playing: true,
      loop: false,
      //  pitch: pitchShift(1, pitches[Math.floor((Math.random()*4))] ),
      pitch: 1,
      volume: 3
    })

  }

  generateParticleUI(particleUI: ReactEcs.JSX.Element) {
    return Array.from(engine.getEntitiesWith(
      Particle,
      Transform
    )).map(([entity]) => <UIParticle particleUI={particleUI} emitter={this} entity={entity} key={entity} />)
  }

}


export type ParticleProps = EntityPropTypes & {
  key: string | number
  entity: Entity
  particleUI: ReactEcs.JSX.Element
  emitter: ParticleEmitter

}

// defining a single particle's UI
export function UIParticle(props: ParticleProps) {

  const transfrom = Transform.get(props.entity)

  return <UiEntity
    key={props.key}
    uiTransform={{
      width: transfrom.scale.x,
      height: transfrom.scale.y,
      position: {
        bottom: (transfrom.position.y + '%') as PositionUnit,
        left: (transfrom.position.x + '%') as PositionUnit
      },
      positionType: 'absolute'
    }}
  >
    {props.particleUI}
  </UiEntity>
}





