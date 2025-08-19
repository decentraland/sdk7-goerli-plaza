import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { openExternalUrl } from '~system/RestrictedActions'
import { validateCaptcha } from './claim'
import { ClaimConfigInstType } from './claimConfig'
import { Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

const projectPath = "reward-claim"
const description = "Claim a wearable by clicking on the dispenser. You must be connected with your wallet to the Sepolia network. After submitting a captcha the wearable will arrive over the next couple of minutes."



const uiComponent = () => (
  [
    ui.render(),
    GitHubLinkUi(),
    descriptionUI()
    // Other UI elements
  ]
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}


function GitHubLinkUi() {

  const fullPath = "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" + projectPath

  return <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      positionType: 'absolute',
      position: { right: "8%", bottom: '3%' }
    }}
  >
    <UiEntity
      uiTransform={{
        width: '100',
        height: '100',
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: "images/gh.png"
        }
      }}

      onMouseDown={() => {
        console.log("OPENING LINK")
        openExternalUrl({ url: fullPath })
      }}
    />
    <Label
      value="View code"
      color={Color4.Black()}
      fontSize={18}
      textAlign="middle-center"
    />
  </UiEntity>
}

function descriptionUI() {



  return <UiEntity
    uiTransform={{
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: 'row',
      alignSelf: 'stretch',
      positionType: "absolute",
      flexShrink: 1,
      maxWidth: 600,
      maxHeight: 300,
      minWidth: 200,
      padding: 4,
      position: { right: "3%", bottom: '20%' }
    }}
    uiBackground={{ color: Color4.fromHexString("#4d544e") }}
  >
    <UiEntity
      uiTransform={{
        width: "auto",
        height: "auto",
        alignSelf: "center",
        padding: 4,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
      }}
      uiBackground={{ color: Color4.fromHexString("#92b096") }}
    >
      <Label
        value={description}
        fontSize={18}
        textAlign="middle-center"

        uiTransform={{
          width: "auto",
          height: "auto",
          alignSelf: "center",
          margin: '16px 16px 8px 16px',

        }}
      />
    </UiEntity>
  </UiEntity >
}



export function confirmationUI(thumbnail: string, wearableName: string) {

  const customPrompt = ui.createComponent(ui.CustomPrompt, {
    style: ui.PromptStyles.DARK,
  })


  const promptTitle = customPrompt.addText({
    value: 'Wearable incoming!',
    color: Color4.Green(),
    size: 30,
  })

  const promptText = customPrompt.addText({
    value: "It will arrive in your backpack in a few minutes.",
  })

  const promptIcon = customPrompt.addIcon({
    image: thumbnail,
    height: 125,
    width: 125
  })


  const name = customPrompt.addText({
    value: wearableName,
    size: 20,
  })

  const promptButtonE = customPrompt.addButton({
    style: ui.ButtonStyles.E,
    text: 'Ok',
    onMouseDown: () => {
      console.log('Yeah clicked')
      customPrompt.hide()
    },
  })

  customPrompt.show()

  utils.playSound('assets/scene/Audio/star-collect.mp3', false, Transform.get(engine.PlayerEntity).position)
}


export function alreadyClaimedUI() {

  const prompt = ui.createComponent(ui.OkPrompt, {
    text: 'You already claimed this wearable!',
    onAccept: () => {
      console.log('accepted')
      prompt.hide()
    },
    acceptLabel: 'Ok',
    useDarkTheme: true,
    textSize: 20,
    width: 450,
    startHidden: false,
  })
}



export function errorUI(errorString: string) {

  const prompt = ui.createComponent(ui.OkPrompt, {
    text: 'There was an error: ' + errorString,
    onAccept: () => {
      console.log('accepted')
      prompt.hide()
    },
    acceptLabel: 'Ok',
    useDarkTheme: true,
    textSize: 20,
    startHidden: false,
  })
  throw new Error(errorString)
}


let captchaText: string = ""

export function captchaUI(image: string, id: string, campaign: ClaimConfigInstType, campaign_key: string) {

  const customPrompt = ui.createComponent(ui.CustomPrompt, {
    style: ui.PromptStyles.DARK,
  })


  const promptTitle = customPrompt.addText({
    value: 'Please solve this captcha',
    xPosition: 0,
    yPosition: 135,
    color: Color4.Green(),
    size: 30,
  })

  const promptIcon = customPrompt.addIcon({
    image: image,
    height: 125,
    width: 125
  })


  const name = customPrompt.addTextBox({
    onChange: (text) => { captchaText = text },
  })

  const promptButtonE = customPrompt.addButton({
    style: ui.ButtonStyles.E,
    text: 'Ok',
    onMouseDown: () => {
      validateCaptcha(captchaText, id, campaign, campaign_key)
      customPrompt.hide()

    },
  })

  customPrompt.show()
}

