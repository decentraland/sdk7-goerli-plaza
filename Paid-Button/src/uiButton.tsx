import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction, Entity, Animator,
  pointerEventsSystem, AudioSource
} from '@dcl/sdk/ecs'
import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import * as crypto from 'dcl-crypto-toolkit'
import { openExternalUrl } from "~system/RestrictedActions"

// Payment 

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let paymentAmount = ''; // variable, payment amount set by the player


// Audio 

// Create Audio entities

export const buttonSound = engine.addEntity()
export const acceptSound = engine.addEntity()
export const openSound = engine.addEntity()
export const closeSound = engine.addEntity()

// Create a general function to add AudioSource component
export function addAudio(entity: Entity, audioClipUrl: string) {
  AudioSource.create(entity, {
    audioClipUrl: audioClipUrl,
    playing: false,
    loop: false,
  })
}

// Add AudioSource to entities
addAudio(acceptSound, 'sounds/click.mp3')
addAudio(buttonSound, 'sounds/accept.mp3')
addAudio(openSound, 'sounds/open.mp3')
addAudio(closeSound, 'sounds/close.mp3')

// General function to play sound
export function playSound(entity: Entity) {
  const audioSource = AudioSource.getMutable(entity)
  audioSource.playing = true
}

// Door 
export const Door = engine.addEntity()
GltfContainer.create(Door, { src: 'models/Door_Fantasy.glb' })
MeshRenderer.create(Door)
Transform.create(Door, {
  position: Vector3.create(9.275432586669922, 0, 9.929542541503906),
  rotation: Quaternion.create(0, 0, 0, 1),
  scale: Vector3.create(1, 1, 1)
})

// Animator for the door
const doorAnimator = Animator.create(Door, {
  states: [{
    clip: "Close",
    playing: true, // Initially, the door is closed
    loop: false,
  }, {
    clip: "Open",
    playing: false, // Not playing initially
    loop: false,
  }]
})

// Function to open the door
function openDoor() {
  const animator = Animator.getMutable(Door)
  animator.states[0].playing = false // Stop playing 'Close' animation
  animator.states[1].playing = true  // Start playing 'Open' animation
  playSound(openSound) // Play the sound of the door opening
}


// flag for visibility of toggling UI  
var isUIVisible = false;

// Function to toggle the visibility of the UI
export function toggleUIVisibility() {
  isUIVisible = !isUIVisible;
  setupUi();
}

//  UI toggle and Button model 
export const Paid_Button = engine.addEntity();
GltfContainer.create(Paid_Button, { src: 'models/PaidButton/MANA_Button.glb' });
MeshRenderer.create(Paid_Button);
Transform.create(Paid_Button, {
  position: Vector3.create(7, 0, 11),
  rotation: Quaternion.create(

  ),
  scale: Vector3.create(1, 1, 1)
});
pointerEventsSystem.onPointerDown(
  {
    entity: Paid_Button,
    opts: { button: InputAction.IA_PRIMARY, hoverText: 'Pay Mana', maxDistance: 10 },

  },
  () => {
    playSound(buttonSound); //play click sound once we press the button

    toggleUIVisibility(); // function toggles UI on/off 

  }
)

const buttonAnimator = Animator.create(Paid_Button, {
  states: [{
    clip: "idle",
    playing: true, // Initially, idle
    loop: false,
  }, {
    clip: "Button_Action",
    playing: false, // Not playing initially
    loop: false,
  }]
})

function onButtonPressed() {
  const animator = Animator.getMutable(Paid_Button)
  animator.states[1].playing = true  // Start playing 'Action Button' animation
}


// UI setup //

const donationUi = () => (

  <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      width: '35%', // Use percentage to make it responsive
      height: 'auto', // Use percentage to make it responsive
      position: { left: '32.5%', top: '32.5%' }, // Adjust to center the UI
      display: isUIVisible ? 'flex' : 'none'
    }}
    uiBackground={{
      textureMode: 'stretch',
      texture: {
        src: "images/panel.png",

      }
    }}
  >
    <Label
      value=""
      fontSize={24}
      color={Color4.Black()}
      uiTransform={{ width: '100%', height: 60, alignContent: 'center', margin: '40px 40px 10px 0' }}
    />
    <UiEntity
      uiTransform={{
        flexDirection: 'row', // Set to 'row' to align children (Input, Label) side by side
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Input
        onChange={(value) => {
          paymentAmount = value;     //Mana value;
        }}
        fontSize={24}
        placeholder={'0'}
        placeholderColor={Color4.Gray()}
        uiTransform={{ width: '10%', height: '40px', margin: '0px 0px' }}
      />
      <Label
        value="MANA"
        fontSize={24}
        color={Color4.Red()}
        uiTransform={{ width: '22%', height: 30, margin: '10px 4px 4px 0px' }}
      />
    </UiEntity>

    <Label
      value="Minimum fee: 10. Do you want to proceed?"
      fontSize={24}
      color={Color4.Black()}
      uiTransform={{ width: '100%', height: 80, alignContent: 'center', margin: '10px 20px 10px 10px' }}

    />

    <UiEntity
      uiTransform={{
        flexDirection: 'row', // Set to 'row' to align children side by side
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <Button
        value="PROCEED" //using UI react text here
        variant="primary"
        fontSize={24}
        uiTransform={{ width: '35%', height: 50, margin: '15px' }}


        // Payment functionality


        onMouseDown={async () => {
          console.log('Sending Mana!');

          onButtonPressed() // play audio and animation on button press 

          try {
            const numericAmount = parseFloat(paymentAmount); // Convert to number
            if (!isNaN(numericAmount)) {

              if (numericAmount >= 10) {
                // Send the transaction and use .then() for handling the promise

                toggleUIVisibility();

                try {
                  await crypto.mana.send(myWallet, numericAmount, false)
                  console.log('Mana sent successfully!')
                } catch (e) {
                  console.log(e)
                } finally {
                  // This block executes after the transaction is successful
                  try {
                    openDoor(); // Open the door after successful payment
                    console.log("OPENED DOOR")
                  } catch (e) {
                    console.log(e)
                  }
                }

              } else {
                console.error('Invalid amount');
                playSound(acceptSound);
                toggleErrorMessageVisibility()
              }
            }
          } catch (error) {
            console.error('Error:', error);
          }

        }}

        uiBackground={{
          textureMode: 'stretch', // makes it fit to the UI object
          texture: {
            src: "images/proceed.png",  // using png texture 
          }
        }}

      />

      <Button
        value="CANCEL" // using UI text here 
        variant="primary"

        fontSize={24}
        uiTransform={{ width: '35%', height: 50, margin: '15px' }}
        onMouseDown={() => {
          console.log('Cancel Payment')

          // toggle, hide  the UI 
          toggleUIVisibility();
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: "images/cancel.png",  /// using png as button background with alpha as texture 

          }
        }}

      />
    </UiEntity>
  </UiEntity>
);

var isErrorMessageVisible = false; // flag for error UI page

// Function to toggle the visibility of the error message
export function toggleErrorMessageVisibility() {
  isErrorMessageVisible = !isErrorMessageVisible;
  setupUi();
}


// Error Message UI component
const errorMessageComponent = () => (
  <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      width: '50%',
      height: '30%',
      position: { left: '25%', top: '35%' },
      display: isErrorMessageVisible ? 'flex' : 'none'
    }}
    uiBackground={{
      textureMode: 'stretch',
      texture: {
        src: "images/error_panel.png",
      }
    }}
  >
    <Label
      value="Error: Pay minimum 10 MANA to open the door"
      fontSize={24}
      color={Color4.Black()}
      uiTransform={{ width: '100%', height: 60, alignContent: 'center', margin: '20px' }}
    />
    <Button
      value="Close"
      variant="primary"
      fontSize={22}
      uiTransform={{ width: '30%', height: 50, margin: '20px' }}
      onMouseDown={() => {
        toggleErrorMessageVisibility();
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: "images/cancel.png",
        }
      }}
    />
  </UiEntity>
);



const projectPath = "paid-button"
const description = "Click the button to send MANA to the owner's address. The door will open when the transaction is successful."



const uiComponent = () => (
  [
    isErrorMessageVisible ? errorMessageComponent() : donationUi(),
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
        value={description}
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
