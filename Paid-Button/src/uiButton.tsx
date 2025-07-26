import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction,
  Entity,
  Animator,
  pointerEventsSystem,
  AudioSource,
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
import * as crypto from "dcl-crypto-toolkit";
import { openExternalUrl } from "~system/RestrictedActions";

// Payment

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`;

let paymentAmount = ""; // variable, payment amount set by the player

// Audio

// Create Audio entities

export const buttonSound = engine.addEntity();
export const acceptSound = engine.addEntity();
export const openSound = engine.addEntity();
export const closeSound = engine.addEntity();

// Create a general function to add AudioSource component
export function addAudio(entity: Entity, audioClipUrl: string) {
  AudioSource.create(entity, {
    audioClipUrl: audioClipUrl,
    playing: false,
    loop: false,
  });
}

// Add AudioSource to entities
addAudio(acceptSound, "sounds/click.mp3");
addAudio(buttonSound, "sounds/accept.mp3");
addAudio(openSound, "sounds/open.mp3");
addAudio(closeSound, "sounds/close.mp3");

// General function to play sound
export function playSound(entity: Entity) {
  const audioSource = AudioSource.getMutable(entity);
  audioSource.playing = true;
}

// Door
export const Door = engine.addEntity();
GltfContainer.create(Door, { src: "assets/scene/Models/Door_Fantasy.glb" });
MeshRenderer.create(Door);
Transform.create(Door, {
  position: Vector3.create(9.275432586669922, 0, 9.929542541503906),
  rotation: Quaternion.create(0, 0, 0, 1),
  scale: Vector3.create(1, 1, 1),
});

// Animator for the door
const doorAnimator = Animator.create(Door, {
  states: [
    {
      clip: "Close",
      playing: true, // Initially, the door is closed
      loop: false,
    },
    {
      clip: "Open",
      playing: false, // Not playing initially
      loop: false,
    },
  ],
});

// Function to open the door
function openDoor() {
  const animator = Animator.getMutable(Door);
  animator.states[0].playing = false; // Stop playing 'Close' animation
  animator.states[1].playing = true; // Start playing 'Open' animation
  playSound(openSound); // Play the sound of the door opening
}

// flag for visibility of toggling UI
var isUIVisible = false;
var isDescriptionUiVisible = true;

// Function to toggle the visibility of the UI
export function toggleUIVisibility() {
  isUIVisible = !isUIVisible;
  setupUi();
}

//  UI toggle and Button model
export const Paid_Button = engine.addEntity();
GltfContainer.create(Paid_Button, { src: "assets/scene/Models/PaidButton/MANA_Button.glb" });
MeshRenderer.create(Paid_Button);
Transform.create(Paid_Button, {
  position: Vector3.create(7, 0, 11),
  rotation: Quaternion.create(),
  scale: Vector3.create(1, 1, 1),
});
pointerEventsSystem.onPointerDown(
  {
    entity: Paid_Button,
    opts: {
      button: InputAction.IA_PRIMARY,
      hoverText: "Pay Mana",
      maxDistance: 10,
    },
  },
  () => {
    playSound(buttonSound); //play click sound once we press the button
    toggleUIVisibility(); // function toggles UI on/off
    toggleDescriptionVisibility(false);
  }
);

const buttonAnimator = Animator.create(Paid_Button, {
  states: [
    {
      clip: "idle",
      playing: true, // Initially, idle
      loop: false,
    },
    {
      clip: "Button_Action",
      playing: false, // Not playing initially
      loop: false,
    },
  ],
});

function onButtonPressed() {
  const animator = Animator.getMutable(Paid_Button);
  animator.states[1].playing = true; // Start playing 'Action Button' animation
}

// UI setup //

const payUi = () => (
  <UiEntity
    uiTransform={{
      flexDirection: "column",
      width: getCanvas().width,
      height: getCanvas().height,
      justifyContent: "center",
      alignItems: "center",
      display: isUIVisible ? "flex" : "none",
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
        value="Are you sure?\nYou are about to pay:"
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
            paymentAmount = value; //Mana value;
          }}
          fontSize={22 * getScaleFactor()}
          placeholder={"0"}
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

            onButtonPressed(); // play audio and animation on button press

            try {
              const numericAmount = parseFloat(paymentAmount); // Convert to number
              if (!isNaN(numericAmount)) {
                if (numericAmount >= 10) {
                  // Send the transaction and use .then() for handling the promise
                  toggleUIVisibility();
                  toggleDescriptionVisibility(true);

                  try {
                    await crypto.mana.send(myWallet, numericAmount, false);
                    console.log("Mana sent successfully!");
                  } catch (e) {
                    console.log(e);
                  } finally {
                    // This block executes after the transaction is successful
                    try {
                      openDoor(); // Open the door after successful payment
                      console.log("OPENED DOOR");
                    } catch (e) {
                      console.log(e);
                    }
                  }
                } else {
                  console.error("Invalid amount");
                  playSound(acceptSound);
                  toggleErrorMessageVisibility();
                }
              }
            } catch (error) {
              console.error("Error:", error);
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
            console.log("Cancel Payment");
            // toggle, hide  the UI
            toggleUIVisibility();
            toggleDescriptionVisibility(true);
          }}
        />
      </UiEntity>
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
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      positionType: "absolute",
      width: "50%",
      height: "30%",
      position: { left: "25%", top: "35%" },
      display: isErrorMessageVisible ? "flex" : "none",
    }}
    uiBackground={{
      textureMode: "stretch",
      texture: {
        src: "images/error_panel.png",
      },
    }}
  >
    <Label
      value="Error: Pay minimum 10 MANA to open the door"
      fontSize={24}
      color={Color4.Black()}
      uiTransform={{
        width: "100%",
        height: 60,
        alignContent: "center",
        margin: "20px",
      }}
    />
    <Button
      value="Close"
      variant="primary"
      fontSize={22}
      uiTransform={{ width: "30%", height: 50, margin: "20px" }}
      onMouseDown={() => {
        toggleErrorMessageVisibility();
      }}
      uiBackground={{
        textureMode: "stretch",
        texture: {
          src: "images/cancel.png",
        },
      }}
    />
  </UiEntity>
);

const projectPath = "paid-button";
const description =
  "Click the button to send MANA to the owner's address. The door will open when the transaction is successful.";

const uiComponent = () => [
  isErrorMessageVisible ? errorMessageComponent() : payUi(),
  GitHubLinkUi(),
  descriptionUI(),
  // Other UI elements
];

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent);
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
          width: "100",
          height: "100",
        }}
        uiBackground={{
          textureMode: "stretch",
          texture: {
            src: "assets/scene/Images/gh.png",
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
        fontSize={18}
        textAlign="middle-center"
      />
    </UiEntity>
  );
}

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

function toggleDescriptionVisibility(visible = true) {
  isDescriptionUiVisible = visible;
}
