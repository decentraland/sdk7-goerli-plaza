
import { engine, Entity, pointerEventsSystem, InputAction, MainCamera, VirtualCamera, PointerEvents } from '@dcl/sdk/ecs'

export class CameraFocus {
  private isCameraActive: boolean = false

  constructor(
    public src: string,
    public entity: Entity,
    public cameraEntity: Entity
  ) { }

  /**
   * Start function - called when the script is initialized
   */
  start() {
    // Script initialization
    console.log("CameraFocus initialized for entity:", this.entity);

    // Set up onclick function
    pointerEventsSystem.onPointerDown(
      {
        entity: this.entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Focus Mode',
          showHighlight: false,
          maxDistance: 150,
        },
      },
      () => {
        this.toggleCamera();
      },
    );
  }

  /**
   * Toggle camera activation/deactivation
   */
  public toggleCamera() {
    if (!this.isCameraActive) {
      // Activate the camera entity as the virtual camera
      VirtualCamera.createOrReplace(this.cameraEntity, {
        defaultTransition: { transitionMode: VirtualCamera.Transition.Time(2) },
      })
      MainCamera.createOrReplace(engine.CameraEntity, {
        virtualCameraEntity: this.cameraEntity
      });
      this.isCameraActive = true;
      console.log("Camera activated:", this.cameraEntity);

      // Update hover text to indicate deactivation
      this.updateHoverText('Exit Focus Mode');

    } else {
      // Deactivate the virtual camera
      if (MainCamera.has(engine.CameraEntity)) {
        MainCamera.deleteFrom(engine.CameraEntity);
      }
      this.isCameraActive = false;
      console.log("Camera deactivated");

      // Update hover text to indicate activation
      this.updateHoverText('Focus Mode');
    }
  }

  /**
   * Update the hover text for the pointer event
   */
  private updateHoverText(text: string) {
    const pointerEvents = PointerEvents.getMutableOrNull(this.entity);
    if (pointerEvents && pointerEvents.pointerEvents.length > 0) {
      const firstEvent = pointerEvents.pointerEvents[0];
      if (firstEvent.eventInfo) {
        firstEvent.eventInfo.hoverText = text;
      }
    }
  }
}
