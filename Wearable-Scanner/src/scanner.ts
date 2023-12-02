
import { Vector3, Quaternion} from '@dcl/sdk/math'
import { Animator, Entity, executeTask, 
    MeshRenderer, GltfContainer, Transform, 
    engine, AudioSource } from '@dcl/sdk/ecs'
import { UserData, getUserData } from '~system/UserIdentity'
//import crypto from 'dcl-crypto-toolkit'


let NFT = "urn:decentraland:off-chain:base-avatars:f_blue_jacket"; /// wearable 


let doorOpenedForPlayer = false; // Flag to check if door has been opened for player

let delayElapsed = 0; // Time elapsed since the start of the delay
let checkingStarted = false; // Flag to indicate if checking has started

// Function to start the delay for wearable check
function startWearableCheckDelay() {
    delayElapsed = 0;
    checkingStarted = true;
  }
  
// Update function to be called each frame
function update(deltaTime: number) {
    if (checkingStarted) {
      delayElapsed += deltaTime;
      
      if (delayElapsed >= 3) { // 3 seconds delay equal time of audio scanning
        checkingStarted = false;
        checkWearableAndControlDoor(); // Perform the wearable check after the delay
      }
    }
  }
// Register the update function
  engine.addSystem(update);
  
// sounds 
const acceptSound = engine.addEntity()
const scanningSound = engine.addEntity()
const rejectSound = engine.addEntity()

function addAudio(entity: Entity, audioClipUrl: string) {
AudioSource.create(entity, {

audioClipUrl: audioClipUrl,
playing: false,
loop: false,

})
}

addAudio(acceptSound,'sounds/accept.mp3')
addAudio(scanningSound,'sounds/LaserHum.mp3')
addAudio(rejectSound,'sounds/access_denied.mp3')

function playSound(entity: Entity){
const audioSource = AudioSource.getMutable(entity)
audioSource.playing = true
}

// animations 

  // Scanner 
  export const Scanner = engine.addEntity()
  GltfContainer.create(Scanner, { src: 'models/Scanner/Wearable-Reader.glb' }) 
  MeshRenderer.create(Scanner)
  Transform.create(Scanner, {
      position: Vector3.create(7, 0, 11),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1.1, 1.1, 1.1)
  })

  Animator.create(Scanner, {

 // Animator states: scanning, allow action, access denied
      states:[{
         clip: "Laser_Action", 
         playing: true,
         loop: false,
    
      }, {
         clip: "Allow_Action",
         playing: true,
         loop: false,
         shouldReset: true,
      }, {
        
        clip: "NotAllow_Action", 
        playing: true,
        loop: false,
        shouldReset: true,
      }]
    })

    // Door 
    export const Door = engine.addEntity()
    GltfContainer.create(Door, { src: 'models/Door_Fantasy.glb' }) 
    MeshRenderer.create(Door)
    Transform.create(Door, {
        position: Vector3.create(9.275432586669922, 0, 9.929542541503906),
        rotation: Quaternion.create(0, 0, 0, 1),
        scale: Vector3.create(1, 1, 1)
    })


    Animator.create(Door, {

        // Door states: closed, open 
          states:[{
             clip: "Close", 
             playing: false,
             loop: false,
          }, {
             clip: "Open",
             playing: true,
             loop: false,
          }]
        })


// Scanner States 

export class ScannerState  {
    wearable: string;
    userData: string;
    access: boolean;
    isChecking: boolean;
    animation: string;
    sound: string;
    door: string;
    isTriggered: boolean;

    constructor(wearable: string, userData: string, access: boolean, isChecking: boolean,animation: string, sound: string, door: string, isTriggered: boolean)
    {
    this.wearable = NFT;
    this.userData = userData;    
    this.access = access;
    this.isChecking = false;
    this.animation = 'none';
    this.sound = 'none';
    this.door ='none';
    this.isTriggered = false;
    }

startChecking() {
    this.isChecking = true;
    this.isTriggered = true;
    this.access = false;
    this.animation = 'Laser_Action';
    this.sound = 'scanning';
}

stopChecking() {
    this.isChecking = false;
}

resetTrigger() {
    this.isTriggered = false;
}

giveAccess() {
    this.access = true;
    this.animation = 'Allow_Action';
    this.sound = 'accept';
    this.door = 'Open'
}

reject() {

    this.access = false;
    this.animation = 'NotAllow_Action';
    this.sound = 'reject';
    this.door = 'none'

}
}

// Instance of ScannerState
const scannerState = new ScannerState(NFT, '', false, false, 'none', 'none', 'close', false)

// Function to play sound based on scanner state

function updateScannerSoundAndAnimation() {
  switch (scannerState.sound) {
    case 'scanning':
      playSound(scanningSound)
      break
    case 'accept':
      playSound(acceptSound)
      break
    case 'reject':
      playSound(rejectSound)
      break
  }

  // Update scanner animation based on state
  const scannerAnimator = Animator.getMutable(Scanner)
  if (scannerAnimator) {
    scannerAnimator.states.forEach(state => state.playing = false)
    const animState = scannerAnimator.states.find(state => state.clip === scannerState.animation)
    if (animState) {
      animState.playing = true
    }
  }

  // Update door animation based on scanner state
  const doorAnimator = Animator.getMutable(Door)
  if (doorAnimator) {
    doorAnimator.states.forEach(state => state.playing = false)
    const doorAnimState = doorAnimator.states.find(state => state.clip === scannerState.door)
    if (doorAnimState) {
      doorAnimState.playing = true
    }
  }
}

// Function to check for wearable and update scanner state
function checkWearableAndControlDoor() {
    executeTask(async () => {
      const userData = await getUserData({})
  console.log(userData)

      if (!userData || !userData.data || !userData.data.avatar) {
        console.log("Could not retrieve user data or wearables.")
        return
      }
  
      scannerState.startChecking()
      updateScannerSoundAndAnimation()
      console.log(userData.data.avatar.wearables)

      // Check if the user is wearing the specific wearable
      const hasWearable = userData.data.avatar.wearables.includes(NFT)
  
      if (hasWearable) {
        scannerState.giveAccess()
        doorOpenedForPlayer = true; // Set flag when door is opened

      } else {
        scannerState.reject()

      }
      updateScannerSoundAndAnimation()
    })
  }
  
//Player position 
let previousPlayerPos: Vector3 | null = null;

// Function to get player position and trigger scanner
function getPlayerPosition() {
    if (!Transform.has(engine.PlayerEntity)) return;
    
    const playerPos = Transform.get(engine.PlayerEntity).position;
    const scannerPos = Transform.get(Scanner).position;
    const distance = Vector3.distance(playerPos, scannerPos);

    // Check if player has just crossed the boundary into the scanner area, used instead of trigger
    if (previousPlayerPos) {
        const previousDistance = Vector3.distance(previousPlayerPos, scannerPos);

        // If previously outside and now inside the boundary, and scanner not triggered or door not opened
        if (previousDistance >= 2.5 && distance < 2.5 && !scannerState.isTriggered && !doorOpenedForPlayer) {
            scannerState.startChecking();
            updateScannerSoundAndAnimation();
            startWearableCheckDelay(); // Start the delay
        }
    }

    // Update previous position for next frame
    previousPlayerPos = playerPos;

    // Reset trigger if player moves out of the boundary
    if (distance >= 2.5) {
        scannerState.resetTrigger();
    }
}
  
  engine.addSystem(getPlayerPosition);
  
// Setting initial states for Scanner and Door animations to false
Animator.getMutable(Scanner).states.forEach(state => state.playing = false)
Animator.getMutable(Door).states.forEach(state => state.playing = false)
