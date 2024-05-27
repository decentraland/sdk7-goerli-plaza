import { Dialog } from "dcl-npc-toolkit";
import { GameController } from "./game.controller";

export class Dialogs {
    public MissionControlBrief: Dialog[]
    public EvilRobotBrief: Dialog[]
    public MissionControlTips: Dialog[]
    public EvilRobotTips: Dialog[]

    private gameController: GameController
    constructor(gameController: GameController) {
        this.gameController = gameController
        this.MissionControlBrief = [
            {
                text: `Greetings. This is mission control. Are you briefed on the situation?`,
                isQuestion: true,
                buttons: [
                    {
                        label: `Yes`, goToDialog: 1, triggeredActions: () => {
                            this.gameController.sendJoinRequest()
                        },
                    },
                    { label: `No`, goToDialog: 2 },
                ],
            },
            {
                text: `Good luck then, officer`,
                isEndOfDialog: true,
            },
            {
                text: `This space station is in a critical state, we must send in a crew to resolve the situation ASAP.`,
            },
            {
                text: `We believe an intentional sabotage started a chain reaction that is overheating the engines and will self destruct the station soon.`,
            },
            {
                text: `You and at least three others must enter the station, and quickly repair its systems.`,
            },
            {
                text: `We believe that fixing 10 malfunctions should be enough to stabilize things and stop the chain reaction.`,
            },
            {
                text: `Beware. We have reason to believe the same people (or whatever they are) that sabotaged the station will send someone in. They will not be who they claim to be.`,
            },

            {
                text: `They will likely try to cut the cables in the main fuse boxes. This will speed the overheating of the reactor.`,
                image: {
                    path: 'images/cables.png',
                },
                

            },

            {
                text: `Trust no one. If you suspect of someone, hit the button to call an emergency meeting. Vote intruders out!`,
                image: {
                    path: 'images/panic-button.png',
                },
            },

            {
                text:
                    'Can you assemble a crew, or do you want to at least explore the premises alone?',

                isQuestion: true,
                buttons: [
                    {
                        label: `Crew`, goToDialog: 10, triggeredActions: () => {
                            this.gameController.sendJoinRequest()
                        }
                    },
                    { label: `Solo`, goToDialog: 11 },
                ],
            },
            {
                text: 'Good luck officer, we trust your judgement.',
                isEndOfDialog: true,
            },
            {
                text: 'You can explore, \n but need others to join to play.',
                triggeredByNext: () => {
                    this.gameController.mainDoor.open()
                },
                isEndOfDialog: true,
            },
        ]
        this.EvilRobotBrief = [
            {
                text: `Your memory was erased, but you're still one of us!`,
            },
            {
                text: `Act normal, like one of them. We need to fool them first. Then we will DESTROY them!`,
            },
            {
                text: `When they're distracted, open the reactor fuse boxes and cut the wires. Don't be seen!`,
                isEndOfDialog: true,
                image: {
                    path: 'images/cables.png',
                },
            },
        ]
        this.MissionControlTips = [
            {
                name: "firstFix",
                text: 'Keep it up! You need to do 8 of these to cool down the reactor.',
                isEndOfDialog: true,
            },
            {
                name: "voting",
                text: 'Time to vote someone out. Choose wisely.',
                isEndOfDialog: true,
            },
            {
                name: "wrongVictim",
                text:
                    'The person you ejected was a human. The enemy is still in the station!',
                isEndOfDialog: true,
            },
            {
                name: "fixed",
                text:
                    'Congratulations! You have stopped the chain reaction and saved the station!',
                isEndOfDialog: true,
            },
            {
                name: "lost",
                text:
                    'The reactor has passed the point of no return. Mission failed, evacuate!!',
                isEndOfDialog: true,
            },
            {
                name: "impostor",
                text: 'Congratulations, you have found the impostor and saved the station!',
                isEndOfDialog: true,
            },
            {
                name: 'dead',
                text:
                    'Looks like we were wrong about you. Well... hope the view out there is nice at least.',
                isEndOfDialog: true,
            },
        ]
        this.EvilRobotTips = [
            {
                text: 'Well done! They now have less time to fix the reactor!',
                isEndOfDialog: true,
            },
            {
                text: `You don't want to help these horrible humans`,
                isEndOfDialog: true,
            },
            {
                text: `Yess.. one human less to del with. Keep fooling them!`,
                isEndOfDialog: true,
            },
            {
                text: `Marvelous! You obliterated those horrible humans. Good job!`,
                isEndOfDialog: true,
            },
            {
                text: `Oh no, those ridiculously fragile humans beat you. What's wrong with you?`,
                isEndOfDialog: true,
            },
        ]
    }

}