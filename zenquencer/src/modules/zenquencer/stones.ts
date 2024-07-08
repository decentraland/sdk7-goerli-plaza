import * as utils from '@dcl-sdk/utils'
import {
  Animator,
  AudioSource,
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { SeqNumbers, StoneStatus } from '../../components'
import resources from '../../resources'
import { sceneMessageBus } from '../serverHandler'
import { sequencerConfig } from './sequenceSystem'

export let stones: Stone[][] = []
if (SeqNumbers.getOrNull(engine.RootEntity) === null) {
  SeqNumbers.create(engine.RootEntity, { seq: [] })
}
export let seqNumbers: number[][] = SeqNumbers.getMutable(engine.RootEntity).seq

export class Stone {
  stoneOn: Boolean = false
  stoneEntity: Entity = engine.addEntity()
  noteEntity: Entity = engine.addEntity()
  musicDropEntity: Entity = engine.addEntity()
  noteSrc: string
  pos: { beat: number; note: number }
  constructor(_pos: { beat: number; note: number }, _noteSrc: string, _parent: Entity) {
    let seqOffset = Vector3.create(127.5 - 120, 0.3, 222 - 225)
    this.pos = _pos
    this.noteSrc = _noteSrc

    // stone entity setup
    StoneStatus.create(this.stoneEntity, { stoneOn: false })
    GltfContainer.create(this.stoneEntity, {
      src: resources.zenquencer.models.stone
    })
    Transform.create(this.stoneEntity, {
      parent: _parent,
      position: Vector3.create(seqOffset.x - this.pos.beat, seqOffset.y, seqOffset.z + this.pos.note),
      scale: Vector3.One(),
      rotation: Quaternion.fromEulerDegrees(180, 0, 0)
    })
    let stoneBtn = engine.addEntity()
    Transform.create(stoneBtn, {
      parent: this.stoneEntity,
      scale: Vector3.create(0.7, 0.3, 0.7)
    })
    MeshRenderer.setBox(stoneBtn)
    MeshCollider.setBox(stoneBtn)
    Material.setPbrMaterial(stoneBtn, {
      albedoColor: Color4.create(0.5, 0.5, 0.5, 0.3)
    })

    let canClick = true
    pointerEventsSystem.onPointerDown(
      {
        entity: stoneBtn,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Toggle'
        }
      },
      () => {
        if (!canClick) return

        canClick = false
        utils.timers.setTimeout(() => {
          canClick = true
        }, 1000)

        console.log('zenquencer. stone click. pos:', this.pos, 'stoneOn:', StoneStatus.get(this.stoneEntity).stoneOn)

        const mutableStoneStatus = StoneStatus.getMutable(this.stoneEntity)
        if (mutableStoneStatus.stoneOn) {
          sceneMessageBus.emit('hideStone', { pos: this.pos })
          mutableStoneStatus.stoneOn = false
          this.stoneOn = false
        } else {
          sceneMessageBus.emit('showStone', { pos: this.pos })
          mutableStoneStatus.stoneOn = true
          this.stoneOn = true
        }
      }
    )

    // note entity setup
    GltfContainer.create(this.noteEntity, {
      src: resources.zenquencer.models.musicDrop
    })
    Transform.create(this.noteEntity, {
      parent: this.stoneEntity,
      position: Vector3.create(0, -0.1, 0),
      rotation: Quaternion.fromEulerDegrees(180, 0, 0),
      scale: Vector3.Zero()
    })
    Animator.create(this.noteEntity, {
      states: [
        {
          clip: 'ArmatureAction.001',
          playing: false,
          loop: false,
          shouldReset: true
        }
      ]
    })

    // music drop entity setup
    Transform.create(this.musicDropEntity, { parent: engine.CameraEntity })
    AudioSource.createOrReplace(this.musicDropEntity, {
      audioClipUrl: this.noteSrc,
      playing: false,
      loop: false
    })

    // syncEntity(this.stoneEntity, [StoneStatus.componentId], id)
  }
  activate() {
    if (StoneStatus.get(this.stoneEntity).stoneOn) return
    StoneStatus.getMutable(this.stoneEntity).stoneOn = true
    this.stoneOn = true
    console.log('zenquencer. stone. activate. pos:', this.pos.beat, this.pos.note)
    Transform.getMutable(this.noteEntity).scale = Vector3.One()
  }
  deactivate() {
    if (!StoneStatus.get(this.stoneEntity).stoneOn) return
    StoneStatus.getMutable(this.stoneEntity).stoneOn = false
    this.stoneOn = false
    console.log('zenquencer. stone. deactivate. pos:', this.pos.beat, this.pos.note)
    Transform.getMutable(this.noteEntity).scale = Vector3.Zero()
  }
  play() {
    Transform.getMutable(this.noteEntity).scale = Vector3.One()
    Animator.getMutable(this.noteEntity).states[0].playing = true

    // AudioSource.getMutable(this.musicDropEntity).playing = false
    // AudioSource.deleteFrom(this.musicDropEntity)
    // AudioSource.createOrReplace(this.musicDropEntity, {
    //     audioClipUrl: this.noteSrc,
    //     playing: true,
    //     loop: false
    // })
    let audioEntity = engine.addEntity()
    Transform.create(audioEntity, { parent: engine.CameraEntity })
    AudioSource.create(audioEntity, {
      audioClipUrl: this.noteSrc,
      playing: true,
      loop: false
    })
    utils.timers.setTimeout(() => {
      engine.removeEntity(audioEntity)
    }, 7000)
  }
  updateStatus() {
    this.stoneOn = StoneStatus.get(this.stoneEntity).stoneOn
    if (this.stoneOn) {
      Transform.getMutable(this.noteEntity).scale = Vector3.One()
    } else {
      Transform.getMutable(this.noteEntity).scale = Vector3.Zero()
    }
  }
}

sceneMessageBus.on('showStone', (e) => {
  e = e.pos
  console.log('zenquencer. sceneMessageBus. showStone. e:', e, stones[e.beat][e.note])
  stones[e.beat][e.note].activate()

  if (!sequencerConfig.playingMode) {
    stones[e.beat][e.note].play()
  }

  seqNumbers[e.beat][e.note] = 1
  SeqNumbers.createOrReplace(engine.RootEntity, { seq: seqNumbers })
})

sceneMessageBus.on('hideStone', (e) => {
  e = e.pos
  console.log('zenquencer. sceneMessageBus. hideStone. e:', e, stones[e.beat][e.note])

  stones[e.beat][e.note].deactivate()

  seqNumbers[e.beat][e.note] = 0
  SeqNumbers.createOrReplace(engine.RootEntity, { seq: seqNumbers })
})
