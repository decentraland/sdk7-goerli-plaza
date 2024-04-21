import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { artPos1, artRot1, artPos2, artRot2, artPos3, artRot3, artPos4, artRot4, artPos5, artRot5, artPos6, artRot6, artPos7, artPos8, artRot8, artPos9, artRot9, artPos10, artRot10, artPos11, artRot11, artPos12, artRot12, artPos13, artRot13, artPos14, artRot14, artPos15, artRot15, artPos16, artRot16, artPos17, artRot17, artPos18, artRot18, artPos19, artRot19, artPos20, artRot20, artPos21, artRot21, artPos22, artRot22, artPos23, artRot23, artPos24, artRot24, artPos25, artRot25, artPos26, artRot26, artPosA, artRotA, artPosB, artRotB, artPosC, artRotC, artPosD, artRotD, artRot7 } from "./artPositions";
import { artDetails, initializeArtDetails } from "./artData";
import { cleanString } from "../helperFunctions";


let hoverDistance = 8 // Distance at which artHover UI will appear
let visibilityTime = 9000 // duration of the artHover UI in miliseconds
let defaultScale = Vector3.create(0.65, 0.25, 0.65) // art hover trigger size



export let hoverVisible = false
export let currentArtworkId = 1;

export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtID(position: Vector3, rotation: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity()
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);
    Transform.create(entity, {
        position: Vector3.create(position.x, position.y - 1, position.z),
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: defaultScale
    })

    // MeshRenderer.setBox(entity) // handy for debugging
    MeshCollider.setBox(entity)
    ArtHover.create(entity, { visible: false })
    PointerEvents.create(entity, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: {
                    button: InputAction.IA_ANY, hoverText: artTitle, maxDistance: hoverDistance
                }
            }

        ]
    })
    return entity
}

export function artHoverSystem(dt: number) {
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        const mutableTransform = Transform.getMutable(entity)
        const artDetails = ArtHover.get(entity)
    }
}


export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {

            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('hover?', hoverVisible);
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

const yOffset = -0.5


export function createArtHovers() {

    if (artDetails.length === 0) {
        initializeArtDetails();
        console.log('initialized art details');
    }

    
    const entityData = {
        entityIDs: [] as number[],
        entityPositions: [] as Vector3[],
        entityRotations: [] as Vector3[],
        entityIndex: [] as number[],
        entityTitle: [] as string[],
        entityDescription: [] as string[]
    };

    const adjustments = [
        { index: 1, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }, // Adjustments for artwork 1
        { index: 2, position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }, // Adjustments for artwork 2
        // Add more adjustments for other artworks as needed
    ];

    for (let i = 0; i < 30; i++) {
        const artPosValues: Vector3[] = [artPos1, artPos2];
        const artPos = artPosValues[i];        
        const artRotValues: Vector3[] = [artRot1, artRot2];
        const artRot = artRotValues[i];        
        const artDetail = artDetails[i];
        const adjustment = adjustments.find(adj => adj.index === i + 1) || { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } };

        const adjustedPosition = Vector3.create(artPos.x + adjustment.position.x, artPos.y + yOffset + adjustment.position.y, artPos.z + adjustment.position.z);
        const adjustedRotation = Vector3.create(artRot.x + adjustment.rotation.x, artRot.y + adjustment.rotation.y, artRot.z + adjustment.rotation.z);

        console.log('position:', artPos.x, artPos.y, artPos.z);
        console.log('rotation:', artRot.x, artRot.y, artRot.z);
        console.log('adjusted rotation:', artRot.x + adjustment.rotation.x, artRot.y + adjustment.rotation.y, artRot.z + adjustment.rotation.z);
        console.log('adjusted position:', artPos.x + adjustment.position.x, artPos.y + adjustment.position.y, artPos.z + adjustment.position.z);
        

        const entity = createArtID(adjustedPosition, adjustedRotation, i + 1, artDetail.title, artDetail.description);
        addArtworkData(entity, i + 1, artDetail.title, artDetail.description, true);

        entityData.entityIDs.push(entity);
        entityData.entityPositions.push(adjustedPosition);
        entityData.entityRotations.push(adjustedRotation);
        entityData.entityIndex.push(i + 1);
        entityData.entityTitle.push(artDetail.title);
        entityData.entityDescription.push(artDetail.description);
    }
}


/*
export function createArtHovers() {

    const entityID: number[] = []
    const entityPositions: Vector3[] = []
    const entityRotations: Vector3[] = []
    const entityIndex: number[] = []
    const entityTitle: string[] = []
    const entityDescription: string[] = []

    const artworkData = [
        { position: Vector3.create(artPos1.x, artPos1.y, artPos1.z), rotation: artRot1, index: 1, title: artDetails[0].title, description: artDetails[0].description },
        { position: Vector3.create(artPos2.x, artPos2.y - 0.25, artPos2.z), rotation: artRot2, index: 2, title: artDetails[1].title, description: artDetails[1].description },
        { position: Vector3.create(artPos3.x, artPos3.y, artPos3.z), rotation: artRot3, index: 3, title: artDetails[2].title, description: artDetails[2].description },
        { position: Vector3.create(artPos4.x, artPos4.y, artPos4.z), rotation: artRot4, index: 4, title: artDetails[3].title, description: artDetails[3].description },
        { position: Vector3.create(artPos5.x, artPos5.y, artPos5.z), rotation: artRot5, index: 5, title: artDetails[4].title, description: artDetails[4].description },
        { position: Vector3.create(artPos6.x, artPos6.y + 0.25, artPos6.z), rotation: artRot6, index: 6, title: artDetails[5].title, description: artDetails[5].description },
        { position: Vector3.create(artPos7.x, artPos7.y + 0.25, artPos7.z), rotation: artRot7, index: 7, title: artDetails[6].title, description: artDetails[6].description },
        { position: Vector3.create(artPos8.x, artPos8.y + 0.25, artPos8.z), rotation: artRot8, index: 8, title: artDetails[7].title, description: artDetails[7].description },
        { position: Vector3.create(artPos9.x, artPos9.y, artPos9.z), rotation: artRot9, index: 9, title: artDetails[8].title, description: artDetails[8].description },
        { position: Vector3.create(artPos10.x, artPos10.y, artPos10.z), rotation: artRot10, index: 10, title: artDetails[9].title, description: artDetails[9].description },
        { position: Vector3.create(artPos11.x, artPos11.y + 0.25, artPos11.z), rotation: artRot11, index: 11, title: artDetails[10].title, description: artDetails[10].description },
        { position: Vector3.create(artPos12.x, artPos12.y + 0.25, artPos12.z), rotation: artRot12, index: 12, title: artDetails[11].title, description: artDetails[11].description },
        { position: Vector3.create(artPos13.x, artPos13.y + 0.25, artPos13.z), rotation: artRot13, index: 13, title: artDetails[12].title, description: artDetails[12].description },
        { position: Vector3.create(artPos14.x, artPos14.y, artPos14.z), rotation: artRot14, index: 14, title: artDetails[13].title, description: artDetails[13].description },
        { position: Vector3.create(artPos15.x, artPos15.y, artPos15.z), rotation: artRot15, index: 15, title: artDetails[14].title, description: artDetails[14].description },
        { position: Vector3.create(artPos16.x, artPos16.y, artPos16.z), rotation: artRot16, index: 16, title: artDetails[15].title, description: artDetails[15].description },
        { position: Vector3.create(artPos17.x, artPos17.y, artPos17.z), rotation: artRot17, index: 17, title: artDetails[16].title, description: artDetails[16].description },
        { position: Vector3.create(artPos18.x, artPos18.y, artPos18.z), rotation: artRot18, index: 18, title: artDetails[17].title, description: artDetails[17].description },
        { position: Vector3.create(artPos19.x, artPos19.y, artPos19.z), rotation: artRot19, index: 19, title: artDetails[18].title, description: artDetails[18].description },
        { position: Vector3.create(artPos20.x, artPos20.y, artPos20.z), rotation: artRot20, index: 20, title: artDetails[19].title, description: artDetails[19].description },
        { position: Vector3.create(artPos21.x, artPos21.y, artPos21.z), rotation: artRot21, index: 21, title: artDetails[20].title, description: artDetails[20].description },
        { position: Vector3.create(artPos22.x, artPos22.y, artPos22.z), rotation: artRot22, index: 22, title: artDetails[21].title, description: artDetails[21].description },
        { position: Vector3.create(artPos23.x, artPos23.y, artPos23.z), rotation: artRot23, index: 23, title: artDetails[22].title, description: artDetails[22].description },
        { position: Vector3.create(artPos24.x, artPos24.y, artPos24.z), rotation: artRot24, index: 24, title: artDetails[23].title, description: artDetails[23].description },
        { position: Vector3.create(artPos25.x - 4.5, artPos25.y - 2.1, artPos25.z), rotation: artRot25, index: 25, title: artDetails[24].title, description: artDetails[24].description },
        { position: Vector3.create(artPos26.x - 4.5, artPos26.y - 2.1, artPos26.z), rotation: artRot26, index: 26, title: artDetails[25].title, description: artDetails[25].description },
        { position: artPosA, rotation: artRotA, index: 27, title: artDetails[26].title, description: artDetails[26].description },
        { position: artPosB, rotation: artRotB, index: 28, title: artDetails[27].title, description: artDetails[27].description },
        { position: artPosC, rotation: artRotC, index: 29, title: artDetails[28].title, description: artDetails[28].description },
        { position: Vector3.create(artPosD.x + 1, artPosD.y + 1, artPosD.z), rotation: artRotD, index: 30, title: artDetails[29].title, description: artDetails[29].description }
    ]

    artworkData.forEach((artwork, i) => {
        const entity = createArtID(Vector3.create(artwork.position.x, artwork.position.y + yOffset, artwork.position.z), artwork.rotation, artwork.index, artwork.title, artwork.description);
        addArtworkData(entity, artwork.index, artwork.title, artwork.description, true);

        entityID[i] = entity;
        entityPositions[i] = Vector3.create(artwork.position.x, artwork.position.y + yOffset, artwork.position.z);
        entityRotations[i] = artwork.rotation;
        entityIndex[i] = artwork.index;
        entityTitle[i] = artwork.title;
        entityDescription[i] = artwork.description;
    });
}
*/
