import { Statue } from './statue'
import * as utils from '@dcl-sdk/utils'
import { TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/triggers'
import { Sound } from './sound'
import { engine, Entity, GltfContainer, Transform } from '@dcl/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { InputAction, inputSystem, PointerEventType } from '@dcl/sdk/ecs'
import { Selector } from './selector'

export class PuzzleBuilder {
  // Setup coordinates
  static blocked: Vector3[] = [Vector3.create(12, 0.16, 9), Vector3.create(4, 0.16, 7)]
  static solution: Vector3[] = [
    Vector3.create(4, 0.16, 5),
    Vector3.create(12, 0.16, 5),
    Vector3.create(12, 0.16, 7),
    Vector3.create(12, 0.16, 11)
  ]
  static restartPos: Vector3[] = [
    Vector3.create(6, 0.16, 9),
    Vector3.create(6, 0.16, 7),
    Vector3.create(8, 0.16, 7),
    Vector3.create(8, 0.16, 5)
  ]

  // Statue
  static statues: Statue[] = []

  static exitGlow: Entity = engine.addEntity()
  static resetFrontTrigger: Entity = engine.addEntity()
  static resetBackTrigger: Entity = engine.addEntity()

  static lastCount: number = 0

  constructor() {
    for (let i = 0; i < PuzzleBuilder.restartPos.length; i++) {
      const statue = new Statue(Vector3.create(6, 0.16, 9))
      PuzzleBuilder.statues.push(statue)
    }

    // Create triggers for resetting the game
    GltfContainer.create(PuzzleBuilder.exitGlow, { src: 'assets/scene/Models/exitGlow.glb' })

    Transform.create(PuzzleBuilder.resetFrontTrigger)
    Transform.create(PuzzleBuilder.resetBackTrigger)

    Transform.getMutable(PuzzleBuilder.resetFrontTrigger).position = { x: 8, y: 1.75, z: 1.75 }
    Transform.getMutable(PuzzleBuilder.resetFrontTrigger).scale = { x: 16, y: 3.5, z: 3.5 }
    TriggerArea.setBox(PuzzleBuilder.resetFrontTrigger)
    triggerAreaEventsSystem.onTriggerEnter(PuzzleBuilder.resetFrontTrigger, () => {
      Sound.playStatueMove()
      PuzzleBuilder.restartGame()
    })

    Transform.getMutable(PuzzleBuilder.resetBackTrigger).position = { x: 8, y: 1.75, z: 14.25 }
    Transform.getMutable(PuzzleBuilder.resetBackTrigger).scale = { x: 16, y: 3.5, z: 3.5 }
    TriggerArea.setBox(PuzzleBuilder.resetBackTrigger)
    triggerAreaEventsSystem.onTriggerEnter(PuzzleBuilder.resetBackTrigger, () => {
      Sound.playStatueMove()
      PuzzleBuilder.restartGame()
    })

    // Button down event
    engine.addSystem(() => {
      const result = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)

      if (result) {
        if (Selector.entityID == -1) {
          return
        }
        let normalHit = Selector.raycastNormalHit

        let statue: Statue | undefined

        PuzzleBuilder.statues.forEach((element) => {
          if (element.entity == Selector.entityID) {
            statue = element
          }
        })

        if (statue == undefined) {
          return
        }

        const statuePos = Transform.get(statue.entity).position
        const hitNormalPosition = normalHit
        if (hitNormalPosition == undefined) {
          return
        }
        const endPos = Vector3.create(
          statuePos.x - hitNormalPosition.x * 2,
          statuePos.y - hitNormalPosition.y * 2,
          statuePos.z - hitNormalPosition.z * 2
        )

        // Checks if anything is blocking the statue's path
        const isOverlapped = PuzzleBuilder.statues.some((statue) => {
          return PuzzleBuilder.compareVector3(endPos, Transform.get(statue.entity).position)
        })
        const isBlocked = PuzzleBuilder.blocked.some((block) => {
          return PuzzleBuilder.compareVector3(endPos, block)
        })

        // Check boundaries
        if (
          endPos.x >= 4 &&
          endPos.x <= 12 &&
          endPos.z >= 1 &&
          endPos.z >= 5 &&
          endPos.z <= 11 &&
          !isOverlapped &&
          !isBlocked
        ) {
          statue.moveStatue(statuePos, endPos)
          Selector.entityID = -1
        }
      }
    })
    PuzzleBuilder.restartGame()
  }

  static checkSolution(): boolean {
    let count = 0
    for (let i = 0; i < this.statues.length; i++) {
      for (let j = 0; j < this.solution.length; j++) {
        if (this.compareVector3(Transform.get(this.statues[i].entity).position, this.solution[j])) {
          this.statues[i].toggleGlow(true)
          count++
          break
        } else {
          this.statues[i].toggleGlow(false)
        }
      }
    }

    if (count > PuzzleBuilder.lastCount) {
      if (count < 4) {
        Sound.playPowerup()
      }
    }

    PuzzleBuilder.lastCount = count
    console.log(count)
    if (count === 4) return true
    return false
  }

  static compareVector3(a: Vector3, b: Vector3): boolean {
    if (Math.abs(a.x - b.x) < 0.1 && Math.abs(a.y - b.y) < 0.1 && Math.abs(a.z - b.z) < 0.1) {
      return true
    } else {
      return false
    }
  }

  static restartGame() {
    for (let i = 0; i < this.statues.length; i++) {
      Transform.getMutable(this.statues[i].entity).position = this.restartPos[i]
      this.statues[i].toggleGlow(false)
    }
  }

  static finishGame() {
    engine.removeEntity(this.exitGlow)
    engine.removeEntity(this.resetFrontTrigger)
    engine.removeEntity(this.resetBackTrigger)
    Sound.playComplete()
    console.log('You win')
  }
}
