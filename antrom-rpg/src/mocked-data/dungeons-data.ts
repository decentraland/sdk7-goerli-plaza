export const DUNGEONS: Option[] = [
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon1Avail.png',
      'images/chooseDungeon/dungeon1Unavail.png'
    ],
    id: 'dungeon1'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon2Avail.png',
      'images/chooseDungeon/dungeon2Unavail.png'
    ],
    id: 'dungeon2'
  },
  {
    visible: true,
    available: false,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon3Avail.png',
      'images/chooseDungeon/dungeon3Unavail.png'
    ],
    id: 'dungeon3'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon4Avail.png',
      'images/chooseDungeon/dungeon4Unavail.png'
    ],
    id: 'dungeon4'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon5Avail.png',
      'images/chooseDungeon/dungeon5Unavail.png'
    ],
    id: 'dungeon5'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon6Avail.png',
      'images/chooseDungeon/dungeon6Unavail.png'
    ],
    id: 'dungeon6'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/dungeon7Avail.png',
      'images/chooseDungeon/dungeon7Unavail.png'
    ],
    id: 'dungeon7'
  }
]

export const DIFFICULTIES: Option[] = [
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/easy.png',
      'images/chooseDungeon/easyUnavail.png'
    ],
    id: 'easy'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/medium.png',
      'images/chooseDungeon/mediumUnavail.png'
    ],
    id: 'medium'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/hard.png',
      'images/chooseDungeon/hardUnavail.png'
    ],
    id: 'hard'
  },
  {
    visible: true,
    available: true,
    selected: false,
    imgSources: [
      'images/chooseDungeon/nightmare.png',
      'images/chooseDungeon/nightmareUnavail.png'
    ],
    id: 'nightmare'
  }
]

export const DUNGEONS_TO_SHOW = 3

export type Option = {
  visible: boolean
  available: boolean
  selected: boolean
  imgSources: string[]
  id: string
}

export type OptionWithArray = Option & {
  array: Option[]
}