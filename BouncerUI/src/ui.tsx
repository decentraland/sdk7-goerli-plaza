import {
	engine,
	executeTask,
	InputAction,
	inputSystem,
	PointerEventType,
	Transform,
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { getUserData } from '~system/UserIdentity'
import { MessageBus } from '@dcl/sdk/message-bus'
import { movePlayerTo, openExternalUrl } from '~system/RestrictedActions'

import * as ui from 'dcl-ui-toolkit'

const DEBUG_MODE: boolean = true


const sceneMessageBus = new MessageBus()

var authorized: boolean = false
// ADD ADMINS HERE 
export const allowListedIds = ['SceneAdmin', 'Dogman', 'Doggo']


export function setupUi() {
	checkAuth()

	engine.addSystem(() => {
		if (authorized) {
			if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
				annPrompt.show()
			}
			if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {

				bouncePrompt.show()
			}
		}
	})

	const uiComponent = () => (
		[
			ui.render(),
			GitHubLinkUi()
		]
	)

	ReactEcsRenderer.setUiRenderer(uiComponent)

}




// UIs for admin player

const annPrompt = ui.createComponent(ui.FillInPrompt, {
	title: 'Announcement?',
	onAccept: (value: string) => {
		console.log('accepted values:', value)
		sceneMessageBus.emit('announcement', { val: value })
		annPrompt.hide()
	},
})

const bouncePrompt = ui.createComponent(ui.FillInPrompt, {
	title: 'Kick Player?',
	onAccept: (value: string) => {
		console.log('accepted values:', value)
		sceneMessageBus.emit('kick', { val: value })
		bouncePrompt.hide()
	},
})



// send and receive messages between players

export async function checkAuth() {
	const userData = await getUserData({})

	if (DEBUG_MODE) {
		authorized = true
		return
	}

	if (!userData || !userData.data || !userData.data.displayName) return false

	console.log('name: ', userData.data.displayName)
	console.log('Aproved? ', authorized)
	for (const id of allowListedIds) {
		if (userData && id === userData.data.displayName) {
			authorized = true
			break
		}
	}
}

sceneMessageBus.on('kick', async (info: any) => {
	executeTask(async () => {
		const userData = await getUserData({})
		if (!userData || !userData.data || !userData.data.displayName) return false

		if (info.val === userData.data.displayName) {
			console.log('player kicked')
			movePlayerTo({ newRelativePosition: Vector3.create(8, 8, 8) }).catch((error) => console.log(error))
		}
	})
})

sceneMessageBus.on('announcement', (info: any) => {
	console.log('announcement', info)
	const announcement = ui.createComponent(ui.Announcement, {
		value: info.val,
		startHidden: false,
		duration: 5,
		color: Color4.Red(),
		size: 100,
		xOffset: 0,
		yOffset: 0,
	})

})



// GitHub link

function GitHubLinkUi() {

	const projectPath = "BouncerUI"

	const fullPath = "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" + projectPath


	return <UiEntity
		uiTransform={{
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			positionType: 'absolute',
			position: { right: "3%", bottom: '3%' }
		}}
	>
		<UiEntity
			uiTransform={{
				width: '100',
				height: '100',
			}}
			uiBackground={{
				textureMode: 'stretch',
				texture: {
					src: "images/gh.png"
				}
			}}

			onMouseDown={() => {
				console.log("OPENING LINK")
				openExternalUrl({ url: fullPath })
			}}
		/>
		<Label
			value="View code"
			color={Color4.Black()}
			fontSize={18}
			textAlign="middle-center"
		/>
	</UiEntity>
}
