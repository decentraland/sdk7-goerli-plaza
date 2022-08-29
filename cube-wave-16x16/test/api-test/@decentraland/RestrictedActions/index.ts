import { movePlayerTo, triggerEmote, PositionType, Emote, PredefinedEmote } from '@decentraland/RestrictedActions'
import setTimeout from '../../../helper/setTimeout'

movePlayerTo({ x: 4, y: 4, z: 2 })
  .then((...result) => dcl.log('Value of RestrictedActions.movePlayerTo', result))
  .catch((err) => dcl.error('RestrictedACtions.movePlayerTo error', err))

setTimeout(() => {
  triggerEmote({ predefined: PredefinedEmote.CLAP })
    .then((...result) => dcl.log('Value of RestrictedACtions.triggerEmote', result))
    .catch((err) => dcl.error('RestrictedACtions.triggerEmote error', err))
}, 2000)
// /**
//  * move player to a position inside the scene
//  *
//  * @param position PositionType
//  * @param cameraTarget PositionType
//  */
// export function movePlayerTo(newPosition: PositionType, cameraTarget?: PositionType): Promise<void>

// export type PositionType = { x: number; y: number; z: number }

// /**
//  * trigger an emote on the current player
//  *
//  * @param emote the emote to perform
//  */
// export function triggerEmote(emote: Emote): Promise<void>

// export type Emote = {
//   predefined: PredefinedEmote
// }

// export const enum PredefinedEmote {
//   WAVE = 'wave',
//   FIST_PUMP = 'fistpump',
//   ROBOT = 'robot',
//   RAISE_HAND = 'raiseHand',
//   CLAP = 'clap',
//   MONEY = 'money',
//   KISS = 'kiss',
//   TIK = 'tik',
//   HAMMER = 'hammer',
//   TEKTONIK = 'tektonik',
//   DONT_SEE = 'dontsee',
//   HANDS_AIR = 'handsair',
//   SHRUG = 'shrug',
//   DISCO = 'disco',
//   DAB = 'dab',
//   HEAD_EXPLODDE = 'headexplode'
// }
