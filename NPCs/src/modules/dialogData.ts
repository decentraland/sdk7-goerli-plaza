// import { Dialog } from '@dcl-sdk/npc-utils'
// import { alice } from '../index'

// export const AliceDialog: Dialog[] = [
// 	{
// 		text: "Hi, I'm Alice - welcome to Genesis Plaza!"
// 	},
// 	{
// 		text: 'Would you like to learn more about this place?',
// 		isQuestion: true,
// 		buttons: [
// 			{ label: 'Yes', goToDialog: 3 },
// 			{ label: 'No', goToDialog: 2 }
// 		]
// 	},
// 	{
// 		text: "Okay, I'll be around if you get curious!",
// 		isEndOfDialog: true,
// 		triggeredByNext: () => {
// 			alice.playAnimation('Goodbye', true, 2)
// 		}
// 	},
// 	{
// 		text: 'We’re currently in the center of the Genesis City map, the roads fan out in all directions from here.'
// 	},
// 	{
// 		text: 'Genesis Plaza is built and maintained by the Decentraland Foundation but is still in many ways a community project.'
// 	},
// 	{
// 		text: 'If you venture out into the world, you’ll see that the content is created by our growing community.'
// 	},
// 	{
// 		text: 'Do you want to explore the rest of Genesis Plaza or explore the rest of the world?',
// 		isQuestion: true,
// 		buttons: [
// 			{ label: 'PLAZA', goToDialog: 7 },
// 			{ label: 'WORLD', goToDialog: 18 }
// 		]
// 	},
// 	{
// 		text: 'Great! There’s a lot to see right here.'
// 	},
// 	{
// 		text: 'If you walk around you might run into my buddies and each is an expert on a different topic.'
// 	},
// 	{
// 		text: 'You can learn a lot from them about how Decentraland works and what makes it special.'
// 	},
// 	{
// 		text: 'I recommend you start at that boat-shaped building to the North!'
// 	},
// 	{
// 		text: "Do you also want to learn about what's beyond Genesis Plaza?",
// 		isQuestion: true,
// 		buttons: [
// 			{ label: 'YES', goToDialog: 12 },
// 			{ label: 'NO', goToDialog: 28 }
// 		]
// 	},
// 	{
// 		text: 'There’s a big world to explore out there!',
// 		offsetY: 18
// 	},
// 	{
// 		text: "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest."
// 	},
// 	{
// 		text: "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out."
// 	},
// 	{
// 		text: "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting."
// 	},
// 	{
// 		text: "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover."
// 	},
// 	{
// 		text: 'So what are you waiting for? Go and explore the world!',
// 		isEndOfDialog: true,
// 		triggeredByNext: () => {
// 			alice.playAnimation('Goodbye', true, 2)
// 		}
// 	},
// 	{
// 		text: 'There’s a big world to explore out there!'
// 	},
// 	{
// 		text: "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest."
// 	},
// 	{
// 		text: "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out."
// 	},
// 	{
// 		text: "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting."
// 	},
// 	{
// 		text: "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover."
// 	},
// 	{
// 		text: "Do you also want to find out what's here in Genesis Plaza?",
// 		isQuestion: true,
// 		buttons: [
// 			{ label: 'YES', goToDialog: 24 },
// 			{ label: 'NO', goToDialog: 28 }
// 		]
// 	},
// 	{
// 		text: 'Great! There’s a lot to see right here.'
// 	},
// 	{
// 		text: 'If you walk around you might run into my buddies and each is an expert on a different topic.'
// 	},
// 	{
// 		text: 'You can learn a lot from them about how Decentraland works and what makes it special.'
// 	},
// 	{
// 		text: 'I recommend you start at that boat-shaped building to the North!'
// 	},
// 	{
// 		text: "Well that's it from me. So what are you waiting for? Go and explore the world!",
// 		triggeredByNext: () => {
// 			alice.playAnimation('Goodbye', true, 2)
// 		},
// 		isEndOfDialog: true
// 	}
// ]

// export const BobDialog: Dialog[] = [
// 	{
// 		text: "G'day human! My name is Bob and I'm a robot. Would you like to learn more about the history of Decentraland and how it all started?",
// 		isQuestion: true,
// 		offsetY: 20,
// 		buttons: [
// 			{ label: 'YES', goToDialog: 2 },
// 			{ label: 'NO', goToDialog: 'no' }
// 		]
// 	},
// 	{
// 		text: "Okay, I'll be around if you get curious.",
// 		name: 'no',
// 		triggeredByNext: () => {
// 			bob.playAnimation('Goodbye', true, 2)
// 		},
// 		isEndOfDialog: true
// 	},
// 	{
// 		text: "Decentraland's unique proposal is to create a virtual world governed by its users."
// 	},
// 	{
// 		text: "This little museum takes you through some of the milestones in Decentraland's history."
// 	},
// 	{
// 		text: 'Some key events in the history of the project were: the Terraform Event, which had the first LAND sale.'
// 	},
// 	{
// 		text: 'The second auction in late 2018; the creation of Avatars and Wearables in 2019; the release of the open source client and the DAO in 2020.'
// 	},
// 	{
// 		text: "So much has happened already, and we're just getting started..."
// 	},
// 	{
// 		text: "Take a look around. If you're interested in any of the items, click on them and I'll tell you the background story.",
// 		triggeredByNext: () => {
// 			bob.playAnimation('Goodbye', true, 2)
// 		},
// 		isEndOfDialog: true
// 	}
// ]

// export const CharlieDialog: Dialog[] = [
// 	{
// 		text: "Hey, I'm Charlie - a master trader. Would you like to learn more about the Decentraland Marketplace?",
// 		isQuestion: true,
// 		offsetY: 20,
// 		buttons: [
// 			{ label: 'YES', goToDialog: 2 },
// 			{ label: 'NO', goToDialog: 1 }
// 		]
// 	},
// 	{
// 		text: "Okay, I'll be around if you get curious.",
// 		isEndOfDialog: true,
// 		triggeredByNext: () => {
// 			charlie.playAnimation('Goodbye', true, 2)
// 		}
// 	},
// 	{
// 		text: 'This is the Metaverse Trade Center. Here you can see live stats from the Decentraland Marketplace.'
// 	},
// 	{
// 		text: 'There’s a thriving economy behind Decentraland and every day people buy and sell unique items.'
// 	},
// 	{
// 		text: 'Items like LAND parcels, wearable items and reserved names.'
// 	},
// 	{
// 		text: 'As more trading happens on the platform, it grows and moves faster.'
// 	},
// 	{
// 		text: 'You can explore this building to find real-time stats about what goes on in the Marketplace.'
// 	},
// 	{
// 		text: 'Do you want to know more about how the Marketplace uses the blockchain?',
// 		isQuestion: true,
// 		buttons: [
// 			{ label: 'YES', goToDialog: 8 },
// 			{ label: 'NO', goToDialog: 12 }
// 		]
// 	},
// 	{
// 		text: 'All sales, bids and other operations are transactions on the blockchain.'
// 	},
// 	{
// 		text: 'Like all transactions, they require a small gas fee that is paid to the network of miners.'
// 	},
// 	{
// 		text: "The Marketplace charges a small fee over all transactions. This fee doesn't go into anyone's pocket. Instead it gets burned."
// 	},
// 	{
// 		text: "'Burning' reduces the amount of MANA in circulation; the remaining MANA becomes more valuable, which benefits the wider community of MANA holders.",
// 		offsetY: -4
// 	},
// 	{
// 		text: 'Remember to visit market.decentraland.org - over there you can buy or sell LAND, wearables or unique names. Happy shopping!',
// 		isEndOfDialog: true,
// 		triggeredByNext: () => {
// 			charlie.playAnimation('Goodbye', true, 2)
// 		}
// 	}
// ]
