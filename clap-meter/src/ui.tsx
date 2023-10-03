import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { clapMeterFull } from './clapMeter'
import * as utils from '@dcl-sdk/utils'

export var isMenuVisible: boolean = false;
var isClapMeterFull = clapMeterFull
let isClapMeterFullVisible: boolean | null = null;
var announcement: string = "For the best experience, \nswitch to 3rd person view by \npressing 'V' key."
var clapMeterFullAnnouncement: string = "The clap meter is full! Nice clapping!"


export function setupUi() {
	ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
	<UiEntity
		uiTransform={{
			width: 400,
			height: 230,
			margin: '16px 0 8px 270px',
			padding: 4
		}}
	>
		{/* Existing announcement label */}
		{isMenuVisible && (

			<Label
				value={announcement}
				fontSize={18}
				uiTransform={{ width: '100%', height: 230 }}
			/>
		)}

		{/* New announcement label */}
		{isClapMeterFull && (
			<Label
				value={clapMeterFullAnnouncement}
				fontSize={18}
				uiTransform={{ width: '100%', height: 230 }}
			/>
		)}
	</UiEntity>

);

// Function to toggle the state of the menu
export function toggleMenuVisibility() {
	isMenuVisible = !isMenuVisible
}
export function setClapMeterFull(full: boolean) {
	isClapMeterFull = full;

	if (full) {
		isClapMeterFullVisible = true;


	}

}

export function onClapMeterFull() {
	setClapMeterFull(true);
	isMenuVisible = false

	utils.timers.setTimeout(() => {
		setClapMeterFull(false);
		isClapMeterFullVisible = false;
	},
		10000 // Remove the announcement after 10 seconds
	)
}
