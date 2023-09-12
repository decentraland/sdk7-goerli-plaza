import { Entity, engine, Transform, GltfContainer, Animator } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";


export class Ring {
  private ringEntity: Entity;
  animation1: string;
  animation2: string;
  animation3: string;

  constructor(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    model: string,
    animation1: string,
    animation2: string,
    animation3: string,
    parent: Entity
  ) {
    
    // Create an entity for the ring
    this.ringEntity = engine.addEntity();

    // Calculate entity rotation in Euler degrees
    const eulerRotationRing = Quaternion.fromEulerDegrees(
      rotation.x,
      rotation.y,
      rotation.z
    );

    // Add a 3D model to the entity
    GltfContainer.create(this.ringEntity, {
        src: model
    });

    // Add a transform and parent
    Transform.create(this.ringEntity, {
        position: position,
        rotation: eulerRotationRing,
        scale: scale,
        parent: parent
    });

    // Initialize animation names
    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;

    // Create an animator for the ring with multiple animation states
    Animator.create(this.ringEntity, {
        states: [
          {
              name: animation1,
              clip: animation1,
              playing: false,
              loop: false
        },
        {
              name: animation2,
              clip: animation2,
              playing: false,
              loop: false
        },
        {
              name: animation3,
              clip: animation3,
              playing: false,
              loop: false
        }
      ] 
    });
}

  public play1(): void {
    // Play the first animation
    Animator.playSingleAnimation(this.ringEntity, this.animation1);
    console.log('Playing Animation 1');
   
  }
  public play2(): void {
    // Play the second animation
    Animator.playSingleAnimation(this.ringEntity, this.animation2);
    console.log('Playing Animation 2');

  }
  public play3(): void {
    // Play the third animation
    Animator.playSingleAnimation(this.ringEntity, this.animation3);
    console.log('Playing Animation 3');
  }
}