import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, pointerEventsSystem } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { artDetails, artPositions } from "./artData";
import { NFTdata, openNFTlink } from "./nftArt";
import { imageArtCollection, openImageLink } from "./imageArt";
import { openVideoLink, videoCollection } from "./videoArt";
import { kineticArtCollection, openKineticLink } from "./kineticArt";


export let hoverDistance = 8 // Distance at which artHover UI will appear
let visibilityTime = 9000 // duration of the artHover UI in miliseconds
let defaultScale = Vector3.create(0.65, 0.25, 0.65) // art hover trigger size



export let hoverVisible = false
export let currentArtworkId = 0;
let sizeAdjust = 0.5
let yOffset = 0.5

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
    } else if (artDetails[artworkId].type === 'kinetic') {
        Transform.create(entity, {
            position: Vector3.create(position.x, position.y - yOffset, position.z),
            rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
            scale: scale
        });
    } 

    MeshRenderer.setBox(entity); // handy for debugging
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
                }
                else {
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


export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {

            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('hover?', hoverVisible, 'for artworkID:', artworkId);
            }

            hoverVisible = true;
            utils.timers.setTimeout(() => {
                hoverVisible = false;
            }, visibilityTime);

        } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
            hoverVisible = false;
            console.log('hover?', hoverVisible);

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


interface ArtHoverAdjustments {
    hoverAdjustment: Vector3
}


export function createArtHovers() {

    const entityID: number[] = []
    const entityPositions: Vector3[] = []
    const entityRotations: Vector3[] = []
    const entityIndex: number[] = []
    const entityTitle: string[] = []
    const entityDescription: string[] = []

    const artHoverAdjustments = [
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, - 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, + 0.25, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },
        { hoverAdjustment: Vector3.create(0, 0, 0) },

        { hoverAdjustment: Vector3.create(- 4.5, - 2.1, 0) },
        { hoverAdjustment: Vector3.create(- 4.5, - 2.1, 0) },

        { hoverAdjustment: Vector3.create(0, 1, 0) },
        { hoverAdjustment: Vector3.create(0, 1, 0) },
        { hoverAdjustment: Vector3.create(0.2, 1, 0) },
        { hoverAdjustment: Vector3.create(1.5, 1.5, 0) },




    ]

    const artworkData = [
        // Ground floor gallery:
        // Back wall three artworks south to north (room: 1)
        { position: artPositions[0].position, rotation: artPositions[0].rotation, scale: artPositions[0].scale, index: 0, title: artDetails[0].title, description: artDetails[0].description },
        { position: artPositions[1].position, rotation: artPositions[1].rotation, scale: artPositions[1].scale, index: 1, title: artDetails[1].title, description: artDetails[1].description },
        { position: artPositions[2].position, rotation: artPositions[2].rotation, scale: artPositions[2].scale, index: 2, title: artDetails[2].title, description: artDetails[2].description },
        // South door
        { position: artPositions[3].position, rotation: artPositions[3].rotation, scale: artPositions[3].scale, index: 3, title: artDetails[3].title, description: artDetails[3].description },
        // North door
        { position: artPositions[4].position, rotation: artPositions[4].rotation, scale: artPositions[4].scale, index: 4, title: artDetails[4].title, description: artDetails[4].description },

        // First floor gallery: 
        // South wall three artworks east to west (room: 2)
        { position: artPositions[5].position, rotation: artPositions[5].rotation, scale: artPositions[5].scale, index: 5, title: artDetails[5].title, description: artDetails[5].description },
        { position: artPositions[6].position, rotation: artPositions[6].rotation, scale: artPositions[6].scale, index: 6, title: artDetails[6].title, description: artDetails[6].description },
        { position: artPositions[7].position, rotation: artPositions[7].rotation, scale: artPositions[7].scale, index: 7, title: artDetails[7].title, description: artDetails[7].description },
        // West wall two artworks south to north
        { position: artPositions[8].position, rotation: artPositions[8].rotation, scale: artPositions[8].scale, index: 8, title: artDetails[8].title, description: artDetails[8].description },
        { position: artPositions[9].position, rotation: artPositions[9].rotation, scale: artPositions[9].scale, index: 9, title: artDetails[9].title, description: artDetails[9].description },
        // North wall three artworks west to east
        { position: artPositions[10].position, rotation: artPositions[10].rotation, scale: artPositions[10].scale, index: 10, title: artDetails[10].title, description: artDetails[10].description },
        { position: artPositions[11].position, rotation: artPositions[11].rotation, scale: artPositions[11].scale, index: 11, title: artDetails[11].title, description: artDetails[11].description },
        { position: artPositions[12].position, rotation: artPositions[12].rotation, scale: artPositions[12].scale, index: 12, title: artDetails[12].title, description: artDetails[12].description },
        // Mezzanine level:
        // West wall two artworks south to north (room: 2)
        { position: artPositions[13].position, rotation: artPositions[13].rotation, scale: artPositions[13].scale, index: 13, title: artDetails[13].title, description: artDetails[13].description },
        { position: artPositions[14].position, rotation: artPositions[14].rotation, scale: artPositions[14].scale, index: 14, title: artDetails[14].title, description: artDetails[14].description },
        { position: artPositions[15].position, rotation: artPositions[15].rotation, scale: artPositions[15].scale, index: 15, title: artDetails[15].title, description: artDetails[15].description },
        { position: artPositions[16].position, rotation: artPositions[16].rotation, scale: artPositions[16].scale, index: 16, title: artDetails[16].title, description: artDetails[16].description },
        { position: artPositions[17].position, rotation: artPositions[17].rotation, scale: artPositions[17].scale, index: 17, title: artDetails[17].title, description: artDetails[17].description },
        // East wall three artworks north to south
        { position: artPositions[18].position, rotation: artPositions[18].rotation, scale: artPositions[18].scale, index: 18, title: artDetails[18].title, description: artDetails[18].description },
        { position: artPositions[19].position, rotation: artPositions[19].rotation, scale: artPositions[19].scale, index: 19, title: artDetails[19].title, description: artDetails[19].description },
        { position: artPositions[20].position, rotation: artPositions[20].rotation, scale: artPositions[20].scale, index: 20, title: artDetails[20].title, description: artDetails[20].description },
        //South wall three artworks east to west
        { position: artPositions[21].position, rotation: artPositions[21].rotation, scale: artPositions[21].scale, index: 21, title: artDetails[21].title, description: artDetails[21].description },
        { position: artPositions[22].position, rotation: artPositions[22].rotation, scale: artPositions[22].scale, index: 22, title: artDetails[22].title, description: artDetails[22].description },
        { position: artPositions[23].position, rotation: artPositions[23].rotation, scale: artPositions[23].scale, index: 23, title: artDetails[23].title, description: artDetails[23].description },
        /// Exterior Video south 
        { position: artPositions[24].position, rotation: artPositions[24].rotation, scale: artPositions[24].scale, index: 24, title: artDetails[24].title, description: artDetails[24].description },
        /// Exterior Video north
        { position: artPositions[25].position, rotation: artPositions[25].rotation, scale: artPositions[25].scale, index: 25, title: artDetails[25].title, description: artDetails[25].description },
        /// 3D Art / Animated Sculptures:
        // room: 1
        { position: artPositions[26].position, rotation: artPositions[26].rotation, scale: artPositions[26].scale, index: 26, title: artDetails[26].title, description: artDetails[26].description },
        // room: 1
        { position: artPositions[27].position, rotation: artPositions[27].rotation, scale: artPositions[27].scale, index: 27, title: artDetails[27].title, description: artDetails[27].description },
        // room: 2
        { position: artPositions[28].position, rotation: artPositions[28].rotation, scale: artPositions[28].scale, index: 28, title: artDetails[28].title, description: artDetails[28].description },
        // room: 2
        { position: artPositions[29].position, rotation: artPositions[29].rotation, scale: artPositions[29].scale, index: 29, title: artDetails[29].title, description: artDetails[29].description }
    ]

    artworkData.forEach((artwork, i) => {
        const entity = createArtID(artwork.position, artwork.rotation, artwork.scale, artwork.index, artwork.title, artwork.description);
        addArtworkData(entity, artwork.index, artwork.title, artwork.description, true);
        entityID[i] = entity;
        entityPositions[i] = Vector3.create(artwork.position.x, artwork.position.y, artwork.position.z);
        entityRotations[i] = artwork.rotation;
        entityIndex[i] = artwork.index;
        entityTitle[i] = artwork.title;
        entityDescription[i] = artwork.description;
    });
}

