export const QUEST_STAGES: Stage[] = [
  // id quest is for general information, when no stage is selected
  {
    progress: -1,
    need: 0,
    title: '',
    info: 'Cavern \nConfrontation: The \nBeast within \n(HARD)',
    id: 'quest'
  },
  {
    progress: 1,
    need: 5,
    title: 'The Request',
    info: 'Navigate trough \nthe cave to collect \nartifacts while \ndefeating cave \nenemies.',
    id: 'stage1'
  },
  {
    progress: 0,
    need: 2,
    title: 'Stage 2',
    info: 'Stage 2 \nInfo.',
    id: 'stage2'
  },
  {
    progress: 3,
    need: 3,
    title: 'Stage 3',
    info: 'Stage 3 \nInfo.',
    id: 'stage3'
  }

]

export type StageData = {
  progress: number,
  need: number,
  info: string,
}

export type StageButton = {
  title: string,
  id: string
}

export type Stage = StageButton & StageData