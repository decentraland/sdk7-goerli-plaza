import ReactEcs, {
  Button,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { QUEST_STAGES, StageButton } from '../mocked-data/questsData'

export function setupQuestLog() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
let isLoading: Boolean = false
let isInfo: Boolean = false
let isVisible: Boolean = false
let selectedStage: string = 'quest'
let stageDescription: string = 'Navigate trough \nthe cave to collect \nartifacts while \ndefeating cave \nenemies.'
let stageNeeded: number = 0
let stageProgress: number = -1
let progress: string = ''
let isProgressVisible: boolean = false


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
        display: isLoading ? 'none' : 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <UiEntity
        uiTransform={{
          width: canvasInfo.width * 0.1,
          height: canvasInfo.width * 0.1 * 0.216,
          display: 'flex',
          positionType: 'absolute',
          position: { top: '20%', right: '0.5%' }
        }}
        uiText={{ value: 'Quest Info', textAlign: 'middle-left', fontSize: 12, font: 'sans-serif' }}
      />
      <UiEntity
        uiTransform={{
          width: canvasInfo.width * 0.1,
          height: canvasInfo.width * 0.1 * 0.216,
          display: isVisible ? 'none' : 'flex',
          positionType: 'absolute',
          position: { top: '25%', right: '0.5%' }
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: { src: 'images/eventQuests/questInProgress.png' }
        }}
        onMouseDown={openQuestLog}
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
            positionType: 'relative',
            width: canvasInfo.width * 0.3,
            height: (canvasInfo.width * 0.5) / 1.33,
            display: isInfo ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: 'images/eventQuests/questMenuUI2.png'
            }
          }}
        >
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '81%',
              height: '24%',
              margin: { top: '17%' },
              display: isInfo ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: {
                src: 'images/callanQuest/2.png'
              }
            }}
          />
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '80%',
              height: '55%',
              display: isInfo ? 'none' : 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}

          >
            <UiEntity
              uiTransform={{
                positionType: 'relative',
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start',
                justifyContent: 'flex-start'
              }}

            >

              {QUEST_STAGES.slice(1).map((stage, index) => (
                <UiEntity key={index} uiTransform={{ width: '100%', height: '20%' }}>
                  <StageButton
                    title={stage.title}
                    id={stage.id}
                  />
                </UiEntity>
              ))}

            </UiEntity>
            <UiEntity
              uiTransform={{
                positionType: 'relative',
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start',
              }}
            >
              <UiEntity
                uiTransform={{
                  positionType: 'relative',
                  width: '80%',
                  height: '50%',
                  margin: { left: '10%', top: '20%' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'flex-start',
                }}
                uiText={{ value: stageDescription, fontSize: 14, textAlign: 'top-left' }}
              />
              <UiEntity
                uiTransform={{
                  positionType: 'relative',
                  width: '80%',
                  height: '10%',
                  margin: { left: '10%', top: '10%' },
                  display: isProgressVisible ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignSelf: 'flex-start'
                }}
                uiText={{ value: progress, fontSize: 14, textAlign: 'top-left' }}
              />
              <Button
                value=""
                variant="secondary"
                //disabled={stageNeeded == stageProgress}
                uiTransform={{
                  width: '80%',
                  height: '10%',
                  positionType: 'relative',
                  margin: { left: '10%', top: '10%' },
                  display: isProgressVisible ? 'none' : 'flex',
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: 'images/eventQuests/checkProgressButton.png'

                  }
                }}
                onMouseDown={showProgress}
              />
              <Button
                value=""
                variant="secondary"
                //disabled={stageNeeded == stageProgress}
                uiTransform={{
                  width: '80%',
                  height: '10%',
                  positionType: 'relative',
                  margin: { left: '10%', top: '5%' },
                  display: selectedStage == 'quest' ? 'none' : 'flex'
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: stageNeeded == stageProgress
                      ? 'images/eventQuests/claimRewardActive.png'
                      : 'images/eventQuests/claimRewardInactive.png'
                  }
                }}
              />

            </UiEntity>
          </UiEntity>

          <UiEntity
            uiTransform={{
              position: { right: '10%', top: '8%' },
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
        </UiEntity>
      </UiEntity>
    </UiEntity>
  </UiEntity>
)

function changeVisibility() {
  isVisible = !isVisible
}


function StageButton(props: StageButton) {
  return (
    <UiEntity
      uiTransform={{ width: '100%', height: '100%' }}
      uiText={{ value: props.title, textAlign: 'middle-left', fontSize: 18 }}
      onMouseDown={() => setStage(props.id)}
    />
  )
}

function setStage(id: string) {
  const stage = QUEST_STAGES.filter((stage) => stage.id == id)[0]
  stageDescription = stage.info
  stageNeeded = stage.need
  stageProgress = stage.progress
  selectedStage = stage.id
  progress = stage.progress.toString() + '/' + stage.need.toString()
  isProgressVisible = false
}

function openQuestLog() {
  setStage('quest')
  isVisible = true
}

function showProgress() {
  isProgressVisible = true
}