import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction, Entity,
  pointerEventsSystem, AudioSource
} from '@dcl/sdk/ecs'
import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import * as utils from '@dcl-sdk/utils'
import { bridgeStates, bridge } from './bridge'
import * as crypto from 'dcl-crypto-toolkit';  //this works


// Audio 

// Create Audio entities
const leverSound = engine.addEntity()
const bridgeSound = engine.addEntity()

// Create a general function to add AudioSource component
function addAudioSource(entity: Entity, audioClipUrl: string) {
  AudioSource.create(entity, {
    audioClipUrl: audioClipUrl,
    playing: false,
    loop: false,
  })
}

// Add AudioSource to entities
addAudioSource(leverSound, 'sounds/click.mp3')
addAudioSource(bridgeSound, 'sounds/bridgeMoving.mp3')

// General function to play sound
function playSound(entity: Entity) {
  const audioSource = AudioSource.getMutable(entity)
  audioSource.playing = true
}


// Payment 

// set your wallet address here 
let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let paymentAmount = '10'; // variable, payment amount set by the player

//  UI toggle and Lever model 
export const lever = engine.addEntity();
  GltfContainer.create(lever, { src: 'models/PaidLever/Lever_Stick.glb' });
  MeshRenderer.create(lever);
  Transform.create(lever, {
    position: Vector3.create(7, 2.3, 11.5),
    rotation: Quaternion.create(
      
    ),
    scale: Vector3.create(1, 1, 1)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: lever,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Activate Lever',maxDistance: 10 },

    },
    () => {
  
      toggleUIVisibility();
      playSound(leverSound)

    }
  )

var isUIVisible = false;



// Function to toggle the visibility of the UI
function toggleUIVisibility() {
  isUIVisible = !isUIVisible;
  setupUi();
}


// UI setup //


export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
 
    <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      width: '35%', // Use percentage to make it responsive
      height: '35%', // Use percentage to make it responsive
      position: { left: '40%', top: '40%' }, // Adjust to center the UI
      display: isUIVisible ? 'flex': 'none'
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
        paymentAmount = '10';     //value;
      }}
      fontSize={24}
      placeholder={'10'}
      placeholderColor={Color4.Black()}
      uiTransform={{ width: '10%', height: '40px', margin: '0px 0px' }}
    />
    <Label
      value="MANA"
      fontSize={24}
      color={Color4.Red()}
      uiTransform={{ width: '20%', height: 30, margin: '10px 4px 4px 0px' }}
    />
    </UiEntity> 
    
    <Label
      value="Do you want to proceed?"
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
      fontSize={22}
      uiTransform={{ width: '35%', height: 50, margin: '4px' }}



// Payment functionality


onMouseDown={async () => {
  console.log('Sending Mana!');

  try {
    const numericAmount = parseFloat(paymentAmount); // Convert to number
    if (!isNaN(numericAmount)) {

      // Send the transaction and use .then() for handling the promise
      crypto.mana.send(myWallet, numericAmount, true).then(() => {
      
        // This block executes after the transaction is successful
        const state = bridgeStates.get(bridge)
        if (state) state.toggleDirection()

        console.log(paymentAmount, 'Mana'); // Log amount sent
        playSound(bridgeSound);

        // Hide the UI
        toggleUIVisibility();

      }).catch((error:any) => {

        // Handles any errors in the transaction
        console.error('Transaction failed:', error);
      });

    } else {
      console.error('Invalid amount');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}}
uiBackground={{
  textureMode: 'stretch', // makes it fit to the UI object
  texture: {
    src: "images/proceed.png",  // using png texture as example here
  }
}}

    />
        
    <Button
      value="CANCEL" // using UI text here 
      variant="primary"
      
      fontSize={22}
      uiTransform={{ width: '35%', height: 50, margin: '10px' }}
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