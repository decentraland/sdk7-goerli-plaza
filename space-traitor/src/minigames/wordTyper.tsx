import ReactEcs, { Input, Label, ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs"
import { Color4, Scalar } from "@dcl/sdk/math"
import { GameController } from "../game.controller"


export class WordTyper {
  public color: Color4 | undefined
  successNeeded = 3
  currentSuccesses = 0
  started: boolean
  randomWords = [
    'HOLY',
    'MOLLY',
    'SALMONOMICON',
    'DECENTRALAND',
    'SCIFI',
    'DROID',
    'ROBOT',
    'AIR',
    'MARS',
    'KITCHEN',
    'CHIPA',
    'PHILIP',
    'HACKATHON',
    'MANA',
    'LAND',
    'SYNTHWAVE',
    'JOJO',
  ]
  currentChallengeWord = ''
  visibleUi = false
  onWinCallback: () => any
  gameController: GameController
  constructor(gameController: GameController, onWinCallback: () => any) {
    this.gameController = gameController
    this.onWinCallback = onWinCallback
    this.started = false
    this.UpdateHeaderText()
  }
  Reset() {
    this.currentSuccesses = 0
    this.started = false
  }

  Start() {
    this.started = true
    this.visibleUi = true
  }

  Stop() {
    this.Reset()
    this.visibleUi = false
  }
  Win() {
    this.visibleUi = false
    this.onWinCallback()
  }
  AddSuccess(newSuccesses: number) {
    if (newSuccesses <= 0) return

    this.currentSuccesses += newSuccesses
    this.UpdateHeaderText()

    if (this.currentSuccesses >= this.successNeeded) {
      this.Win()
      return
    }
  }
  UpdateHeaderText() {
    this.currentChallengeWord = this.GetRandomWord()
  }
  GetRandomWord(): string {
    let finalWord = ''

    const randomIndex = Math.floor(
      Scalar.randomRange(0, this.randomWords.length)
    )

    const selectedWord = this.randomWords[randomIndex]

    // Randomize upper-lower casing
    for (let index = 0; index < selectedWord.length; index++) {
      const currentChar = selectedWord.charAt(index)
      finalWord +=
        Scalar.randomRange(0, 1) > 0.5
          ? currentChar.toUpperCase()
          : currentChar.toLowerCase()
    }
    return finalWord
  }
  mainUi() {
    return <UiEntity
      uiTransform={{
        width: 800,
        height: 600,
        margin: '10% 50px 50% 30%',
        position: { top: '0%' },
        padding: { top: 4, bottom: 4, left: 4, right: 4 },
        display: this.visibleUi ? 'flex' : 'none',
      }}
    >
      <UiEntity
        uiTransform={{
          width: 800,
          height: 600,
          maxWidth: '100%',
          maxHeight: '100%',
          minHeight: '12%',
          minWidth: '15%',
          positionType: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        uiBackground={{
          color: Color4.fromHexString('#342E39'),
          textureMode: 'stretch'
        }}
      >
        {/* Label - Title */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '9%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '0%', left: '0%' },
          }}
          value={"TYPE THE NEXT WORD: \n" + this.currentChallengeWord}
          fontSize={30}
          font='sans-serif'
          color={Color4.Green()}
        />
        {/* Input - Word */}
        <Input
          uiTransform={{
            position: {
              left: '0%',
              top: '20%',
            },
            width: '300px',
            height: '70px',
          }}
          textAlign='middle-center'
          fontSize={18}
          placeholder={'Type Word Here'}
          color={Color4.White()}
          placeholderColor={Color4.Gray()}
          onSubmit={(value: string) => {
            if (value.localeCompare(this.currentChallengeWord) === 0) {
              this.AddSuccess(1)
            }
          }}
        ></Input>
        {/* Label - Success */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '80%', left: '0%' },
          }}
          fontSize={40}
          font='sans-serif'
          value={"SUCCESS: " + this.currentSuccesses + "/" + this.successNeeded}
          color={Color4.Yellow()}
        />
      </UiEntity>
    </UiEntity>
  }

}