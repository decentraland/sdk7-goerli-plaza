import {
    engine,
    Entity,
    Transform,
    GltfContainer, MeshRenderer
  } from '@dcl/sdk/ecs'
  import { Vector3,Quaternion } from '@dcl/sdk/math'
 
  // Speed of the bridge's movement, made to sync animation with length of audio
  const bridgeMovementSpeed = 0.33; // lower number makes it slower

  // Define the two end points
  const pointA = Vector3.create(11.2, 2.2, 6.9); // Target position
  const pointB = Vector3.create(4, 2.2, 6.5); // Starting position 

// Custom class to handle bridge state
export class BridgeState {
  open: boolean;
  isMoving: boolean;
  progress: number;
  movingToB: boolean; // Flag to indicate direction of movement
  startPosition: Vector3;
  endPosition: Vector3;
  startRotation: Quaternion;
  endRotation: Quaternion;

  constructor(open: boolean, movingToB: boolean, startPosition: Vector3, endPosition: Vector3, startRotation: Quaternion, endRotation: Quaternion) {
    this.open = open;
    this.isMoving = false;
    this.progress = 0;
    this.movingToB = movingToB;

    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.startRotation = startRotation;
    this.endRotation = endRotation;
  }
  toggleDirection() {
    this.isMoving = true;
    this.progress = 0;
    this.movingToB = !this.movingToB;

  }
  startMoving() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.progress = 0;
    }
  }

}

// Create the bridge entity
export const bridge = engine.addEntity();
  GltfContainer.create(bridge, { src: 'models/Log_Bridge_01/Log_Bridge_01.glb' });
  MeshRenderer.create(bridge);
  Transform.create(bridge, {
  position: pointB, // Starting position
  rotation: Quaternion.create(-1.5265747641888378e-15,
    0.8520362377166748,
    -1.0157062746429801e-7,
    0.5234828591346741
  ),
  scale: Vector3.create(2.23, 1.23, 1)
});

// Create a mapping from entities to their states
export const bridgeStates = new Map<Entity, BridgeState>();

// Define rotation angles
const rotationAngleA = Quaternion.create( -9.158600493394588e-15,
  -0.41761070489883423,
  4.978307543979099e-8,
  -0.9086260795593262); 
const rotationAngleB = Quaternion.create( -1.5265747641888378e-15,
  0.8520362377166748,
  -1.0157062746429801e-7,
  0.5234828591346741); 

// Initialise the bridge state
export const bridgeState = new BridgeState(false, true, pointA, pointB, rotationAngleA, rotationAngleB);
  bridgeStates.set(bridge, bridgeState);


// Lever base model 

const baseLever =  engine.addEntity();
  GltfContainer.create(baseLever, { src: 'models/PaidLever/Base_Lever.glb'});
  MeshRenderer.create(baseLever);
  Transform.create(baseLever, {
    position: Vector3.create(7, 2.3, 11.5),
    rotation: Quaternion.create(
      
    ),
    scale: Vector3.create(1, 1, 1)
  });

// Bridge Animation system

engine.addSystem((dt: number) => {
  for (const [entity, state] of bridgeStates) {
    if (state.isMoving) {
      state.progress += dt*bridgeMovementSpeed; //modifies the speed of animation 
      state.progress = Math.min(1, Math.max(0, state.progress));

      const transform = Transform.getMutable(entity);
      const currentPosition = state.movingToB ? state.startPosition : state.endPosition;
      const targetPosition = state.movingToB ? state.endPosition : state.startPosition;
      const currentRotation = state.movingToB ? state.startRotation : state.endRotation;
      const targetRotation = state.movingToB ? state.endRotation : state.startRotation;

      transform.position = Vector3.lerp(currentPosition, targetPosition, state.progress);
      transform.rotation = Quaternion.slerp(currentRotation, targetRotation, state.progress);

      if (state.progress === 1) {
        state.isMoving = false; // Stop moving once the target is reached
      }
    }
  }
});

