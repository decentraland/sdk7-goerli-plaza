import { Sprite } from '../utils'

export const npcDialogsSprites: { [key: string]: Sprite } = {
  background: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 22,
    y: 756,
    w: 764,
    h: 246
  },
  click_on_bg_icon: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 792,
    y: 383,
    w: 45,
    h: 60
  },
  available_button: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 509,
    y: 611,
    w: 176,
    h: 46
  },
  unavailable_button: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 509,
    y: 661,
    w: 176,
    h: 46
  },
  f_icon_avaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 730,
    y: 610,
    w: 27,
    h: 26
  },
  e_icon_avaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 695,
    y: 610,
    w: 27,
    h: 26
  },
  f_icon_unavaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 800,
    y: 610,
    w: 27,
    h: 26
  },
  e_icon_unavaialable: {
    atlasSrc: 'images/NPC_dialogue_spritesheet.png',
    atlasSize: { x: 1024, y: 1024 },
    x: 765,
    y: 610,
    w: 27,
    h: 26
  }
}
