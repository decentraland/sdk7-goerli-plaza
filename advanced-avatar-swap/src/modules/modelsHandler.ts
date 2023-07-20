import { engine, Entity, GltfContainer, Transform, Animator, PBAnimator, PBAnimationState } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export enum TeamModels {
  None = 'None',
  Krampus = 'Krampus',
  Santa = 'Santa'
}

const santaModel = 'models/Santa_FullBody.glb'
const krampusModel = 'models/Grinch_FullBody.glb'

const santaStates: PBAnimationState[] = [
  {
    name: 'Idle',
    clip: 'Idle_Santa',
    loop: true,
    shouldReset: false
  },
  {
    name: 'Running',
    clip: 'Run_Santa',
    loop: true,
    shouldReset: false
  }
]

const krampusStates: PBAnimationState[] = [
  {
    name: 'Idle',
    clip: 'Idle',
    loop: true,
    shouldReset: false
  },
  {
    name: 'Running',
    clip: 'Run',
    loop: true,
    shouldReset: false
  }
]

let parentEntity: Entity
let modelEntity: Entity
let animator: PBAnimator

export function initializeCharacter(): Entity {
  parentEntity = engine.addEntity()

  modelEntity = engine.addEntity()

  GltfContainer.create(modelEntity, {
    src: santaModel
  })
  Transform.create(modelEntity, {
    position: Vector3.create(0, 0.75, 0),
    scale: Vector3.create(1, 1, 1),
    parent: parentEntity
  })
  animator = Animator.create(modelEntity, {
    states: santaStates
  })

  return modelEntity
}

let currentModel: TeamModels
export function changeModel(targetModel: TeamModels) {
  if (currentModel == targetModel) return
  currentModel = targetModel
  switch (currentModel) {
    case TeamModels.Krampus:
      console.log('Swap model to Kramps')
      GltfContainer.createOrReplace(modelEntity, {
        src: krampusModel
      })
      animator.states = krampusStates
      break
    case TeamModels.Santa:
      console.log('Swap model to Santa')
      GltfContainer.createOrReplace(modelEntity, {
        src: santaModel
      })
      animator.states = santaStates
      break
  }
}

export enum AniamtionState {
  None = 'None',
  Idle = 'Idle',
  Run = 'Run'
}

let currentAnimation: AniamtionState
export function playAnimation(animation: AniamtionState) {
  if (currentAnimation === animation) return
  currentAnimation = animation
  switch (currentAnimation) {
    case AniamtionState.Idle:
      Animator.playSingleAnimation(modelEntity, 'Idle', false)
      break

    case AniamtionState.Run:
      Animator.playSingleAnimation(modelEntity, 'Running', false)
      break
  }
}

export function initializeModels() {
  let santaHolder = engine.addEntity()
  GltfContainer.create(santaHolder, {
    src: santaModel
  })

  Transform.create(santaHolder, {
    position: Vector3.create(0, 4, 0),
    scale: Vector3.create(0, 0, 0)
  })

  let krampusHolder = engine.addEntity()
  GltfContainer.create(krampusHolder, {
    src: krampusModel
  })

  Transform.create(krampusHolder, {
    position: Vector3.create(0, 4, 0),
    scale: Vector3.create(0, 0, 0)
  })
}
