import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { openExternalUrl } from '~system/RestrictedActions'
import { createDispenserUi } from './dispenser/claiming/ui/dispenserUi'

const projectPath = "reward-claim"
const description = "Claim a wearable by clicking on the dispenser. You must be connected with your wallet to the Sepolia network. After submitting a captcha the wearable will arrive over the next couple of minutes."



const uiComponent = () => (
  [
    GitHubLinkUi(),
    descriptionUI(),
    createDispenserUi()
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