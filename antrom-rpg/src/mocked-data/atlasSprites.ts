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
  },
  resources_market_background: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 0,
    y: 60,
    w: 1403,
    h: 974
  },
  resources_market_selected_frame: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 558,
    y: 1032,
    w: 160,
    h: 160
  },
  resources_market_max_button: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 260,
    y: 0,
    w: 85,
    h: 40
  },
  resources_market_max_button_clicked: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 345,
    y: 0,
    w: 85,
    h: 40
  },
  resources_market_purchase_button: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 430,
    y: 0,
    w: 280,
    h: 60
  },
  resources_market_purchase_button_clicked: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 990,
    y: 0,
    w: 280,
    h: 60
  },
  resources_market_purchase_button_unavailable: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 710,
    y: 0,
    w: 280,
    h: 60
  },
  resources_market_sell_button: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 720,
    y: 1034,
    w: 280,
    h: 60
  },
  resources_market_sell_button_clicked: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 1000,
    y: 1034,
    w: 280,
    h: 60
  },
  resources_market_sell_button_unavailable: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 0,
    y: 1094,
    w: 280,
    h: 60
  },
  resources_market_purchase_with_mana_button: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 0,
    y: 1034,
    w: 250,
    h: 54
  },
  resources_market_purchase_with_mana_button_clicked: {
    atlasSrc: 'images/resourcemarket_spritesheet.png',
    atlasSize: { x: 1403, y: 1194 },
    x: 250,
    y: 1034,
    w: 250,
    h: 54
  },
  berry: {
    atlasSrc: 'images/item_spritesheet.png',
    atlasSize: { x: 1536, y: 1280 },
    x: 0,
    y: 0,
    w: 256,
    h: 256
  },
  bone: {
    atlasSrc: 'images/item_spritesheet.png',
    atlasSize: { x: 1536, y: 1280 },
    x: 256,
    y: 0,
    w: 256,
    h: 256
  },
  coins: {
    atlasSrc: 'images/item_spritesheet.png',
    atlasSize: { x: 1536, y: 1280 },
    x: 768,
    y: 0,
    w: 256,
    h: 256
  },
  token: {
    atlasSrc: 'images/item_spritesheet.png',
    atlasSize: { x: 1536, y: 1280 },
    x: 1280,
    y: 0,
    w: 256,
    h: 256
  },
  mana_coin: {
    atlasSrc: 'images/item_spritesheet.png',
    atlasSize: { x: 1536, y: 1280 },
    x: 0,
    y: 0,
    w: 100,
    h: 100
    // atlasSrc: 'images/item_spritesheet.png',
    // atlasSize: { x: 1536, y: 1280 },
    // x: 180,
    // y: 0,
    // w: 40,
    // h: 40
  }
}

// "frames": {
//         "Lbutton.png": {
//             "frame": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "Lbutton bw.png": {
//             "frame": {
//                 "x": 60,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "Lbutton clicked.png": {
//             "frame": {
//                 "x": 120,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "MANA_Icon.png": {
//             "frame": {
//                 "x": 180,
//                 "y": 0,
//                 "w": 40,
//                 "h": 40
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 40,
//                 "h": 40
//             },
//             "sourceSize": {
//                 "w": 40,
//                 "h": 40
//             }
//         },
//         "Resource Market Frame.png": {
//             "frame": {
//                 "x": 0,
//                 "y": 60,
//                 "w": 1403,
//                 "h": 974
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 1403,
//                 "h": 974
//             },
//             "sourceSize": {
//                 "w": 1403,
//                 "h": 974
//             }
//         },
//         "exit button.png": {
//             "frame": {
//                 "x": 220,
//                 "y": 0,
//                 "w": 40,
//                 "h": 40
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 40,
//                 "h": 40
//             },
//             "sourceSize": {
//                 "w": 40,
//                 "h": 40
//             }
//         },
//         "max_button.png": {
//             "frame": {
//                 "x": 260,
//                 "y": 0,
//                 "w": 85,
//                 "h": 40
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 85,
//                 "h": 40
//             },
//             "sourceSize": {
//                 "w": 85,
//                 "h": 40
//             }
//         },
//         "max_button_clicked_(1).png": {
//             "frame": {
//                 "x": 345,
//                 "y": 0,
//                 "w": 85,
//                 "h": 40
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 85,
//                 "h": 40
//             },
//             "sourceSize": {
//                 "w": 85,
//                 "h": 40
//             }
//         },
//         "purchase button.png": {
//             "frame": {
//                 "x": 430,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         },
//         "purchase button bw.png": {
//             "frame": {
// "x": 710,
// "y": 0,
// "w": 280,
// "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         },
//         "purchase button clicked.png": {
//             "frame": {
// "x": 990,
// "y": 0,
// "w": 280,
// "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         },
//         "purchase_with_MANA_button.png": {
//             "frame": {
// "x": 0,
// "y": 1034,
// "w": 250,
// "h": 54
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 250,
//                 "h": 54
//             },
//             "sourceSize": {
//                 "w": 250,
//                 "h": 54
//             }
//         },
//         "purchase_with_MANA_button_clicked.png": {
//             "frame": {
// "x": 250,
// "y": 1034,
// "w": 250,
// "h": 54
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 250,
//                 "h": 54
//             },
//             "sourceSize": {
//                 "w": 250,
//                 "h": 54
//             }
//         },
//         "rtbutton.png": {
//             "frame": {
//                 "x": 1270,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "rtbutton bw.png": {
//             "frame": {
//                 "x": 1330,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "rtbutton clicked.png": {
//             "frame": {
//                 "x": 500,
//                 "y": 1034,
//                 "w": 60,
//                 "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 60,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 60,
//                 "h": 60
//             }
//         },
//         "selection frame.png": {
//             "frame": {
//                 "x": 560,
//                 "y": 1034,
//                 "w": 160,
//                 "h": 160
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 160,
//                 "h": 160
//             },
//             "sourceSize": {
//                 "w": 160,
//                 "h": 160
//             }
//         },
//         "sell button.png": {
//             "frame": {
// "x": 720,
// "y": 1034,
// "w": 280,
// "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         },
//         "sell button clicked.png": {
//             "frame": {
// "x": 1000,
// "y": 1034,
// "w": 280,
// "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         },
//         "sell button unavailable.png": {
//             "frame": {
// "x": 0,
// "y": 1094,
// "w": 280,
// "h": 60
//             },
//             "rotated": false,
//             "trimmed": false,
//             "spriteSourceSize": {
//                 "x": 0,
//                 "y": 0,
//                 "w": 280,
//                 "h": 60
//             },
//             "sourceSize": {
//                 "w": 280,
//                 "h": 60
//             }
//         }
//     },
//     "meta": {
//         "app": "http://www.codeandweb.com/texturepacker",
//         "version": "1.0",
//         "image": "spritesheet.png",
//         "format": "RGBA8888",
//         "size": {
//             "w": 1403,
//             "h": 1194
//         },
//         "scale": "1"
//     }
// }
