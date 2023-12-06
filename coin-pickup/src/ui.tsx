import { openExternalUrl } from "~system/RestrictedActions"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { TextAlignMode, TextureFilterMode, TextureWrapMode } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"


const projectPath = "coin-pickup"
const description = "Coins are picked up once the player walks over them."
const Max_Chars = 45


const uiComponent = () => (
	[
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