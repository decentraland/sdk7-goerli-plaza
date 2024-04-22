import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { sceneCentrePosition } from "../structures";
import { Vector3 } from "@dcl/sdk/math";




// Make artNumbers visible to help with placing and naming items in the gallery:

/*
 const artNumbers = engine.addEntity()
 Transform.create(artNumbers, { position: sceneCentrePosition })
 GltfContainer.create(artNumbers, { src: 'models/artNumbers.glb' })
*/


interface Artwork {
    title: string;
    description: string;
}

export const artDetails: Artwork[] = []

export function initializeArtDetails() {
    artDetails.push(
        { title: 'Artwork 1', description: 'Long artwork description example, feel free to edit me in artData.ts. You can add a good amount of text here - or you can use line breaks to adjust the description spacing to your liking. :)' },
        { title: 'Artwork 2', description: 'Description 2' },
        { title: 'Artwork 3', description: 'Description 3' },
        { title: 'Artwork 4', description: 'Description 4' },
        { title: 'Artwork 5', description: 'Description 5' },
        { title: 'Artwork 6', description: 'Description 6' },
        { title: 'Artwork 7', description: 'Description 7' },
        { title: 'Artwork 8', description: 'Description 8' },
        { title: 'Artwork 9', description: 'Description 9' },
        { title: 'Artwork 10', description: 'Description 10' },
        { title: 'Artwork 11', description: 'Description 11' },
        { title: 'Artwork 12', description: 'Description 12' },
        { title: 'Artwork 13', description: 'Description 13' },
        { title: 'Artwork 14', description: 'Description 14' },
        { title: 'Artwork 15', description: 'Description 15' },
        { title: 'Artwork 16', description: 'Description 16' },
        { title: 'Artwork 17', description: 'Description 17' },
        { title: 'Artwork 18', description: 'Description 18' },
        { title: 'Artwork 19', description: 'Description 19' },
        { title: 'Artwork 20', description: 'Description 20' },
        { title: 'Artwork 21', description: 'Description 21' },
        { title: 'Artwork 22', description: 'Description 22' },
        { title: 'Artwork 23', description: 'Description 23' },
        { title: 'Artwork 24', description: 'Description 24' },
        { title: 'Artwork 25', description: 'Description 25' },
        { title: 'Artwork 26', description: 'Description 26' },
        { title: 'Artwork A', description: 'Description A' },
        { title: 'Artwork B', description: 'Description B' },
        { title: 'Artwork C', description: 'Description C' },
        { title: 'Artwork D', description: 'Description D' },
    )

    // Add more artworks as needed
    // Change titles and descriptions here to match your art :) 
}


interface ArtPostions {
    position: Vector3;
    rotation: Vector3;
}

export const artPositions: ArtPostions[] = [

    // Ground floor gallery:
    // Back wall three artworks south to north (room: 1)
    { position: Vector3.create(2.79, 3, 9.8), rotation: Vector3.create(0, -90, 0) },
    { position: Vector3.create(2.8, 3.25, 16), rotation: Vector3.create(0, -90, 0) },
    { position: Vector3.create(2.82, 3, 22.19), rotation: Vector3.create(0, -90, 0) },
    // South door
    { position: Vector3.create(12.15, 3, 7.75), rotation: Vector3.create(0, 180, 0) },
    // North door
    { position: Vector3.create(12.18, 3, 24.2), rotation: Vector3.create(0, 0, 0) },


    // First floor gallery: 
    // South wall three artworks east to west (room: 2)
    { position: Vector3.create(24.15, 10.9, 8.27), rotation: Vector3.create(0, 180, 0) },
    { position: Vector3.create(20.6, 10.9, 8.27), rotation: Vector3.create(0, 180, 0) },
    { position: Vector3.create(17.09, 10.9, 8.27), rotation: Vector3.create(0, 180, 0) },
    // West wall two artworks south to north
    { position: Vector3.create(3.57, 11.1, 11.2), rotation: Vector3.create(0, -90, 0) },
    { position: Vector3.create(3.57, 11.1, 20.8), rotation: Vector3.create(0, -90, 0) },
    // North wall three artworks west to east
    { position: Vector3.create(17.07, 10.9, 23.71), rotation: Vector3.create(0, 0, 0) },
    { position: Vector3.create(20.6, 10.9, 23.71), rotation: Vector3.create(0, 0, 0) },
    { position: Vector3.create(24.17, 10.9, 23.71), rotation: Vector3.create(0, 0, 0) },


    // Mezzanine level:
    // West wall two artworks south to north (room: 2)
    { position: Vector3.create(3.5, 15.43, 12), rotation: Vector3.create(0, -90, 0) },
    { position: Vector3.create(3.5, 15.43, 20.15), rotation: Vector3.create(0, -90, 0) },
    { position: Vector3.create(8.44, 15.43, 23.73), rotation: Vector3.create(0, 0, 0) },
    { position: Vector3.create(15, 15.43, 23.73), rotation: Vector3.create(0, 0, 0) },
    { position: Vector3.create(21.55, 15.43, 23.73), rotation: Vector3.create(0, 0, 0) },
    // East wall three artworks north to south
    { position: Vector3.create(26.29, 15.43, 21.28), rotation: Vector3.create(0, 90, 0) },
    { position: Vector3.create(26.29, 15.43, 16.13), rotation: Vector3.create(0, 90, 0) },
    { position: Vector3.create(26.29, 15.43, 10.7), rotation: Vector3.create(0, 90, 0) },
    //South wall three artworks east to west
    { position: Vector3.create(21.5, 15.43, 8.34), rotation: Vector3.create(0, 180, 0) },
    { position: Vector3.create(15, 15.43, 8.34), rotation: Vector3.create(0, 180, 0) },
    { position: Vector3.create(8.4, 15.43, 8.34), rotation: Vector3.create(0, 180, 0) },
    /// Exterior Video south 
    { position: Vector3.create(21.75, 13.25, 7.5), rotation: Vector3.create(0, 0, 0) },
    /// Exterior Video north
    { position: Vector3.create(21.75, 13.25, 24.5), rotation: Vector3.create(0, 180, 0) },


    /// 3D Art / Animated Sculptures: 
    // room: 1
    { position: Vector3.create(8.3, 1.9, 13), rotation: Vector3.create(0, 180, 0) },
    { position: Vector3.create(8.3, 1.9, 19), rotation: Vector3.create(0, 180, 0) },
    // room: 2
    { position: Vector3.create(21.65, 10.5, 16), rotation: Vector3.create(0, 0, 0) },
    { position: Vector3.create(6.5, 9.72, 16), rotation: Vector3.create(0, 0, 0) },


]


