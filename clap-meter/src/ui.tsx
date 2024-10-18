import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { clapMeterFull } from './clapMeter'
import * as utils from '@dcl-sdk/utils'
import { openExternalUrl } from '~system/RestrictedActions'
import { Color4 } from '@dcl/sdk/math'

const projectPath = "clap-meter"
const description = "A device that measures how much players are clapping. It uses the MessageBus to take into account the claps from all the players in the scene."



export var isMenuVisible: boolean = false;
var isClapMeterFull = clapMeterFull
let isClapMeterFullVisible: boolean | null = null;
var announcement: string = "For the best experience, \nswitch to 3rd person view by \npressing 'V' key."
var clapMeterFullAnnouncement: string = "The clap meter is full! Nice clapping!"


export function setupUi() {

  ReactEcsRenderer.setUiRenderer(() => [
    customUI(),
    GitHubLinkUi(),
    descriptionUI()
    // Other UI elements
  ])

}

function customUI() {
  return <UiEntity
    uiTransform={{
      width: 400,
      height: 230,
      margin: '16px 0 8px 270px',
      padding: 4
    }}
  >
    {/* Existing announcement label */}
    {isMenuVisible && (

      <Label
        value={announcement}
        fontSize={18}
        uiTransform={{ width: '100%', height: 230 }}
      />
    )}

    {/* New announcement label */}
    {isClapMeterFull && (
      <Label
        value={clapMeterFullAnnouncement}
        fontSize={18}
        uiTransform={{ width: '100%', height: 230 }}
      />
    )}
  </UiEntity>

}

// Function to toggle the state of the menu
export function toggleMenuVisibility() {
  isMenuVisible = !isMenuVisible
}
export function setClapMeterFull(full: boolean) {
  isClapMeterFull = full;

  if (full) {
    isClapMeterFullVisible = true;


  }

}

export function onClapMeterFull() {
  setClapMeterFull(true);
  isMenuVisible = false

  utils.timers.setTimeout(() => {
    setClapMeterFull(false);
    isClapMeterFullVisible = false;
  },
    10000 // Remove the announcement after 10 seconds
  )
}



// GitHub link

function GitHubLinkUi() {

  const fullPath = "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" + projectPath


  return <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      positionType: 'absolute',
      position: { right: "3%", bottom: '3%' }
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
