import { Color4, Scalar } from "@dcl/sdk/math"
import ReactEcs from "@dcl/sdk/react-ecs"
import { GameController } from "../game.controller"
import WordTyperUi from "../ui/minigames/WordTyper"

export class WordTyper {
  public color: Color4 | undefined
  inputValue: string = ''
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
  onWinCallback: () => void
  gameController: GameController
  constructor(gameController: GameController, onWinCallback: () => void) {
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
    return <WordTyperUi
      visible={this.visibleUi}
      currentChallengeWord={this.currentChallengeWord}
      onSuccess={() => this.AddSuccess(1)}
      successScore={this.currentSuccesses}
      successNeeded={this.successNeeded}
      onValueChange={(value: string) => this.inputValue = value}
      currentValue={this.inputValue}
    />
  }


}