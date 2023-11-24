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

const projectPath = "BouncerUI"
const description = "A scene where special allowlisted users have access to a UI that allow them to ban other players, teleporting them outside the building."
const Max_Chars = 45


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
			GitHubLinkUi(),
			descriptionUI()
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


function descriptionUI() {

	const multiLineDescription = breakLines(description, Max_Chars)

	return <UiEntity
		uiTransform={{
			width: "auto",
			height: "auto",
			display: "flex",
			flexDirection: 'row',
			alignSelf: 'stretch',
			positionType: "absolute",
			flexShrink: 1,


			maxWidth: 600,
			maxHeight: 300,
			minWidth: 200,
			padding: 4,
			position: { right: "3%", bottom: '20%' }
		}}
		uiBackground={{ color: Color4.fromHexString("#4d544e") }}
	>
		<UiEntity
			uiTransform={{
				width: "auto",
				height: "auto",
				alignSelf: "center",
				padding: 4,
				justifyContent: 'flex-start',
				alignContent: 'flex-start',
			}}
			uiBackground={{ color: Color4.fromHexString("#92b096") }}
		>
			<Label
				value={multiLineDescription}
				fontSize={18}
				textAlign="middle-center"

				uiTransform={{
					width: "auto",
					height: "auto",
					alignSelf: "center",
					margin: '16px 16px 8px 16px',

				}}
			/>
		</UiEntity>
	</UiEntity >
}


function breakLines(text: string, linelength: number) {
	const lineBreak = '\n'
	var counter = 0
	var line = ''
	var returnText = ''
	var bMatchFound = false
	const lineLen = linelength ? linelength : 50


	if (!text) return ''
	if (text.length < lineLen + 1) { return text }

	while (counter < text.length) {
		line = text.substring(counter, counter + lineLen);
		bMatchFound = false
		if (line.length == lineLen) {
			for (var i = line.length; i > -1; i--) {
				if (line.substring(i, i + 1) == ' ') {
					counter += line.substring(0, i).length
					line = line.substring(0, i) + lineBreak
					returnText += line
					bMatchFound = true
					break
				}
			}

			if (!bMatchFound) {
				counter += line.length
				line = line + lineBreak
				returnText += line
			}
		}
		else {
			returnText += line
			break // We're breaking out of the the while(), not the for()
		}
	}

	return returnText
}