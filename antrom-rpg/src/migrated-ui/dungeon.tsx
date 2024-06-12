import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  Button,
  Label,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { engine } from '@dcl/sdk/ecs'
import { DAILY_FREE_TOKENS, DIFFICULTIES, DUNGEONS, DUNGEONS_TO_SHOW, Option, OptionWithArray, PREMIUM_TOKENS, SEASON_PASS } from '../mocked-data/dungeonsData'

export function setupDungeonSelectionUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
let isLoading: Boolean = false
let isInfo: Boolean = false
let isVisible: Boolean = false
let scrollPosition: number = 0
let selectedDungeon: string = ''
let selectedDifficulty: string = ''
let isPlayable: Boolean = false


const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '100%',
    }}>
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        display: isLoading ? 'flex' : 'none'
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: { src: getLoadingImage() }
      }}
    />
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        display: isLoading ? 'none' : 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <UiEntity
        uiTransform={{
          width: '10%',
          height: '100%',
          display: isVisible ? 'none' : 'flex'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: { src: 'images/dungeon.png' }
        }}
        onMouseDown={openDungeonSelection}
      />
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '100%',
          height: '100%',
          display: isVisible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <UiEntity
          uiTransform={{
            position: { right: 80 },
            positionType: 'absolute',
            width: '250',
            height: '300',
            display: isVisible ? 'flex' : 'none',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column'
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/DungeonTokens.png' }
          }}
        >
          <Label
            uiTransform={{ width: '25%', height: '22%' }}
            value={DAILY_FREE_TOKENS.toString()}
            color={Color4.Black()}
            fontSize={29}
          />
          <Label
            uiTransform={{ width: '25%', height: '22%' }}
            value={PREMIUM_TOKENS.toString()}
            color={Color4.Black()}
            fontSize={29}
          />
          <Label
            uiTransform={{
              width: '25%',
              height: '22%',
              margin: { bottom: '5%' }
            }}
            value={SEASON_PASS.toString()}
            color={Color4.Black()}
            fontSize={29}
          />
        </UiEntity>

        <UiEntity
          uiTransform={{
            width: canvasInfo.width * 0.5,
            height: (canvasInfo.width * 0.5) / 1.33,
            display: isInfo ? 'flex' : 'none'
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: 'images/chooseDungeon/dungeonInfoFrame.png'
            }
          }}
        >
          <Button
            value=""
            variant="secondary"
            uiTransform={{
              width: '20%',
              height: '8%',
              positionType: 'absolute',
              position: { bottom: '5%', left: '40%' }
            }}
            uiBackground={{
              textureMode: 'center',
              texture: {
                src: 'images/chooseDungeon/back.png'
              }
            }}
            onMouseDown={changeInfo}
          />
        </UiEntity>
        <UiEntity
          uiTransform={{
            positionType: 'relative',
            width: canvasInfo.width * 0.5,
            height: (canvasInfo.width * 0.5) / 1.33,
            display: isInfo ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: 'images/chooseDungeon/dungeonSelectionFrame.png'
            }
          }}
        >
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              position: { top: '32%' },
              width: '80%',
              height: '50',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <UiEntity
              uiTransform={{
                width: '10%',
                height: '70%'
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: { src: 'images/chooseDungeon/arrowLeft.png' }
              }}
              onMouseDown={scrollLeft}
            />

            {DUNGEONS.slice(
              scrollPosition,
              scrollPosition + DUNGEONS_TO_SHOW
            ).map((dungeon, index) => (
              <UiEntity key={index} uiTransform={{ width: '25%', height: '80%' }}>
                <OptionButton
                  array={DUNGEONS}
                  visible={dungeon.visible}
                  available={dungeon.available}
                  selected={dungeon.selected}
                  imgSources={dungeon.imgSources}
                  id={dungeon.id}
                />
              </UiEntity>
            ))}

            <UiEntity
              uiTransform={{
                width: '10%',
                height: '70%'
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: { src: 'images/chooseDungeon/arrowRight.png' }
              }}
              onMouseDown={scrollRight}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              position: { top: '55%' },
              width: '60%',
              height: '50',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            {DIFFICULTIES.map((difficulty, index) => (
              <UiEntity
                key={index}
                uiTransform={{ width: '40%', height: '80%', margin: '2%' }}
              >
                <OptionButton
                  array={DIFFICULTIES}
                  visible={difficulty.visible}
                  available={difficulty.available}
                  selected={difficulty.selected}
                  imgSources={difficulty.imgSources}
                  id={difficulty.id}
                />
              </UiEntity>
            ))}
          </UiEntity>

          <Button
            value=""
            variant="secondary"
            disabled={!isPlayable}
            uiTransform={{
              width: '20%',
              height: '40',
              position: { bottom: '5%', left: '40%' },
              positionType: 'absolute'
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: {
                src: isPlayable
                  ? 'images/chooseDungeon/playAvail.png'
                  : 'images/chooseDungeon/playUnavail.png'
              }
            }}
            onMouseDown={playDungeon}
          />
          <UiEntity
            uiTransform={{
              position: { right: '3%', top: '23%' },
              positionType: 'absolute',
              width: '25',
              height: '25'
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: { src: 'images/chooseDungeon/exitButton.png' }
            }}
            onMouseDown={changeVisibility}
          />
          <UiEntity
            uiTransform={{
              position: { left: '3%', top: '23%' },
              positionType: 'absolute',
              width: '25',
              height: '25'
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: { src: 'images/chooseDungeon/help.png' }
            }}
            onMouseDown={changeInfo}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  </UiEntity>
)

function changeVisibility() {
  isVisible = !isVisible
}

function scrollRight() {
  if (scrollPosition < DUNGEONS.length - DUNGEONS_TO_SHOW) {
    scrollPosition++
  }
}

function scrollLeft() {
  if (scrollPosition > 0) {
    scrollPosition--
  }
}

function OptionButton(props: OptionWithArray) {
  return (
    <UiEntity
      uiTransform={{ width: '100%', height: '100%' }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: props.available ? props.imgSources[0] : props.imgSources[1]
        }
      }}
      onMouseDown={() => selectOption(props.id, props.array)}
    >
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { top: '-25%', left: '-10%' },
          width: '25%',
          height: '100%',
          display: props.selected ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: { src: 'images/chooseDungeon/selectionIcon.png' }
        }}
      />
    </UiEntity>
  )
}

function selectOption(id: string, array: Option[]) {
  let isDungeon: boolean = false
  let isDifficulty: boolean = false
  if (array === DUNGEONS) {
    isDungeon = true
  } else if (array === DIFFICULTIES) {
    isDifficulty = true
  }

  const selectedOption = array.filter((option) => option.id == id)[0]
  if (selectedOption.available) {
    if (selectedOption.selected) {
      selectedOption.selected = false
      if (isDungeon) {
        selectedDungeon = ''
      } else if (isDifficulty) {
        selectedDifficulty = ''
      }
      isPlayable = false
    } else {
      for (const option of array) {
        option.selected = false
      }
      selectedOption.selected = true
      if (isDungeon) {
        selectedDungeon = selectedOption.id
        getLoadingImage()
      } else if (isDifficulty) {
        selectedDifficulty = selectedOption.id
      }
      if (selectedDifficulty != '' && selectedDungeon != '') {
        isPlayable = true
      }
    }
  }
}

// Toggles view between “info” or “select dungeon”.
function changeInfo() {
  isInfo = !isInfo
}
// Time to timeout the loading screen (because there isn't nothing to load)
let timer: number = 2
export function loadingDungeonSystem(dt: number) {
  if (timer - dt <= 0 && isLoading) {
    isLoading = false
    timer = 2
    engine.removeSystem(loadingDungeonSystem)
    isVisible = false
  } else {
    timer = timer - dt
  }
}


function getLoadingImage() {
  if (selectedDungeon === 'dungeon2') {
    return 'images/Loading_The_Cave.png'
  }
  return 'images/Loading_The_Dungeon.png'
}

function playDungeon() {
  engine.addSystem(loadingDungeonSystem)
  isLoading = true
}

function openDungeonSelection() {
  for (const dungeon of DUNGEONS) {
    dungeon.selected = false
  }
  for (const difficulty of DIFFICULTIES) {
    difficulty.selected = false
  }
  isLoading = false
  isInfo = false
  isVisible = true
  scrollPosition = 0
  selectedDungeon = ''
  selectedDifficulty = ''
  isPlayable = false
}