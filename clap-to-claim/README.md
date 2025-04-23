# Decentraland Clap-to-Claim Dispenser Scene

This is a Decentraland scene example that demonstrates how to create a dispenser machine where players can claim wearables by performing a clap emote in front of the dispenser.

## Overview

The scene features:
- Interactive dispenser machines that display wearables
- Clap-to-claim mechanism for wearable distribution
- Campaign-based claiming system with start/end dates
- Visual feedback and UI for the claiming process

## Prerequisites

- [Decentraland SDK](https://docs.decentraland.org/)
- Basic understanding of TypeScript and Decentraland scene development

## Configuration

### 1. Campaign Configuration (`src/modules/claiming/claimConfig.ts`)

Update the dispenser campaign data in `claimConfig.ts`:

```typescript
export const ClaimConfig = {
    campaign: {
        Wearable_1: {
            refId: 'WEARABLE_1',
            campaign: 'YOUR_CAMPAIGN_ID',
            campaignKeys: {
                key: 'YOUR_CAMPAIGN_KEY'
            },
            startDate: new Date('YYYY-MM-DDTHH:mm:ssZ'),
            endDate: new Date('YYYY-MM-DDTHH:mm:ssZ')
        },
        // Add more wearables as needed...
    }
}
```

### 2. Dispenser Setup (`src/modules/dispenser/dispensers.ts`)

Customize the dispenser machines in `initDispensers()` function:

```typescript
createDispenserWithWearable(
    Vector3.create(x, y, z),          // Position
    Quaternion.fromEulerDegrees(...), // Rotation
    "models/wearables/your_model.glb", // 3D model path
    ClaimConfig.campaign.Wearable_1   // Campaign configuration
)
```

### 3. Testing Mode (`src/global.ts`)

Set the testing mode in `global.ts`:

```typescript
export const CONFIG_CLAIM_TESTING_ENABLED = false // Set to true for testing
```

- `true`: Uses testing environment (rewards.decentraland.zone)
- `false`: Uses production environment (rewards.decentraland.org)

## How It Works

1. Players approach a dispenser machine
2. A UI prompt appears when they are in range
3. Players perform the clap emote to initiate the claim
4. The system checks:
   - Campaign validity (start/end dates)
   - Previous claims
   - User wallet connection
5. If successful, the wearable is claimed and added to the player's inventory

## Important Files

- `claimConfig.ts`: Campaign configuration and reward server settings
- `dispensers.ts`: Dispenser machine setup and positioning
- `global.ts`: Environment configuration
- `clapToClaim.ts`: Clap detection and claim initiation
- `dispenserUi.tsx`: UI components for the claiming process

## Testing

1. Set `CONFIG_CLAIM_TESTING_ENABLED = true` in `global.ts`
2. Use the provided test campaign IDs and keys
3. Test the claiming process in preview mode

## Production Deployment

1. Update `claimConfig.ts` with your production campaign details
2. Set `CONFIG_CLAIM_TESTING_ENABLED = false` in `global.ts`
3. Deploy the scene to Decentraland

## Notes

- Campaign dates are in UTC format
- Each dispenser can be configured with different wearables and campaign settings
- The scene includes built-in UI feedback for various claiming states (success, already claimed, not started, ended)

## License

[Add your license information here]