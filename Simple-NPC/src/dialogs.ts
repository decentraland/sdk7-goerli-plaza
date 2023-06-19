import { Dialog } from 'dcl-npc-toolkit'

export let testscript: Dialog[] = [
  {
    text: `Hi there! Welcome to the example npc scene.`
    // portrait: {
    //   path: 'images/npc.png'
    // }
  },
  {
    text: `Can you help me finding my missing gems? Can you help me finding my missing gems? Can you help me finding my missing gems?`,
    isQuestion: true,
    buttons: [
      { label: `Yes!`, goToDialog: 2 },
      { label: `I'm busy`, goToDialog: 4 }
      // { label: `Leave me alone`, goToDialog: 4, triggeredActions:()=>{
      //   console.log('yes i clicked leave me alone')
      // } }
    ]
  },
  {
    text: `Ok, awesome, thanks!`
  },
  {
    text: `I need you to find 10 gems scattered around this scene, go find them!`,
    isEndOfDialog: true
  },
  {
    text: `Ok, come back soon`,
    isEndOfDialog: true,
    name: 'testing'
  }
]

export let dogeDialog = [
  {
    text: 'Show doge'
  },
  {
    text: 'Happy Robot',
    portrait: {
      path: 'images/simone/happy1.png'
    }
  },
  {
    text: 'go back to doge'
  },
  {
    text: 'Surprised Robot',
    portrait: {
      path: 'images/simone/surprise1.png'
    }
  },
  {
    text: 'go back to doge'
  },
  {
    text: 'Sad Robot',
    portrait: {
      path: 'images/simone/sad1.png'
    }
  },
  {
    text: 'End',
    isEndOfDialog: true
  }
]
