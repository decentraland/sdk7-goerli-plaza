import { AudioSource, Material } from "@dcl/sdk/ecs";

export default {
	sounds: {
		alice: 'sounds/alice.mp3',
		bob: 'sounds/bob.mp3',
		charlie: 'sounds/charlie.mp3'
	},
	models: {
		standard: {
			baseScene: 'models/standard/baseScene.glb'
		},
		robots: {
			alice: 'models/robots/alice.glb',
			bob: 'models/robots/bob.glb',
			charlie: 'models/robots/charlie.glb',
			rings: 'models/robots/rings.glb'
		}
	},
	textures: {
		blank: Material.Texture.Common({ src: 'images/ui/blank.png' }),
		buttonE: Material.Texture.Common({ src: 'images/ui/buttonE.png' }),
		buttonF: Material.Texture.Common({ src: 'images/ui/buttonF.png' }),
		leftClickIcon: Material.Texture.Common({ src: 'images/ui/leftClickIcon.png' }),
		textPanel: Material.Texture.Common({ src: 'images/ui/textPanel.png' })
	}
}
