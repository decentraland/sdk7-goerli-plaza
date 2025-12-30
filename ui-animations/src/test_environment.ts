import {
  Billboard,
  BillboardMode,
  GltfContainer,
  InputAction,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  PointerEvents,
  TextAlignMode,
  TextShape,
  Transform,
  engine,
  inputSystem,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Callback } from '@dcl/sdk/react-ecs'
import {
  animSpriteDemo,
  buttonErrorDemo,
  buttonSuccessDemo,
  cardFlipAnimDemo,
  cardFlipRewardDemo,
  coinEmitterDemo,
  coinSpriteDemo,
  counterBarDemo,
  counterDemo,
  popupAnimatorDemo,
  popupInstructionDemo,
  popupRewardDemo,
  progressBounceAnimator,
  progressDemo,
  progressRewardDemo,
  screenFade,
  spinRaysDemo,
  spinRaysRewardDemo,
  spinnerDemo
} from './test_ui_complex'
import { spinRays, spinner } from './examples/UISpinner_example'

let spacing = 1.2
let startX = 3.2
let tablePositions: Vector3[] = []

for (let i = 0; i < 10; i++) {
  tablePositions.push(Vector3.create(startX + i * spacing, 1.05, 8))
}

function createUIBox(label: string, pos: Vector3, callback: Callback, modelGLB: string) {
  let testObject = engine.addEntity()

  TextShape.create(testObject, {
    text: label,
    fontSize: 1.5,
    textAlign: TextAlignMode.TAM_BOTTOM_CENTER,
    paddingBottom: 0.6
  })

  Billboard.create(testObject, {
    billboardMode: BillboardMode.BM_Y
  })

  Transform.create(testObject, {
    position: pos
  })
  GltfContainer.create(testObject, { src: modelGLB })

  pointerEventsSystem.onPointerDown(
    {
      entity: testObject,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: label
      }
    },
    function () {
      console.log('clicked entity' + ' ' + label)
      callback()
    }
  )
}

engine.addSystem((dt: number) => {
  if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
    hideAll()
  }
})

export function hideAll() {
  counterDemo.hide()
  counterBarDemo.hide()
  spinnerDemo.hide()
  animSpriteDemo.hide()
  spinRaysDemo.hide()
  progressDemo.hide()
  cardFlipAnimDemo.hide()
  buttonErrorDemo.hide()
  buttonSuccessDemo.hide()
  popupAnimatorDemo.hide()
  popupInstructionDemo.hide()
  screenFade.hide()
  popupRewardDemo.hide()
  spinRaysRewardDemo.hide()
  cardFlipRewardDemo.hide()
  progressRewardDemo.hide()
}
export function addEnvironment() {
  let ground = engine.addEntity()
  Transform.create(ground)
  GltfContainer.create(ground, { src: 'assets/scene/Models/ground.glb' })

  //MeshCollider.setBox(particleTestObject)

  createUIBox(
    'Complex Example',
    tablePositions[8],
    () => {
      hideAll()
      popupInstructionDemo.show()
      screenFade.show()
      counterDemo.show()
      counterBarDemo.show()
      progressRewardDemo.show()
      coinSpriteDemo.show()
      coinEmitterDemo.spawnMultiple(2, 49, 48, 50, 84, () => {
        progressRewardDemo.incrementProgressBar(0.02)
        progressBounceAnimator.playAnimation('bounce')
        counterBarDemo.increaseNumberBy(2)
      })
    },
    'assets/scene/Models/box.glb'
  )
  createUIBox(
    'Progressbar',
    tablePositions[7],
    () => {
      hideAll()
      popupInstructionDemo.show()
      screenFade.show()
      progressDemo.show()
      progressDemo.incrementProgressBar(0.1)
    },
    'assets/scene/Models/box.glb'
  )

  createUIBox(
    'Counter',
    tablePositions[6],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      counterDemo.show()
      counterDemo.increaseNumberBy(1)
    },
    'assets/scene/Models/box.glb'
  )

  createUIBox(
    'Spinner Rays',
    tablePositions[5],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      spinRaysDemo.show()
    },
    'assets/scene/Models/box.glb'
  )
  createUIBox(
    'Spinner',
    tablePositions[4],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      spinnerDemo.show()
    },
    'assets/scene/Models/box.glb'
  )
  createUIBox(
    'Sprite Animation',
    tablePositions[3],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      animSpriteDemo.show()
    },
    'assets/scene/Models/box.glb'
  )

  createUIBox(
    'Card Flip',
    tablePositions[2],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      cardFlipAnimDemo.show()
    },
    'assets/scene/Models/box.glb'
  )
  createUIBox(
    'Buttons',
    tablePositions[1],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      buttonErrorDemo.show()
      buttonSuccessDemo.show()
    },
    'assets/scene/Models/box.glb'
  )
  createUIBox(
    'Pop-up',
    tablePositions[0],
    () => {
      hideAll()
      screenFade.show()
      popupInstructionDemo.show()
      popupAnimatorDemo.show()
    },
    'assets/scene/Models/box.glb'
  )
}
