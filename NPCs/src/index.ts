import { engine, executeTask, Material } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'


// export all the functions required to make the scene work
export * from '@dcl/sdk'
import * as npc from '@dcl-sdk/npc-utils'
import resources from './resources'
import { Dialog } from '@dcl-sdk/npc-utils'
import { NPCBodyType } from '@dcl-sdk/npc-utils/dist/types'


export let alice = npc.create(
	{
		position: Vector3.create(8, 1.6, 5),
		rotation: Quaternion.fromEulerDegrees(0, 180, 0),
		scale: Vector3.create(1, 1, 1)
	},
	{
		type: npc.NPCType.CUSTOM,
		model: resources.models.robots.alice,
		onActivate: () => {
			console.log('npc activated')
			npc.playAnimation(alice, `Hello`, true, 1.20)
			npc.talk(alice, ILoveCats, 0)
		},
		onWalkAway: () => { console.log('test on walk away function') },
		faceUser: true,
		dialogSound: resources.sounds.alice,
		coolDownDuration: 3
	}
)

export let ILoveCats: Dialog[] = [
	{
		text: `I really lo-ove cats`,
		isEndOfDialog: true
	}
]



export let bob = npc.create(
	{
		position: Vector3.create(8, 1.6, 8),
		rotation: Quaternion.fromEulerDegrees(0, 180, 0),
		scale: Vector3.create(1, 1, 1)
	},
	{
		type: npc.NPCType.AVATAR,
		body: NPCBodyType.FEMALE,

		model: resources.models.robots.alice,
		onActivate: () => {
			console.log('npc activated')
			npc.playAnimation(bob, `Hello`, true, 1.20)
			npc.talk(bob, ILoveCats, 0)
		},
		onWalkAway: () => { console.log('test on walk away function') },
		faceUser: true,
		dialogSound: resources.sounds.bob,
		coolDownDuration: 3
	}
)