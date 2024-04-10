import { Color4 } from '@dcl/sdk/math'
import *  as  ui from 'dcl-ui-toolkit'
import { reward } from '../Rewards/rewards'


export function rewardUI(thumbnail: string, wearableName: string) {

	if (reward) {

		const customPrompt = ui.createComponent(ui.CustomPrompt, {
			style: ui.PromptStyles.DARK,
			height: 300,
		})


		const promptTitle = customPrompt.addText({
			value: 'Gift incoming!',
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

		const promptIcon = customPrompt.addIcon({
			image: thumbnail,
			xPosition: 0,
			yPosition: -20,
			height: 125,
			width: 125
		})
		const name = customPrompt.addText({
			value: wearableName,
			xPosition: 0,
			yPosition: -55,
			size: 12,
		})
		const promptButtonE = customPrompt.addButton({
			style: ui.ButtonStyles.E,
			text: 'Ok',
			xPosition: -15,
			yPosition: -160,
			onMouseDown: () => {
				console.log('Yeah clicked')
				customPrompt.hide()
			},
		})





		customPrompt.show()
	}
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
