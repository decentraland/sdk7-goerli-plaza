export type IconData = {
  uvs: number[]
  blockWidth: number
}
export type ButtonShapeData = {
  shape: string
  base: string
  isRect: boolean
}

function getUVs(row: number, startBlock: number, width: number): number[] {
  const blockSize = 1 / 16

  return [
    startBlock * blockSize,
    1 - blockSize * (row + 1),
    startBlock * blockSize,
    1 - blockSize * row,
    (startBlock + width) * blockSize,
    1 - blockSize * row,
    (startBlock + width) * blockSize,
    1 - blockSize * (row + 1),

    startBlock * blockSize,
    1 - blockSize * (row + 1),
    startBlock * blockSize,
    1 - blockSize * row,
    (startBlock + width) * blockSize,
    1 - blockSize * row,
    (startBlock + width) * blockSize,
    1 - blockSize * (row + 1)
  ]
}
// SCOREBOARD
// const scoreboardBackgroundLight = 'models/ui/scoreboard_bg.glb'
// const scoreboardBackgroundDark = 'models/ui/scoreboard_bg_dark.glb'

//const scoreBoardBackgroudDefault = 'images/scoreboard_bg.png'
const scoreBoardBackgroudDefault = 'images/scoreboard_bg.png'

//BUTTONS
const squareBase = 'models/ui/button_base_square.glb'
const rectBase = 'models/ui/button_base_rectangle.glb'

const SQUARE_GREEN: ButtonShapeData = {
  shape: 'models/ui/button_square_green.glb',
  base: squareBase,
  isRect: false
}
const SQUARE_RED: ButtonShapeData = {
  shape: 'models/ui/button_square_red.glb',
  base: squareBase,
  isRect: false
}
const SQUARE_YELLOW: ButtonShapeData = {
  shape: 'models/ui/button_square_yellow.glb',
  base: squareBase,
  isRect: false
}
const SQUARE_PURPLE: ButtonShapeData = {
  shape: 'models/ui/button_square_purple.glb',
  base: squareBase,
  isRect: false
}
const SQUARE_WHITE: ButtonShapeData = {
  shape: 'models/ui/button_square_white.glb',
  base: squareBase,
  isRect: false
}
const SQUARE_BLACK: ButtonShapeData = {
  shape: 'models/ui/button_square_black.glb',
  base: squareBase,
  isRect: false
}

const RECT_GREEN: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_green.glb',
  base: rectBase,
  isRect: true
}
const RECT_RED: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_red.glb',
  base: rectBase,
  isRect: true
}
const RECT_YELLOW: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_yellow.glb',
  base: rectBase,
  isRect: true
}
const RECT_PURPLE: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_purple.glb',
  base: rectBase,
  isRect: true
}
const RECT_WHITE: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_white.glb',
  base: rectBase,
  isRect: true
}
const RECT_BLACK: ButtonShapeData = {
  shape: 'models/ui/button_rectangle_black.glb',
  base: rectBase,
  isRect: true
}

//UI atlas
export const uiAtlas = 'images/AtlasGames.png'

//square icons
const checkmark: IconData = { uvs: getUVs(0, 0, 1), blockWidth: 1 }
const close: IconData = { uvs: getUVs(0, 1, 1), blockWidth: 1 }
const restart: IconData = { uvs: getUVs(0, 2, 1), blockWidth: 1 }
const play: IconData = { uvs: getUVs(0, 3, 1), blockWidth: 1 }
const timer: IconData = { uvs: getUVs(0, 4, 1), blockWidth: 1 }
const clock: IconData = { uvs: getUVs(0, 5, 1), blockWidth: 1 }
const results: IconData = { uvs: getUVs(0, 6, 1), blockWidth: 1 }
const sound: IconData = { uvs: getUVs(0, 7, 1), blockWidth: 1 }
const music: IconData = { uvs: getUVs(0, 8, 1), blockWidth: 1 }
const flag: IconData = { uvs: getUVs(0, 9, 1), blockWidth: 1 }
const leftArrow: IconData = { uvs: getUVs(0, 10, 1), blockWidth: 1 }
const rightArrow: IconData = { uvs: getUVs(0, 11, 1), blockWidth: 1 }
const upArrow: IconData = { uvs: getUVs(0, 12, 1), blockWidth: 1 }
const downArrow: IconData = { uvs: getUVs(0, 13, 1), blockWidth: 1 }
const hint: IconData = { uvs: getUVs(0, 14, 1), blockWidth: 1 }
const menu: IconData = { uvs: getUVs(0, 15, 1), blockWidth: 1 }
const person: IconData = { uvs: getUVs(1, 0, 1), blockWidth: 1 }
const retry: IconData = { uvs: getUVs(1, 1, 1), blockWidth: 1 }
const undo: IconData = { uvs: getUVs(1, 2, 1), blockWidth: 1 }
const moves: IconData = { uvs: getUVs(1, 3, 1), blockWidth: 1 }
const lock: IconData = { uvs: getUVs(1, 4, 1), blockWidth: 1 }

// numbers
const numbers: IconData[] = []
for (let i = 0; i < 10; i++) {
  numbers.push({ uvs: getUVs(2, i, 1), blockWidth: 1 })
}

const hashtag: IconData = { uvs: getUVs(2, 10, 1), blockWidth: 1 }
const atSign: IconData = { uvs: getUVs(2, 11, 1), blockWidth: 1 }
const dot: IconData = { uvs: getUVs(2, 12, 1), blockWidth: 1 }
const parenthesesLeft: IconData = { uvs: getUVs(2, 13, 1), blockWidth: 1 }
const parenthesesRight: IconData = { uvs: getUVs(2, 14, 1), blockWidth: 1 }
const exclamation: IconData = { uvs: getUVs(2, 15, 1), blockWidth: 1 }

const scoreText: IconData = { uvs: getUVs(3, 0, 3), blockWidth: 3 }
const levelText: IconData = { uvs: getUVs(3, 3, 3), blockWidth: 3 }
const timeText: IconData = { uvs: getUVs(3, 6, 3), blockWidth: 3 }
const progressText: IconData = { uvs: getUVs(3, 9, 4), blockWidth: 4 }
const exitText: IconData = { uvs: getUVs(3, 13, 3), blockWidth: 3 }

const scoreBoardText: IconData = { uvs: getUVs(4, 0, 5), blockWidth: 5 }
const instructionsText: IconData = { uvs: getUVs(4, 5, 5), blockWidth: 5 }
const playText: IconData = { uvs: getUVs(4, 10, 3), blockWidth: 3 }

export const uiAssets = {
  icons: {
    checkmark,
    close,
    restart,
    play,
    timer,
    clock,
    results,
    sound,
    music,
    flag,
    leftArrow,
    rightArrow,
    upArrow,
    downArrow,
    hint,
    menu,
    person,
    retry,
    undo,
    moves,
    lock,
    hashtag,
    atSign,
    dot,
    parenthesesLeft,
    parenthesesRight,
    exclamation,
    scoreText,
    levelText,
    timeText,
    progressText,
    exitText,
    scoreBoardText,
    instructionsText,
    playText
  },
  shapes: {
    SQUARE_GREEN,
    SQUARE_RED,
    SQUARE_YELLOW,
    SQUARE_PURPLE,
    SQUARE_WHITE,
    SQUARE_BLACK,
    RECT_GREEN,
    RECT_RED,
    RECT_YELLOW,
    RECT_PURPLE,
    RECT_WHITE,
    RECT_BLACK
  },
  numbers,
  scoreboard: {
    scoreBoardBackgroudDefault
  }
}
