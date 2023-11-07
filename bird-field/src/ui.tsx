import { openExternalUrl } from "~system/RestrictedActions"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { TextAlignMode, TextureFilterMode, TextureWrapMode } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"


const projectPath = "bird-field"

export const fullPath = "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" + projectPath

export function setupUi() {
	ReactEcsRenderer.setUiRenderer(uiComponent)
}


const uiComponent = () => (
	<UiEntity
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
)

