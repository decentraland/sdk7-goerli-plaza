import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  Button,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { Dialog, DialogButton } from '../mocked-data/dialogsData'
import { getUvs } from '../utils'
import { npcDialogsSprites } from '../mocked-data/npcDialogueSprites'

let isVisible: Boolean = true
let dialogIndex: number = 0
let assignedDialogs: Dialog[]

const DIALOG_ASPECT_RATIO = 0.3

const DIALOG_WIDTH_FACTOR = 0.4
const DIALOG_HEIGHT_FACTOR = DIALOG_WIDTH_FACTOR * DIALOG_ASPECT_RATIO

const BUTTON_ASPECT_RATIO = 0.26
const BUTTON_WIDTH_FACTOR = DIALOG_WIDTH_FACTOR * 0.2
const BUTTON_HEIGHT_FACTOR = BUTTON_WIDTH_FACTOR * BUTTON_ASPECT_RATIO

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
        width: canvasInfo.width * DIALOG_WIDTH_FACTOR,
        height: canvasInfo.width * DIALOG_HEIGHT_FACTOR,
        flexDirection: 'column',
        alignItems: 'center'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(npcDialogsSprites.background),
        texture: { src: npcDialogsSprites.background.atlasSrc }
      }}
      onMouseDown={nextMessage}
    >
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '80%',
          height: '70%',
          margin: { left: '10%' }
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
          width: '80%',
          height: '40%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: {
            bottom: canvasInfo.width * DIALOG_HEIGHT_FACTOR * 0.05
          }
        }}
      >
        {assignedDialogs[dialogIndex].buttons.map((button, index) => (
          <AnswerButton answer={button} key={index} />
        ))}
      </UiEntity>
      <UiEntity
        uiTransform={{
          position: {
            left: canvasInfo.width * DIALOG_WIDTH_FACTOR * -0.04,
            top: canvasInfo.width * DIALOG_WIDTH_FACTOR * -0.04
          },
          positionType: 'absolute',
          width: canvasInfo.width * DIALOG_HEIGHT_FACTOR * 0.5,
          height: canvasInfo.width * DIALOG_HEIGHT_FACTOR * 0.5
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: { src: assignedDialogs[dialogIndex].portraitSource }
        }}
      />
      <UiEntity
        uiTransform={{
          position: {
            right: canvasInfo.width * DIALOG_WIDTH_FACTOR * 0.02,
            bottom: canvasInfo.width * DIALOG_WIDTH_FACTOR * 0.02
          },
          positionType: 'absolute',
          width: canvasInfo.width * DIALOG_HEIGHT_FACTOR * 0.25,
          height: canvasInfo.width * DIALOG_HEIGHT_FACTOR * 0.25
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(npcDialogsSprites.click_on_bg_icon),
          texture: { src: npcDialogsSprites.click_on_bg_icon.atlasSrc }
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

function AnswerButton(props: { answer: DialogButton; key: number }) {
  return (
    <UiEntity
      uiTransform={{
        width: canvasInfo.width * BUTTON_WIDTH_FACTOR,
        height: canvasInfo.width * BUTTON_HEIGHT_FACTOR
      }}
      key={props.key}
    >
      <Button
        value={props.answer.label}
        disabled={props.answer.disabled ? props.answer.disabled : false}
        variant="secondary"
        uiTransform={{
          width: '100%',
          height: '100%'
        }}
        color={props.answer.disabled ? Color4.Gray() : Color4.White()}
        uiBackground={{
          textureMode: 'stretch',
          uvs: props.answer.disabled
            ? getUvs(npcDialogsSprites.available_button)
            : getUvs(npcDialogsSprites.unavailable_button),
          texture: { src: npcDialogsSprites.available_button.atlasSrc }
        }}
        onMouseDown={() => goToDialog(props.answer.goToDialog)}
      />
      <UiEntity
        uiTransform={{
          width: canvasInfo.width * BUTTON_HEIGHT_FACTOR * 0.7,
          height: canvasInfo.width * BUTTON_HEIGHT_FACTOR * 0.7,
          display: props.answer.action ? 'flex' : 'none',
          positionType: 'absolute',
          position: {
            top: canvasInfo.width * BUTTON_HEIGHT_FACTOR * 0.15,
            left: canvasInfo.width * BUTTON_HEIGHT_FACTOR * 0.175
          }
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs:
            props.answer.action === 'primary'
              ? getUvs(npcDialogsSprites.e_icon_avaialable)
              : getUvs(npcDialogsSprites.f_icon_avaialable),
          texture: { src: npcDialogsSprites.e_icon_avaialable.atlasSrc }
        }}
      />
    </UiEntity>
  )
}
