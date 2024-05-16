export type DialogButton = {
  label: string
  triggeredAction?: void
  goToDialog: string
}

export type Dialog = {
  id: string
  text: string
  portraitSource: string
  isQuestion: boolean
  buttons: DialogButton[]
  isEndOfDialog?: boolean
}

export const BONE_TRADER_DIALOGS: Dialog[] = [
  {
    id: 'bone-trader-1',
    text: `My son said I'm a hoarder, and I have way too much BONES.`,
    portraitSource: 'images/pfp/advBoneTrader.png',
    isQuestion: false,
    buttons: []
  },
  {
    id: 'bone-trader-2',
    text: `Might you be interested in making a purchase?`,
    portraitSource: 'images/pfp/advBoneTrader.png',
    isQuestion: true,
    buttons: [
      { label: 'Yes', goToDialog: 'bone-trader-yes' },
      { label: 'No', goToDialog: 'bone-trader-no' }
    ]
  },
  {
    id: 'bone-trader-yes',
    text: `Thank you!`,
    portraitSource: 'images/pfp/advBoneTrader.png',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    id: 'bone-trader-no',
    text: `Have a great day!`,
    portraitSource: 'images/pfp/advBoneTrader.png',
    buttons: [],
    isQuestion: false,
    isEndOfDialog: true
  }
]
