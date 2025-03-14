import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction,
  pointerEventsSystem,
  Animator
} from '@dcl/sdk/ecs'

import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

import * as crypto from 'dcl-crypto-toolkit'

// set your wallet address here 

const myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

const defaultDonationAmount = "10"

let donationAmount = defaultDonationAmount; // variable, donation amount set by the player


// Animation delay setup to trigger coin heart in time

function donationAnimationSystem(dt: number) {
  if (donationAnimationTimeElapsed > 0) {
    donationAnimationTimeElapsed += dt;

    if (donationAnimationTimeElapsed >= donationAnimationDuration) {
      // Switch to idle animation
      Animator.playSingleAnimation(donationsBoxModel, 'DonationIdle_Action', true);
      // Reset or disable the timer
      donationAnimationTimeElapsed = 0;
    }
  }
}

engine.addSystem(donationAnimationSystem);

let donationAnimationTimeElapsed = 0;
const donationAnimationDuration = 2.5; // Duration in seconds

// Box model and animator 

const donationsBoxModel = engine.addEntity()
GltfContainer.create(donationsBoxModel, { src: 'models/DonationsBox.glb' })
MeshRenderer.create(donationsBoxModel)
Transform.create(donationsBoxModel, {
  position: Vector3.create(6.5, 1, 12),
  rotation: Quaternion.create(0, 0, 0, 1),
  scale: Vector3.create(1, 1, 1)
})

Animator.create(donationsBoxModel, {

  // Animator states idle and donation state
  states: [{
    clip: "Donation_Action",
    playing: false,
    loop: false,

  }, {
    clip: "DonationIdle_Action",
    playing: true,
    loop: true,
    shouldReset: true,
  }]
})

// Donation action and UI toggle

pointerEventsSystem.onPointerDown(
  {
    entity: donationsBoxModel,
    opts: { button: InputAction.IA_PRIMARY, hoverText: 'Donate' },
  },
  () => {
    toggleDonationUIVisibility();
  }
);

var isDonationUIVisible = false;

// Function to toggle the visibility of the donation UI
function toggleDonationUIVisibility() {
  isDonationUIVisible = !isDonationUIVisible;
  setupUi();
}

// UI setup 

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
      height: '32%', // Use percentage to make it responsive
      position: { left: '40%', top: '40%' }, // Adjust to center the UI
      display: isDonationUIVisible ? 'flex' : 'none'
    }}
    uiBackground={{ color: Color4.Gray() }}
  >
    <Label
      value="Are you sure?\nYou are about to donate:"
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
          donationAmount = value;
        }}
        fontSize={24}
        placeholder={defaultDonationAmount}
        placeholderColor={Color4.Black()}
        uiTransform={{ width: '18%', height: '50px', margin: '10px 0' }}
      />
      <Label
        value="MANA"
        fontSize={24}
        color={Color4.Red()}
        uiTransform={{ width: '15%', height: 30, margin: '4px 10px 4px 10px' }}
      />
    </UiEntity>

    <Label
      value="Do you want to proceed?"
      fontSize={24}
      color={Color4.Black()}
      uiTransform={{ width: '100%', height: 60, alignContent: 'center', margin: '10px 10px 10px 0' }}
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
        value="PROCEED"
        variant="primary"
        fontSize={22}
        uiTransform={{ width: '35%', height: 50, margin: '4px' }}

        // Implement the donation functionality

        onMouseDown={async () => {
          console.log('Sending Mana!');

          // Play donation animation
          Animator.playSingleAnimation(donationsBoxModel, 'Donation_Action', false);

          // Start animation timer
          donationAnimationTimeElapsed = 0.00001;

          // Hide the UI
          toggleDonationUIVisibility();


          try {
            const numericAmount = parseFloat(donationAmount); // Convert to number
            if (!isNaN(numericAmount)) {

              try {
                await crypto.mana.send(myWallet, numericAmount, false)
                console.log('Mana sent successfully!', donationAmount)
              } catch (e) {
                console.log(e)
              } finally {
                // This block executes after the transaction is successful

                // Play donation animation
                Animator.playSingleAnimation(donationsBoxModel, 'Donation_Action', false);
              }

            } else {
              console.error('Invalid donation amount');
            }
          } catch (error) {
            console.error('Transaction failed:', error);

          }


        }}
      />

      <Button
        value="CANCEL"
        variant="secondary"
        fontSize={22}
        uiTransform={{ width: '35%', height: 50, margin: '10px' }}
        onMouseDown={() => {
          console.log('Cancel the donation')
          // hide the UI 
          toggleDonationUIVisibility();
        }}
      />
    </UiEntity>
  </UiEntity>
)
