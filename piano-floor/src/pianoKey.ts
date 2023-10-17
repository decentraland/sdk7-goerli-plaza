import * as utils from '@dcl-sdk/utils'
import { MessageBus } from '@dcl/sdk/message-bus'
import { AudioSource, Entity, Material, MeshRenderer, Transform, engine, PBAudioSource } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import resources from './resources'
import { AudioController } from './audioController'

export const sceneMessageBus = new MessageBus()
export const whiteKeys: WhitePianoKey[] = []
export const blackKeys: BlackPianoKey[] = []
export const referenceWhiteKeySound = resources.sounds.whiteKeys.c4
export const referenceBlackKeySound = resources.sounds.blackKeys.aSharp3
const playerEntity: Entity = engine.PlayerEntity

const BLACK_LAYER = utils.LAYER_2
const WHITE_LAYER = utils.LAYER_3
const PLAYER_LAYER = utils.triggers.getLayerMask(playerEntity)
utils.triggers.setTriggeredByMask(playerEntity, 2 || 3)

interface CustomPBAudioSource extends PBAudioSource {
  isBlackKey: boolean
}

export class WhitePianoKey {
  public whiteKeyEntity: Entity
  onColor: Color4
  offColor: Color4
  note: number = 0
  isBlackKey: boolean = false

  constructor(position: Vector3, scale: Vector3, sound: string, note: number = 0, pitch: number, parent?: Entity) {
    this.whiteKeyEntity = engine.addEntity()
    this.note = note
    MeshRenderer.setPlane(this.whiteKeyEntity)
    Transform.create(this.whiteKeyEntity, {
      position: position,
      rotation: Quaternion.fromEulerDegrees(90, 0, 0),
      scale: scale,
      parent: parent
    })
    this.offColor = Color4.White()
    this.onColor = Color4.Yellow()
    this.createWhiteKeyTrigger(position, scale, sound)

    Material.setPbrMaterial(this.whiteKeyEntity, {
      albedoColor: this.offColor,
      emissiveColor: this.offColor,
      emissiveIntensity: 2,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })

    AudioSource.create(this.whiteKeyEntity, {
      audioClipUrl: sound,
      loop: false,
      playing: false,
      pitch: pitch
    } as CustomPBAudioSource)

    whiteKeys.push(this)
  }

  play(): void {
    AudioSource.getMutable(this.whiteKeyEntity).playing = true
    AudioSource.getMutable(this.whiteKeyEntity).loop = false
    Material.setPbrMaterial(this.whiteKeyEntity, {
      albedoColor: this.onColor,
      emissiveColor: this.onColor,
      emissiveIntensity: 2,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })
  }

  end(): void {
    Material.setPbrMaterial(this.whiteKeyEntity, {
      albedoColor: this.offColor,
      emissiveColor: this.offColor,
      emissiveIntensity: 0,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })
  }

  createWhiteKeyTrigger(triggerPosition: Vector3, scale: Vector3, sound: string): void {
    triggerPosition = Vector3.create(0, -0.9, -1)
    scale = Vector3.create(0.25, 4, 2)

    utils.triggers.addTrigger(
      this.whiteKeyEntity,
      WHITE_LAYER,
      PLAYER_LAYER,
      [
        {
          type: 'box',
          position: triggerPosition,
          scale: scale
        }
      ],
      // on camera enter
      () => {
        console.log('enter white key trigger: ', sound)
        AudioSource.getMutable(this.whiteKeyEntity).playing = true
        AudioSource.getMutable(this.whiteKeyEntity).loop = false
        sceneMessageBus.emit('noteOn', { note: this.note })
      },
      // on camera exit
      () => {
        sceneMessageBus.emit('noteOff', { note: this.note })
      },
      Color4.Blue() // debug
    )
  }
}

export class BlackPianoKey {
  public blackKeyEntity: Entity
  onColor2: Color4
  offColor: Color4
  note: number = 0
  isBlackKey: Boolean = true

  constructor(position: Vector3, scale: Vector3, sound: string, note: number = 0, pitch: number, parent?: Entity) {
    this.blackKeyEntity = engine.addEntity()
    this.note = note
    Transform.createOrReplace(this.blackKeyEntity, {
      position: position,
      rotation: Quaternion.fromEulerDegrees(90, 0, 0),
      scale: scale,
      parent: parent
    })

    MeshRenderer.setPlane(this.blackKeyEntity)
    this.offColor = Color4.Black()
    this.onColor2 = Color4.Yellow()
    this.createBlackKeyTrigger(position, scale, sound)

    Material.setPbrMaterial(this.blackKeyEntity, {
      albedoColor: this.offColor,
      emissiveColor: this.offColor,
      emissiveIntensity: 2,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })

    AudioSource.create(this.blackKeyEntity, {
      audioClipUrl: sound,
      loop: false,
      playing: false,
      pitch: pitch
    } as CustomPBAudioSource)

    blackKeys.push(this)
  }

  play(): void {
    AudioSource.getMutable(this.blackKeyEntity).playing = true
    AudioSource.getMutable(this.blackKeyEntity).loop = false
    Material.setPbrMaterial(this.blackKeyEntity, {
      albedoColor: this.onColor2,
      emissiveColor: this.onColor2,
      emissiveIntensity: 2,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })
  }

  end(): void {
    Material.setPbrMaterial(this.blackKeyEntity, {
      albedoColor: this.offColor,
      emissiveColor: this.offColor,
      emissiveIntensity: 0,
      specularIntensity: 1,
      roughness: 0.5,
      metallic: 0.2
    })
  }

  createBlackKeyTrigger(triggerPosition: Vector3, scale: Vector3, sound: string): void {
    console.log('Entity Transform:', {
      position: Transform.get(this.blackKeyEntity).position,
      rotation: Transform.get(this.blackKeyEntity).rotation,
      parent: Transform.get(this.blackKeyEntity).parent
    })
    triggerPosition = Vector3.create(0, 0, -1)
    scale = Vector3.create(0.25, 4, 1.5)
    utils.triggers.addTrigger(
      this.blackKeyEntity,
      BLACK_LAYER,
      PLAYER_LAYER,
      [
        {
          type: 'box',
          position: triggerPosition,
          scale: scale
        }
      ],
      // on camera enter
      () => {
        console.log('enter black key trigger: ', sound)
        AudioSource.getMutable(this.blackKeyEntity).playing = true
        AudioSource.getMutable(this.blackKeyEntity).loop = false
        sceneMessageBus.emit('noteOn', { note: this.note, isBlackKey: true })
        Material.setPbrMaterial(this.blackKeyEntity, {
          albedoColor: this.onColor2,
          emissiveColor: this.onColor2,
          emissiveIntensity: 2,
          specularIntensity: 1,
          roughness: 0.5,
          metallic: 0.2
        })
      },
      // on camera exit
      () => {
        sceneMessageBus.emit('noteOff', { note: this.note })
        Material.setPbrMaterial(this.blackKeyEntity, {
          albedoColor: this.offColor,
          emissiveColor: this.offColor,
          emissiveIntensity: 0,
          specularIntensity: 1,
          roughness: 0.5,
          metallic: 0.2
        })
      },
      Color4.Red() // debug
    )
  }
}

sceneMessageBus.on('noteOn', (e) => {
  if (e.isBlackKey) {
    const blackKey = blackKeys[e.note]
    if (blackKey) {
      blackKey.play()
    }
  } else {
    const whiteKey = whiteKeys[e.note]
    if (whiteKey) {
      whiteKey.play()
    }
  }
})

sceneMessageBus.on('noteOff', (e) => {
  const whiteKey = whiteKeys[e.note]
  if (whiteKey) {
    whiteKey.end()
  }

  const blackKey = blackKeys[e.note]
  if (blackKey) {
    blackKey.end()
  }
})

function calculatePitch(note: number): number {
  return 2 ** ((note - AudioController.calculatePitch('c4')) / 12)
}
