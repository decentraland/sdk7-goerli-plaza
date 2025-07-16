# Dispenser claimeable by using the clap emote

This scene contains a scene template with the code and Models necesary to implement a clap-claim wereable dispenser in Decentraland using SDK7. For more information about how to create a Minting Campaign, link a collection, fund it and let others mint, refer to [Rewards Getting Started docs](https://docs.decentraland.org/creator/rewards/getting-started/).

## Getting Started

1. Clone or ZIP Download [the whole Repo](https://github.com/decentraland/sdk7-goerli-plaza) ,
2. Import `clap-claimm-disponser` folder(in the root of the project) as a new Scene in the Creator Hub.
3. Once the scene is loaded, hit Preview.
4.  Congratz! You should see the Wereable Dispenser, and be able to do a `CLAP EMOTE` and claim the Wereable by clapping!

## Customizing the Dispenser

Now that we have our Dispenser set up, we will probably be wanting to change it's position, rotation, glb, et. So let's see how to do some of those things.

### Poiting to your Campaign's Dispenser

Before starting make sure you completed this steps:

1. Create a campaign, 
2. Add a collection to it. To add a collection to a campaign, that collection should give Minter access to the Minting address we got in the previous step.  
3. Create a dispenser poiting to that collection for minting. 
4. You will need to fund the Campaign Address with POL to cover minting GAS fees.
5. Once you have the funds, Active the Campaign.

Now you should have a **Campaign Address**(the one also used to give Minter access to a collection, and to send funds to the Campaign) and a **Dispenser Key**(you can copy it in the Dispenser section, make sure you cope the Key of the correct dispenser).

We will set our code to point to our new **Campaign Address** and **Dispenser Key**.

Let's go to our `ClaimConfig` constant inn `src/modules/claiming/claimConfig.ts`:

```
export const ClaimConfig = {
    rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.zone' : 'https://rewards.decentraland.org',
    campaign: {
        Testing: {
            refId: 'Testing',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '<CAMPAIGN_ADDRESS>',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : '<DISPENSER_KEY>'
            },
            startDate: new Date('2025-09-09T17:00:00Z'),
            endDate: new Date('2025-00-21T21:00:00Z')
        }
    }
```

Where:

* `<CAMPAIGN_ID>` is the Minting Address of your campaign. **Replace for yours here**
* `<DISPENSER_KEY>` is the Dispenser secret key, replace with yours.

The `startDate` and `endDate` are not mandatory and will not interrupt the mint. This is set when you crate the Dispenser in the Campaign.

Now, your scene dispenser will mint from your campaign, use some of the funds you transfered into the campaign to cover the GAS fees, and transfer the wereable to the user claiming!

### Setting up Dispenser Position, Rotation and Wereable GLB

To edit the position and rotation of the dispenser, go to `initDispensers` function in `src/modules/dispensers.ts` file:

```
export function initDispensers() {
    initClapToClaim()

    createDispenserWithWearable(
        Vector3.create(<X_P>, <Y_P> , <Z_P>),Quaternion.fromEulerDegrees(<X_R>, <Y_R>, <Z_R>),
        "models/<PATH_TO_WEREABLE_GLB>",
        ClaimConfig.campaign.Testing
    );
}
```

Where: 

* `<X_P>`, `<Y_P>`, `<Z_P>`: Sets the dispenser position(x, y, z) in the scene.
* `<X_R>`, `<Y_R>`, `<Z_R>`: Sets the dispenser rotation(x, y, z) in the scene.
* `<PATH_TO_WEREABLE_GLB>`: Path to your wereable GLB, that will be displayed in the dispenser.

### Dispenser and UI Designs

Since this is an example from the Fashion Week dispensers, the models loaded by default will have those banners. You can create your own dispenser model(with Blender or Meshy AI) and replace the default one. 

#### Changing the Dispenser model

Let's go to the first few lines of `createDispenserWithWearable` function in `src/modules/dispensers.ts`:

```
function createDispenserWithWearable(position: Vector3, rotation: Quaternion, wearableSrc: string, campaign: ClaimConfigInstType) {
    const dispenser = engine.addEntity();
    Transform.create(dispenser, {
        position: position,
        rotation: rotation,
        scale: Vector3.create(1.5, 1.5, 1.5),
    });
    GltfContainer.create(dispenser, { src: "<PATH_TO_DISPENSER_GLB>" });
```

Where:

* `<PATH_TO_DISPENSER_GLB>` should be replaced with the path to the glb replacement.

#### Disabling/Changing the UI texture

When claiming a wereable, the texture shown in the UI also is from the MTFW. We can change or delete the texture and have an empty backgroun(if deleted) or a new background(if changed). 

For this, go to the `UiEntity key={"ui-background}"` in `src/modules/ui/dispenserUi.tsx`:

```
uiBackground={{
    texture: { 
        src: 'images/claim/MVFW_Background.png' 
     },
        textureMode: 'stretch'
}}
```

If:

* **Deleting the `uiBackground`**: Will have a transparent backgroun
* ++Changing the `src` model**: Will apply your new png(jpg) as the bakground

## Following Steps

Many things could be achieved, for example:

* Changing the emote that triggers the claim
* Triggering the laim through other behaviours
* Adding more than one dispenser to a scene
* Changing the dispenser model for a complete new shape
* Tinker aroud!

Please, feel free to reach out through the [Discord Server](https://discord.gg/G3QjWPND) if you have any questions or want to discuss other topics.
