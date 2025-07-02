import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

// Variable to store realm information for UI display
let realmDisplayText: string = "Loading realm information..."

// Function to update the realm text
export function updateRealmText(text: string): void {
  realmDisplayText = text
}

// Function to get current realm text (called on every UI tick)
function getRealmText(): string {
  return realmDisplayText
}

// UI Component
export const RealmUI = () => (
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '60px',
      justifyContent: 'center',
      alignItems: 'center',
      positionType: 'absolute',
      position: { top: 0, left: 0 }
    }}
    uiText={{ 
      value: getRealmText(), 
      fontSize: 16,
      color: Color4.White()
    }}
    uiBackground={{ color: Color4.Black() }}
  />
) 