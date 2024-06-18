import { engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { openExternalUrl } from '~system/RestrictedActions'

const projectPath = "ui-spritesheet"
const description = "A simple sprite sheet animation, a UI image switches between several frames to give the illusion of movement."
const Max_Chars = 45

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(() => [
    drawSprite(),
    GitHubLinkUi(),
    descriptionUI()
    // Other UI elements
  ])

}

// how many sprites in each row
let countU = 4
// how many rows of sprites
let countV = 2

//width of each sprite grid-cell
let stepU = 1 / countU

//height of each sprite grid-cell
let stepV = 1 / countV

// iterators to address each sprite by coords
let currentSpriteU = 0
let currentSpriteV = 0

// sprite animation system's counter and update frequency
let elapsed = 0
let freq = 0.08

function drawSprite() {
  return <UiEntity
    uiTransform={{
      width: 240,
      height: 480,
      margin: '16px 0 8px 270px',
      padding: 4,
      position: { top: '40%', left: 120 }
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        margin: '0 0'
      }}
      uiBackground={{
        textureMode: 'stretch',
        //
        // for UV coord guidance check images/uv_on_sdk7_ui.png
        // below is the logic for mapping the UV of each sprite dynamically by currentSpriteU and currentSpriteV
        //
        uvs: [
          currentSpriteU * stepU, 1 - ((currentSpriteV + 1) * stepV),
          currentSpriteU * stepU, 1 - (currentSpriteV * stepV),
          (currentSpriteU + 1) * stepU, 1 - (currentSpriteV * stepV),
          (currentSpriteU + 1) * stepU, 1 - ((currentSpriteV + 1) * stepV)
        ],
        texture: {
          src: 'images/walk_anim_sprite.png',
        },
      }}
      uiText={{ value: '', fontSize: 18 }}
    />
  </UiEntity>
}

// system to step along each sprite in each row with the given frequency
export function SpriteAnimSystem(dt: number) {

  elapsed += dt
  if (elapsed >= freq) {

    currentSpriteU += 1

    if (currentSpriteU >= countU) {
      currentSpriteU = 0
      currentSpriteV += 1
    }

    if (currentSpriteV >= countV) {

      currentSpriteU = 0
      currentSpriteV = 0
    }

    elapsed = 0
  }
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

  const multiLineDescription = breakLines(description, Max_Chars)

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
        value={multiLineDescription}
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


function breakLines(text: string, linelength: number) {
  const lineBreak = '\n'
  var counter = 0
  var line = ''
  var returnText = ''
  var bMatchFound = false
  const lineLen = linelength ? linelength : 50


  if (!text) return ''
  if (text.length < lineLen + 1) { return text }

  while (counter < text.length) {
    line = text.substring(counter, counter + lineLen);
    bMatchFound = false
    if (line.length == lineLen) {
      for (var i = line.length; i > -1; i--) {
        if (line.substring(i, i + 1) == ' ') {
          counter += line.substring(0, i).length
          line = line.substring(0, i) + lineBreak
          returnText += line
          bMatchFound = true
          break
        }
      }

      if (!bMatchFound) {
        counter += line.length
        line = line + lineBreak
        returnText += line
      }
    }
    else {
      returnText += line
      break // We're breaking out of the the while(), not the for()
    }
  }

  return returnText
}
