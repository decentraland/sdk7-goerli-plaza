import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { openExternalUrl } from '~system/RestrictedActions'
import { validateCaptcha } from './claim'
import { ClaimConfigInstType } from './claimConfig'

const projectPath = "reward-claim"
const description = "Claim a wearable by clicking on the dispenser. You must be connected with your wallet to the Sepolia network. After submitting a captcha the wearable will arrive over the next couple of minutes."
const Max_Chars = 45


const uiComponent = () => (
	[
		ui.render(),
		GitHubLinkUi(),
		descriptionUI()
		// Other UI elements
	]
)

export function setupUi() {
	ReactEcsRenderer.setUiRenderer(uiComponent)
}


function GitHubLinkUi() {

	const fullPath = "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" + projectPath

	return <UiEntity
		uiTransform={{
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			positionType: 'absolute',
			position: { right: "8%", bottom: '3%' }
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


export function breakLines(text: string, linelength: number) {
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


export function confirmationUI(thumbnail: string, wearableName: string) {

	const customPrompt = ui.createComponent(ui.CustomPrompt, {
		style: ui.PromptStyles.DARK,
		height: 300,
	})


	const promptTitle = customPrompt.addText({
		value: 'Wearable incoming!',
		xPosition: 0,
		yPosition: 135,
		color: Color4.Green(),
		size: 30,
	})

	const promptText = customPrompt.addText({
		value: "It will arrive in your backpack in a few minutes.",
		xPosition: 0,
		yPosition: 100,
	})


	const promptButtonE = customPrompt.addButton({
		style: ui.ButtonStyles.E,
		text: 'Ok',
		xPosition: 0,
		yPosition: -120,
		onMouseDown: () => {
			console.log('Yeah clicked')
			customPrompt.hide()
		},
	})

	const promptIcon = customPrompt.addIcon({
		image: thumbnail,
		xPosition: 0,
		yPosition: 5,
		height: 125,
		width: 125
	})


	const name = customPrompt.addText({
		value: wearableName,
		xPosition: 0,
		yPosition: -70,
		size: 20,
	})

	customPrompt.show()
}


export function alreadyClaimedUI() {

	const prompt = ui.createComponent(ui.OkPrompt, {
		text: 'You already claimed this wearable!',
		onAccept: () => {
			console.log('accepted')
			prompt.hide()
		},
		acceptLabel: 'Ok',
		useDarkTheme: true,
		textSize: 20,
		width: 450,
		height: 300,
		startHidden: false,
	})
}



export function errorUI(errorString: string) {

	const prompt = ui.createComponent(ui.OkPrompt, {
		text: 'There was an error: ' + errorString,
		onAccept: () => {
			console.log('accepted')
			prompt.hide()
		},
		acceptLabel: 'Ok',
		useDarkTheme: true,
		textSize: 20,
		width: 450,
		height: 300,
		startHidden: false,
	})
}


let captchaText: string = ""

export function captchaUI(image: string, id: string, campaign: ClaimConfigInstType, campaign_key: string) {

	const customPrompt = ui.createComponent(ui.CustomPrompt, {
		style: ui.PromptStyles.DARK,
		height: 300,
	})


	const promptTitle = customPrompt.addText({
		value: 'Please solve this captcha',
		xPosition: 0,
		yPosition: 135,
		color: Color4.Green(),
		size: 30,
	})


	const promptButtonE = customPrompt.addButton({
		style: ui.ButtonStyles.E,
		text: 'Ok',
		xPosition: 0,
		yPosition: -120,
		onMouseDown: () => {
			validateCaptcha(captchaText, id, campaign, campaign_key)
			customPrompt.hide()

		},
	})

	const promptIcon = customPrompt.addIcon({
		image: image,
		xPosition: 0,
		yPosition: 5,
		height: 125,
		width: 125
	})


	const name = customPrompt.addTextBox({
		onChange: (text) => { captchaText = text },
		xPosition: 0,
		yPosition: -70,
	})

	customPrompt.show()
}

