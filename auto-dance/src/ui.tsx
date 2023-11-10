import { openExternalUrl } from "~system/RestrictedActions"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { AudioStream, TextAlignMode, TextureFilterMode, TextureWrapMode } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"


const projectPath = "auto-dance"

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

	const description = "Play a set of looping emotes when standing on the green patches"

	return <UiEntity
		uiTransform={{
			width: "auto",
			height: "auto",
			//maxWidth: 300,
			//maxHeight: 100,
			//margin: '16px 16px 8px 16px',
			//padding: 4,
			positionType: 'absolute',
			position: { right: "8%", bottom: '20%' }
		}}
		uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
	>
		<Label
			value={description}
			fontSize={18}

			uiTransform={{ alignSelf: 'center' }}
		/>


	</UiEntity>

}