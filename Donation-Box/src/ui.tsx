import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction,
  pointerEventsSystem,
  Animator,
  UiCanvasInformation,
  PBUiCanvasInformation,
} from "@dcl/sdk/ecs";

import { Color4, Vector3, Quaternion } from "@dcl/sdk/math";
import ReactEcs, {
  Button,
  Input,
  Label,
  ReactEcsRenderer,
  UiEntity,
} from "@dcl/sdk/react-ecs";
import { openExternalUrl } from "~system/RestrictedActions";
import * as crypto from "dcl-crypto-toolkit";

// set your wallet address here

const myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`;

const defaultDonationAmount = "10";

let donationAmount = defaultDonationAmount; // variable, donation amount set by the player

// Animation delay setup to trigger coin heart in time

function donationAnimationSystem(dt: number) {
  if (donationAnimationTimeElapsed > 0) {
    donationAnimationTimeElapsed += dt;

    if (donationAnimationTimeElapsed >= donationAnimationDuration) {
      // Switch to idle animation
      Animator.playSingleAnimation(
        donationsBoxModel,
        "DonationIdle_Action",
        true
      );
      // Reset or disable the timer
      donationAnimationTimeElapsed = 0;
    }
  }
}

engine.addSystem(donationAnimationSystem);

let donationAnimationTimeElapsed = 0;
const donationAnimationDuration = 2.5; // Duration in seconds

// Box model and animator

const donationsBoxModel = engine.addEntity();
GltfContainer.create(donationsBoxModel, { src: "models/DonationsBox.glb" });
MeshRenderer.create(donationsBoxModel);
Transform.create(donationsBoxModel, {
  position: Vector3.create(6.5, 1, 12),
  rotation: Quaternion.create(0, 0, 0, 1),
  scale: Vector3.create(1, 1, 1),
});

Animator.create(donationsBoxModel, {
  // Animator states idle and donation state
  states: [
    {
      clip: "Donation_Action",
      playing: false,
      loop: false,
    },
    {
      clip: "DonationIdle_Action",
      playing: true,
      loop: true,
      shouldReset: true,
    },
  ],
});

// Donation action and UI toggle

pointerEventsSystem.onPointerDown(
  {
    entity: donationsBoxModel,
    opts: { button: InputAction.IA_PRIMARY, hoverText: "Donate" },
  },
  () => {
    toggleDonationUIVisibility();
    toggleDescriptionVisibility(false);
  }
);

var isDonationUIVisible = false;

// Function to toggle the visibility of the donation UI
function toggleDonationUIVisibility() {
  isDonationUIVisible = !isDonationUIVisible;
  setupUi();
}

// UI setup
const donationUi = () => (
  <UiEntity
    uiTransform={{
      flexDirection: "column",
      width: getCanvas().width,
      height: getCanvas().height,
      justifyContent: "center",
      alignItems: "center",
      display: isDonationUIVisible ? "flex" : "none",
    }}
  >
    <UiEntity
      uiTransform={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        positionType: "absolute",
        width: 550 * getScaleFactor(), // Use scale factor to make it responsive
        height: 300 * getScaleFactor(), // Use scale factor to make it responsive
        borderRadius: 15,
      }}
      uiBackground={{ color: Color4.White() }}
    >
      <Label
        value="Are you sure?\nYou are about to donate:"
        fontSize={24 * getScaleFactor()}
        color={Color4.Black()}
        uiTransform={{
          width: 300 * getScaleFactor(),
          height: 60 * getScaleFactor(),
          alignContent: "center",
          margin: "20px 20px 20px 20px",
        }}
      />
      <UiEntity
        uiTransform={{
          flexDirection: "row", // Set to 'row' to align children (Input, Label) side by side
          width: 400 * getScaleFactor(),
          height: 50 * getScaleFactor(),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          onChange={(value) => {
            donationAmount = value;
          }}
          fontSize={22 * getScaleFactor()}
          placeholder={defaultDonationAmount}
          placeholderColor={Color4.Black()}
          uiTransform={{
            width: 100 * getScaleFactor(),
            height: 50 * getScaleFactor(),
            margin: "10px 0",
          }}
        />
        <Label
          value="MANA"
          fontSize={26 * getScaleFactor()}
          color={Color4.Red()}
          uiTransform={{
            height: 30 * getScaleFactor(),
            margin: "4px 10px 4px 10px",
          }}
        />
      </UiEntity>

      <Label
        value="Do you want to proceed?"
        fontSize={24 * getScaleFactor()}
        color={Color4.Black()}
        uiTransform={{
          width: 350 * getScaleFactor(),
          height: 60 * getScaleFactor(),
          alignContent: "center",
          margin: "5px 5px 5px 5px",
        }}
      />

      <UiEntity
        uiTransform={{
          flexDirection: "row", // Set to 'row' to align children side by side
          width: 450 * getScaleFactor(),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          value="PROCEED"
          variant="primary"
          fontSize={18 * getScaleFactor()}
          uiTransform={{
            width: 200 * getScaleFactor(),
            height: 40 * getScaleFactor(),
            margin: "15px",
            borderRadius: 10,
          }}
          // Implement the donation functionality

          onMouseDown={async () => {
            console.log("Sending Mana!");

            // Play donation animation
            Animator.playSingleAnimation(
              donationsBoxModel,
              "Donation_Action",
              false
            );

            // Start animation timer
            donationAnimationTimeElapsed = 0.00001;

            // Hide the UI
            toggleDonationUIVisibility();
            toggleDescriptionVisibility(true);

            try {
              const numericAmount = parseFloat(donationAmount); // Convert to number
              if (!isNaN(numericAmount)) {
                try {
                  await crypto.mana.send(myWallet, numericAmount, false);
                  console.log("Mana sent successfully!", donationAmount);
                } catch (e) {
                  console.log(e);
                } finally {
                  // This block executes after the transaction is successful

                  // Play donation animation
                  Animator.playSingleAnimation(
                    donationsBoxModel,
                    "Donation_Action",
                    false
                  );
                }
              } else {
                console.error("Invalid donation amount");
              }
            } catch (error) {
              console.error("Transaction failed:", error);
            }
          }}
        />

        <Button
          value="CANCEL"
          variant="secondary"
          color={Color4.White()}
          uiBackground={{ color: Color4.Gray() }}
          fontSize={18 * getScaleFactor()}
          uiTransform={{
            width: 200 * getScaleFactor(),
            height: 40 * getScaleFactor(),
            margin: "15px",
            borderRadius: 10,
          }}
          onMouseDown={() => {
            console.log("Cancel the donation");
            // hide the UI
            toggleDonationUIVisibility();
            toggleDescriptionVisibility(true);
          }}
        />
      </UiEntity>
    </UiEntity>
  </UiEntity>
);

const projectPath = "donation-box";
const description =
  "Click the box to send MANA to the owner's address. The donation box will play a little animation when a donation is made.";

const uiComponent = () => [
  descriptionUI(),
  GitHubLinkUi(),
  donationUi(),
  // Other UI elements
];

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent);
}

// Get Ui Canvas Information of the screen
function getCanvas(): PBUiCanvasInformation {
  const canvasInfo = UiCanvasInformation.get(engine.RootEntity);
  return canvasInfo;
}

// Set the scale factor for Responsive UI's
function getScaleFactor(): number {
  const uiScaleFactor =
    (Math.min(getCanvas().width, getCanvas().height) / 1080) * 1.4;
  return uiScaleFactor;
}

function GitHubLinkUi() {
  const fullPath =
    "https://github.com/decentraland/sdk7-goerli-plaza/tree/main/" +
    projectPath;

  return (
    <UiEntity
      uiTransform={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        positionType: "absolute",
        position: { right: "8%", bottom: "3%" },
      }}
    >
      <UiEntity
        uiTransform={{
          width: 70 * getScaleFactor(),
          height: 70 * getScaleFactor(),
        }}
        uiBackground={{
          textureMode: "stretch",
          texture: {
            src: "images/gh.png",
          },
        }}
        onMouseDown={() => {
          console.log("OPENING LINK");
          openExternalUrl({ url: fullPath });
        }}
      />
      <Label
        value="View code"
        color={Color4.Black()}
        fontSize={18 * getScaleFactor()}
        textAlign="middle-center"
      />
    </UiEntity>
  );
}

var isDescriptionUiVisible: boolean = true;

function descriptionUI() {
  return (
    <UiEntity
      uiTransform={{
        width: 400 * getScaleFactor(),
        height: 80 * getScaleFactor(),
        flexDirection: "row",
        alignSelf: "stretch",
        positionType: "absolute",
        flexShrink: 1,
        maxWidth: 600,
        maxHeight: 300,
        minWidth: 200,
        padding: 4,
        position: { right: "3%", bottom: "20%" },
        display: isDescriptionUiVisible ? "flex" : "none",
      }}
      uiBackground={{ color: Color4.fromHexString("#4d544e") }}
    >
      <UiEntity
        uiTransform={{
          width: "auto",
          height: "auto",
          alignSelf: "center",
          padding: 4,
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
        uiBackground={{ color: Color4.fromHexString("#92b096") }}
      >
        <Label
          value={description}
          fontSize={15 * getScaleFactor()}
          textAlign="middle-center"
          uiTransform={{
            alignSelf: "center",
            margin: "8px 16px 8px 16px",
          }}
        />
      </UiEntity>
    </UiEntity>
  );
}

function toggleDescriptionVisibility(visible = true) {
  isDescriptionUiVisible = visible;
}
