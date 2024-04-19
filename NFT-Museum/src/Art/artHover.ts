import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Quaternion, Vector3 } from "@dcl/sdk/math";
//import { getRandomHexColor } from "../helperFunctions";
import { artTitle1, artDescription1, artTitle2, artDescription2, artDescription10, artDescription11, artDescription12, artDescription13, artDescription14, artDescription15, artDescription16, artDescription17, artDescription18, artDescription19, artDescription20, artDescription21, artDescription22, artDescription23, artDescription24, artDescription3, artDescription4, artDescription5, artDescription6, artDescription7, artDescription8, artDescription9, artTitle10, artTitle11, artTitle12, artTitle13, artTitle14, artTitle15, artTitle16, artTitle17, artTitle18, artTitle19, artTitle20, artTitle21, artTitle22, artTitle23, artTitle24, artTitle3, artTitle4, artTitle5, artTitle6, artTitle7, artTitle8, artTitle9, artTitle25, artDescription25, artTitle26, artDescription26, artTitleA, artDescriptionA, artTitleB, artDescriptionB, artTitleC, artDescriptionC, artTitleD, artDescriptionD } from "./artData";
import { artPos1, artRot1, artPos2, artRot2, artPos3, artRot3, artPos4, artRot4, artPos5, artRot5, artPos6, artRot6, artPos7, artPos8, artRot8, artPos9, artRot9, artPos10, artRot10, artPos11, artRot11, artPos12, artRot12, artPos13, artRot13, artPos14, artRot14, artPos15, artRot15, artPos16, artRot16, artPos17, artRot17, artPos18, artRot18, artPos19, artRot19, artPos20, artRot20, artPos21, artRot21, artPos22, artRot22, artPos23, artRot23, artPos24, artRot24, artPos25, artRot25, artPos26, artRot26, artPosA, artRotA, artPosB, artRotB, artPosC, artRotC, artPosD, artRotD, artRot7 } from "./artPositions";


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

    MeshRenderer.setBox(entity) // handy for debugging
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
            //Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) }); // handy for debugging
            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('hover?', hoverVisible);
                console.log('should work');
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


// Create a map to store artwork IDs associated with entities
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
    ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
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

    const entityID: number[] = []
    const entityPositions: Vector3[] = []
    const entityRotations: Vector3[] = []
    const entityIndex: number[] = []
    const entityTitle: string[] = []
    const entityDescription: string[] = []

    const artworkData = [
        { position: Vector3.create(artPos1.x, artPos1.y, artPos1.z), rotation: artRot1, index: 1, title: artTitle1, description: artDescription1 },
        { position: Vector3.create(artPos2.x, artPos2.y - 0.25, artPos2.z), rotation: artRot2, index: 2, title: artTitle2, description: artDescription2 },
        { position: Vector3.create(artPos3.x, artPos3.y, artPos3.z), rotation: artRot3, index: 3, title: artTitle3, description: artDescription3 },
        { position: Vector3.create(artPos4.x, artPos4.y, artPos4.z), rotation: artRot4, index: 4, title: artTitle4, description: artDescription4 },
        { position: Vector3.create(artPos5.x, artPos5.y, artPos5.z), rotation: artRot5, index: 5, title: artTitle5, description: artDescription5 },
        { position: Vector3.create(artPos6.x, artPos6.y + 0.25, artPos6.z), rotation: artRot6, index: 6, title: artTitle6, description: artDescription6 },
        { position: Vector3.create(artPos7.x, artPos7.y + 0.25, artPos7.z), rotation: artRot7, index: 7, title: artTitle7, description: artDescription7 },
        { position: Vector3.create(artPos8.x, artPos8.y + 0.25, artPos8.z), rotation: artRot8, index: 8, title: artTitle8, description: artDescription8 },
        { position: Vector3.create(artPos9.x, artPos9.y, artPos9.z), rotation: artRot9, index: 9, title: artTitle9, description: artDescription9 },
        { position: Vector3.create(artPos10.x, artPos10.y, artPos10.z), rotation: artRot10, index: 10, title: artTitle10, description: artDescription10 },
        { position: Vector3.create(artPos11.x, artPos11.y + 0.25, artPos11.z), rotation: artRot11, index: 11, title: artTitle11, description: artDescription11 },
        { position: Vector3.create(artPos12.x, artPos12.y + 0.25, artPos12.z), rotation: artRot12, index: 12, title: artTitle12, description: artDescription12 },
        { position: Vector3.create(artPos13.x, artPos13.y + 0.25, artPos13.z), rotation: artRot13, index: 13, title: artTitle13, description: artDescription13 },
        { position: Vector3.create(artPos14.x, artPos14.y, artPos14.z), rotation: artRot14, index: 14, title: artTitle14, description: artDescription14 },
        { position: Vector3.create(artPos15.x, artPos15.y, artPos15.z), rotation: artRot15, index: 15, title: artTitle15, description: artDescription15 },
        { position: Vector3.create(artPos16.x, artPos16.y, artPos16.z), rotation: artRot16, index: 16, title: artTitle16, description: artDescription16 },
        { position: Vector3.create(artPos17.x, artPos17.y, artPos17.z), rotation: artRot17, index: 17, title: artTitle17, description: artDescription17 },
        { position: Vector3.create(artPos18.x, artPos18.y, artPos18.z), rotation: artRot18, index: 18, title: artTitle18, description: artDescription18 },
        { position: Vector3.create(artPos19.x, artPos19.y, artPos19.z), rotation: artRot19, index: 19, title: artTitle19, description: artDescription19 },
        { position: Vector3.create(artPos20.x, artPos20.y, artPos20.z), rotation: artRot20, index: 20, title: artTitle20, description: artDescription20 },
        { position: Vector3.create(artPos21.x, artPos21.y, artPos21.z), rotation: artRot21, index: 21, title: artTitle21, description: artDescription21 },
        { position: Vector3.create(artPos22.x, artPos22.y, artPos22.z), rotation: artRot22, index: 22, title: artTitle22, description: artDescription22 },
        { position: Vector3.create(artPos23.x, artPos23.y, artPos23.z), rotation: artRot23, index: 23, title: artTitle23, description: artDescription23 },
        { position: Vector3.create(artPos24.x, artPos24.y, artPos24.z), rotation: artRot24, index: 24, title: artTitle24, description: artDescription24 },
        { position: Vector3.create(artPos25.x - 4.5, artPos25.y -2.1, artPos25.z), rotation: artRot25, index: 25, title: artTitle25, description: artDescription25 },
        { position: Vector3.create(artPos26.x - 4.5, artPos26.y - 2.1, artPos26.z), rotation: artRot26, index: 26, title: artTitle26, description: artDescription26 },
        { position: artPosA, rotation: artRotA, index: 27, title: artTitleA, description: artDescriptionA },
        { position: artPosB, rotation: artRotB, index: 28, title: artTitleB, description: artDescriptionB },
        { position: artPosC, rotation: artRotC, index: 29, title: artTitleC, description: artDescriptionC },
        { position: Vector3.create(artPosD.x + 1, artPosD.y + 1, artPosD.z), rotation: artRotD, index: 30, title: artTitleD, description: artDescriptionD }
    ]

    artworkData.forEach((artwork, i) => {
        const entity = createArtID(Vector3.create(artwork.position.x, artwork.position.y + yOffset, artwork.position.z), artwork.rotation, artwork.index, artwork.title, artwork.description);
        addArtworkData(entity, artwork.index, artwork.title, artwork.description, true);
    
        // Store entity data in arrays
        entityID[i] = entity;
        entityPositions[i] = Vector3.create(artwork.position.x, artwork.position.y + yOffset, artwork.position.z);
        entityRotations[i] = artwork.rotation;
        entityIndex[i] = artwork.index;
        entityTitle[i] = artwork.title;
        entityDescription[i] = artwork.description;
    });
}

