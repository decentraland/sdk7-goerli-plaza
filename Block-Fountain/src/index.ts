import { engine, GltfContainer, Transform, Animator, AudioSource } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { MessageBus } from '@dcl/sdk/message-bus'
import { Ring } from './ring'
import { Console } from './console'
import { RandomFountain } from './randomizer'
import * as utils from '@dcl-sdk/utils'
import { setupUi } from './ui'

export function main() {
  // Create a message bus to sync animations between players
  const sceneMessageBus = new MessageBus()
  const rings: Ring[] = []

  // Get the base entity from the composite file
  const base = engine.getEntityOrNullByName('FountainBase')
  if (!base) {
    console.error('FountainBase entity not found in composite file')
    return
  }

  // Get ring entities from the composite file and create Ring instances
  const ring1Entity = engine.getEntityOrNullByName('FirstRing')
  if (ring1Entity) {
    const ring1 = new Ring(ring1Entity, '1stRing_Action_01', '1stRing_Action_02', '1stRing_Action_03')
    rings.push(ring1)
  }

  const ring2Entity = engine.getEntityOrNullByName('SecondRing')
  if (ring2Entity) {
    const ring2 = new Ring(ring2Entity, '2ndRing_Action_01', '2ndRing_Action_02', '2ndRing_Action_03')
    rings.push(ring2)
  }

  const ring3Entity = engine.getEntityOrNullByName('ThirdRing')
  if (ring3Entity) {
    const ring3 = new Ring(ring3Entity, '3rdRing_Action_01', '3rdRing_Action_02', '3rdRing_Action_03')
    rings.push(ring3)
  }

  const ring4Entity = engine.getEntityOrNullByName('FourthRing')
  if (ring4Entity) {
    const ring4 = new Ring(ring4Entity, '4thRing_Action_01', '4thRing_Action_02', '4thRing_Action_03')
    rings.push(ring4)
  }

  // Get console entities from the composite file and create Console instances
  const cyanConsoleEntity = engine.getEntityOrNullByName('CyanConsole')
  if (cyanConsoleEntity) {
    const cyanConsole = new Console(
      cyanConsoleEntity,
      3,
      'CyanButtonA',
      'CyanButtonB',
      'CyanButtonC',
      sceneMessageBus
    )
  }

  const redConsoleEntity = engine.getEntityOrNullByName('RedConsole')
  if (redConsoleEntity) {
    const redConsole = new Console(
      redConsoleEntity,
      2,
      'RedButtonA',
      'RedButtonB',
      'RedButtonC',
      sceneMessageBus
    )
  }

  const violetConsoleEntity = engine.getEntityOrNullByName('VioletConsole')
  if (violetConsoleEntity) {
    const violetConsole = new Console(
      violetConsoleEntity,
      1,
      'VioletButtonA',
      'VioletButtonB',
      'VioletButtonC',
      sceneMessageBus
    )
  }

  const yellowConsoleEntity = engine.getEntityOrNullByName('YellowConsole')
  if (yellowConsoleEntity) {
    const yellowConsole = new Console(
      yellowConsoleEntity,
      0,
      'YellowButtonA',
      'YellowButtonB',
      'YellowButtonC',
      sceneMessageBus
    )
  }

  // Handle fountain animation events
  sceneMessageBus.on('fountainAnim', (e) => {
    fountainPlayer.playingMode = 0
    utils.timers.setTimeout(() => {
      fountainPlayer.playingMode = 1
    }, 20000)

    // Trigger ring animations according to events
    switch (e.anim) {
      case 1:
        rings[e.ring].play1()
        break
      case 2:
        rings[e.ring].play2()
        break
      case 3:
        rings[e.ring].play3()
        break
    }
  })

  /// RANDOMIZER
  // Create and add fountain animation system
  const fountainPlayer = new RandomFountain(rings, 10)
  engine.addSystem((dt) => {
    fountainPlayer.update(dt)
  })

  // UI with GitHub link
  setupUi()
}
