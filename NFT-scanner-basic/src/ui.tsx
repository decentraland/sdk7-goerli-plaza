import {
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  InputAction, Entity,Animator,
  pointerEventsSystem, AudioSource
} from '@dcl/sdk/ecs'
import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'


var isUIVisible = false;

// Function to toggle the visibility of the UI
export function toggleUIVisibility() {
  isUIVisible = !isUIVisible;
  setupUi();
}


export function setupUi() {
  {
    ReactEcsRenderer.setUiRenderer(uiComponent);
  }
}


const uiComponent = () => (
 
  <UiEntity
    uiTransform={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      width: '40%', // Use percentage to make it responsive
      height: '40%', // Use percentage to make it responsive
      position: { left: '40%', top: '40%' }, // Adjust to center the UI
      display: isUIVisible ? 'flex': 'none'
    }}
    uiBackground={{
      textureMode: 'center',
      texture: {
        src: "images/no-sign.png",

      }
    }}
   >
          
    <Label
      value="Error: Hodl NFT to Enter"
      fontSize={24}
      color={Color4.White()}
      uiTransform={{ width: '100%', height: 80, alignContent: 'center', margin: '20px' }}
    />

 <UiEntity

uiTransform={{ width: '35%', height: 50, margin: '10px' }}
>

    <Button
      value="CANCEL" // using UI text here 
      variant="secondary"
    
      fontSize={22}
      uiTransform={{ width: '100%', height: 50, margin: '0px' }}

      
    onMouseDown={() => {
        console.log('Cancel')
       
        // toggle, hide  the UI 
        toggleUIVisibility();
      }}
     

    />
  </UiEntity> 
  </UiEntity> 
)

