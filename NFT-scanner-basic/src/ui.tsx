import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction, Entity, Animator,
  pointerEventsSystem, AudioSource
} from '@dcl/sdk/ecs'
import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { openExternalUrl } from "~system/RestrictedActions"

var isUIVisible = false;

// Function to toggle the visibility of the UI
export function toggleUIVisibility() {
  isUIVisible = !isUIVisible;
  setupUi();
}


export function setupUi() {
  {
    ReactEcsRenderer.setUiRenderer(uiComponent);
  }
}

const uiComponent = () => (
  [

    GitHubLinkUi(),
    descriptionUI(),
    rejectUI()
    // Other UI elements
  ]
)


const rejectUI = () => (

  <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      width: '60%', // Use percentage to make it responsive
      height: '60%', // Use percentage to make it responsive
      position: { left: '20%', top: '20%' }, // Adjust to center the UI
      display: isUIVisible ? 'flex' : 'none'
    }}
    uiBackground={{
      textureMode: 'center',
      texture: {
        src: "images/no-sign.png",

      }
    }}
  >

    <Label
      value="Error: Hodl NFT to Enter"
      fontSize={24}
      color={Color4.White()}
      uiTransform={{ width: '100%', height: 80, alignContent: 'center', margin: '20px' }}
    />

    <UiEntity

      uiTransform={{ width: '35%', height: 50, margin: '10px' }}
    >

      <Button
        value="CANCEL" // using UI text here 
        variant="secondary"

        fontSize={22}
        uiTransform={{ width: '100%', height: 50, margin: '0px' }}


        onMouseDown={() => {
          console.log('Cancel')

          // toggle, hide  the UI 
          toggleUIVisibility();
        }}


      />
    </UiEntity>
  </UiEntity>
)


const projectPath = "NFT Scanner"
const description = "Click the door to try to enter. It will only open if you own NFTs from a specific collection."




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
          src: "assets/scene/Images/gh.png"
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
