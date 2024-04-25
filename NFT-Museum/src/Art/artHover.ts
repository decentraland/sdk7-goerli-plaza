import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, pointerEventsSystem } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { artDetails, artPositions } from "./artData";
import { openNFTlink } from "./nftArt";
import { imageArtCollection, openImageLink } from "./imageArt";
import { openVideoLink, videoCollection } from "./videoArt";
import { kineticArtCollection, openKineticLink } from "./kineticArt";


export let hoverDistance = 8 // Distance at which artHover UI will appear
let visibilityTime = 9000 // duration of the artHover UI in miliseconds
let cooldownTime = 1000



export let hoverVisible = false
export let currentArtworkId = 0;

// Adjustments to kinetic hover area sizes 
let sizeAdjust = 0.5 // smaller
let biggerSizeAdjust = 2.5 // larger


export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtID(position: Vector3, rotation: Vector3, scale: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity();
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);

    if (artDetails[artworkId].type !== 'nft' && artDetails[artworkId].type !== 'kinetic') {
        Transform.create(entity, {
            position: Vector3.create(position.x, position.y, position.z),
            rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
            scale: scale
        });

    } else if (artDetails[artworkId].type === 'nft') {
        Transform.create(entity, {
            position: Vector3.create(position.x, position.y, position.z),
            rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
            scale: Vector3.create(scale.x * sizeAdjust, scale.y * sizeAdjust, scale.z * sizeAdjust)
        });

    } else if (artDetails[artworkId] && artDetails[artworkId].type === 'kinetic') {
        if (artPositions[artworkId].scale.x > 0.3) {
            Transform.create(entity, {
                position: Vector3.create(position.x, position.y, position.z),
                rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
                scale: Vector3.create(scale.x * biggerSizeAdjust, scale.y * biggerSizeAdjust, scale.z * biggerSizeAdjust)
            });
        } else {
            Transform.create(entity, {
                position: Vector3.create(position.x, position.y, position.z),
                rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
                scale: Vector3.create(scale.x, scale.y, scale.z)
            });
        }
    }


    // MeshRenderer.setBox(entity); // handy for debugging
    MeshCollider.setBox(entity);
    ArtHover.create(entity, { visible: false });
    PointerEvents.create(entity, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_HOVER_ENTER,
                eventInfo: {
                    button: InputAction.IA_ANY,
                    hoverText: artTitle,
                    maxDistance: hoverDistance
                }
            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    hoverText: "Click",
                    maxDistance: hoverDistance,
                },
            }
        ]
    });


    // Custom pointer events for Art Types
    pointerEventsSystem.onPointerDown(entity, (event) => {
       
        if (event.button === InputAction.IA_POINTER) {
            console.log("Pointer down event triggered!");
            const id = getArtworkId(entity);
            console.log("Artwork ID:", id);
           
            if (id !== undefined) {
                const type = artDetails[id].type;
                console.log("Artwork Type:", type);
              
                if (type === 'nft') {
                    console.log('Clicked NFT');
                    openNFTlink(id);
               
                } else if (type === 'image') {
                    console.log('Clicked Image');
                    const artwork = imageArtCollection.find(art => art.id === id);
                    if (artwork) {
                        const url = artwork.url;
                        openImageLink(url);
                    } else {
                        console.log("Artwork not found in imageArtCollection");
                    }
               
                } else if (type === 'video') {
                    console.log('Clicked Video');
                    const artwork = videoCollection.find(art => art.id === id);
                    if (artwork) {
                        const url = artwork.website;
                        openVideoLink(url);
                    } else {
                        console.log("Artwork not found in videoCollection");
                    }
              
                } else if (type === 'kinetic') {
                    console.log('Clicked 3D Kinetic Art');
                    const artwork = kineticArtCollection.find(art => art.id === id);
                    if (artwork) {
                        const url = artwork.url;
                        openKineticLink(url);
                    } else {
                        console.log("Artwork not found in kineticArtCollection");
                    }

                } else {
                    console.log('Unknown artwork type:', type);
                }

            } else {
                console.log("Artwork ID not found!");
            }
        }
    });


    return entity;
}

export function artHoverSystem(dt: number) {
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        Transform.getMutable(entity)
        ArtHover.get(entity)
    }
}

let inCooldown = false;

export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {

            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('Hover enter for artworkID:', artworkId);
            }

            // Check if not in cooldown before updating visibility
            if (!inCooldown) {
                hoverVisible = true;
                utils.timers.setTimeout(() => {
                    hoverVisible = false;
                    // Set cooldown after visibility time
                    inCooldown = true;
                    // Start cooldown timer
                    utils.timers.setTimeout(() => {
                        inCooldown = false;
                    }, cooldownTime);
                }, visibilityTime);
            }

        } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
            // Always update hoverVisible on leave
            hoverVisible = false;
            // Set cooldown when leaving
            inCooldown = true;
            utils.timers.setTimeout(() => {
                // Reset cooldown after cooldown time
                inCooldown = false;
            }, cooldownTime);
            console.log('Hover leave');
        }
    }
}


export function toggleHover() {
    hoverVisible = false
}

export function changeCurrentArtworkId(newId: number) {
    const artwork = findArtworkById(newId);
    if (artwork && artwork.visible) {
        currentArtworkId = newId;
    }
}

export function findArtworkById(id: number): ArtworkData | undefined {
    return artworkData.find(artwork => artwork.artworkId === id);
}

export const ArtworkIdMap = new Map<Entity, number>();

export function setArtworkId(entity: Entity, artworkId: number) {
    ArtworkIdMap.set(entity, artworkId);
}

export function getArtworkId(entity: Entity): number | undefined {
    return ArtworkIdMap.get(entity);
}

export interface ArtworkData {
    entity: Entity;
    artworkId: number;
    title: string;
    description: string;
    visible: boolean;
}

export const artworkData: ArtworkData[] = []


export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
    artworkData.push({ entity, artworkId, title, description, visible });
}


export function createArtHovers() {
    const artworkData = [
        ...artPositions.map((position, index) => ({
            position: position.position,
            rotation: position.rotation,
            scale: position.scale,
            index,
            title: artDetails[index]?.title || '',
            description: artDetails[index]?.description || ''
        })),
    ];

    artworkData.forEach(artwork => {
        const entity = createArtID(artwork.position, artwork.rotation, artwork.scale, artwork.index, artwork.title, artwork.description);
        addArtworkData(entity, artwork.index, artwork.title, artwork.description, true);
    });
}

