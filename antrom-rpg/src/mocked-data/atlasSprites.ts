import { Coords } from '@dcl/sdk/ecs'

export interface Sprite {
  atlasSrc: string
  atlasSize: Coords
  x: number
  y: number
  w: number
  h: number
}

export const antromSprites: { [key: string]: Sprite } = {
  npc_dialog_background: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 22,
    y: 756,
    w: 764,
    h: 246
  },
  npc_dialog_click_on_bg_icon: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 792,
    y: 383,
    w: 45,
    h: 60
  },
  npc_dialog_available_button: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 509,
    y: 611,
    w: 176,
    h: 46
  },
  npc_dialog_unavailable_button: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 509,
    y: 661,
    w: 176,
    h: 46
  },
  npc_dialog_f_icon_avaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 730,
    y: 610,
    w: 27,
    h: 26
  },
  npc_dialog_e_icon_avaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 695,
    y: 610,
    w: 27,
    h: 26
  },
  npc_dialog_f_icon_unavaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 800,
    y: 610,
    w: 27,
    h: 26
  },
  npc_dialog_e_icon_unavaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 765,
    y: 610,
    w: 27,
    h: 26
  }
}
