import { Color4 } from '@dcl/sdk/math'
import *  as  ui from 'dcl-ui-toolkit'
import * as utils from '@dcl-sdk/utils'
import { Transform, engine } from '@dcl/sdk/ecs'



export function confirmationUI(thumbnail: string, wearableName: string) {

	const customPrompt = ui.createComponent(ui.CustomPrompt, {
	  style: ui.PromptStyles.DARK,
	  height: 350,
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
	  size: 10
	})
  
  
	const promptButtonE = customPrompt.addButton({
	  style: ui.ButtonStyles.E,
	  text: 'Ok',
	  xPosition: -15,
	  yPosition: -150,
	  onMouseDown: () => {
		console.log('Yeah clicked')
		customPrompt.hide()
	  },
	})
  
	const promptIcon = customPrompt.addIcon({
	  image: thumbnail,
	  xPosition: 0,
	  yPosition: 0,
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
  
	utils.playSound('sounds/star-collect.mp3', false, Transform.get(engine.PlayerEntity).position)
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
