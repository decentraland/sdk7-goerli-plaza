import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  Button,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { Dialog, DialogButton } from '../mocked-data/dialogsData'
import { canvasInfo } from '..'

let isVisible: Boolean = true
let dialogIndex: number = 0
let assignedDialogs: Dialog[]

const WIDTH_FACTOR = 0.4
const ASPECT_RATIO = 0.3

export function setupNpcDialogUi(dialogs: Dialog[]) {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  assignedDialogs = dialogs
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: canvasInfo.width,
      height: canvasInfo.height,
      padding: { bottom: canvasInfo.height * 0.025 },
      display: isVisible ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }}
  >
    <UiEntity
      uiTransform={{
        width: canvasInfo.width * WIDTH_FACTOR,
        height: canvasInfo.width * WIDTH_FACTOR * ASPECT_RATIO,
        flexDirection: 'column',
        alignItems: 'center',
        padding: { left: canvasInfo.width * WIDTH_FACTOR * 0.1 }
      }}
      uiBackground={{
        color: Color4.fromHexString('#305e3e')
      }}
      onMouseDown={nextMessage}
    >
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '90%',
          height: '70%'
        }}
        uiText={{
          value: assignedDialogs[dialogIndex].text,
          textAlign: 'middle-left',
          fontSize: 14
        }}
      />
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '90%',
          height: '30%',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {assignedDialogs[dialogIndex].buttons.map((button) => (
          <AnswerButton answer={button} />
        ))}
      </UiEntity>
      <UiEntity
        uiTransform={{
          position: {
            left: canvasInfo.width * WIDTH_FACTOR * -0.04,
            top: canvasInfo.width * WIDTH_FACTOR * -0.04
          },
          positionType: 'absolute',
          width: canvasInfo.width * WIDTH_FACTOR * ASPECT_RATIO * 0.5,
          height: canvasInfo.width * WIDTH_FACTOR * ASPECT_RATIO * 0.5
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: { src: assignedDialogs[dialogIndex].portraitSource }
        }}
      />
    </UiEntity>
  </UiEntity>
)

function changeVisibility() {
  isVisible = !isVisible
}

function nextMessage() {
  if (
    !assignedDialogs[dialogIndex].isEndOfDialog &&
    !assignedDialogs[dialogIndex].isQuestion
  ) {
    dialogIndex++
  } else if (assignedDialogs[dialogIndex].isEndOfDialog) {
    changeVisibility()
  }
}

function goToDialog(dialogId: string) {
  dialogIndex = assignedDialogs.findIndex((dialog) => dialog.id === dialogId)
}

function AnswerButton(props: { answer: DialogButton }) {
  return (
    <Button
      value={props.answer.label}
      variant="secondary"
      uiTransform={{
        width: '20%',
        height: '40%'
      }}
      uiBackground={{
        textureMode: 'center',
        texture: {
          src: 'images/Questsslot.png'
        }
      }}
      onMouseDown={() => goToDialog(props.answer.goToDialog)}
    />
  )
}
