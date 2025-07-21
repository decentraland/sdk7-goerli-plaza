import { GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { sceneCentrePosition } from '../structures'
import { Vector3 } from '@dcl/sdk/math'

// Make artNumbers visible to help with placing and naming items in the gallery:

/*
const artNumbers = engine.addEntity()
Transform.create(artNumbers, { position: sceneCentrePosition })
GltfContainer.create(artNumbers, { src: 'assets/scene/Models/artNumbers.glb' })
*/

interface Artwork {
  title: string
  description: string
  type: string
}

export const artDetails: Artwork[] = []

export function initializeArtDetails() {
  artDetails.push(
    {
      title: 'Artwork 0',
      description:
        'Long artwork description example, feel free to edit me in artData.ts. You can add a good amount of text here - or you can use line breaks to adjust the description spacing to your liking. :)',
      type: 'nft'
    }, // 0
    { title: 'Artwork 1', description: 'Description 1', type: 'video' }, // 1
    { title: 'Artwork 2', description: 'Description 2', type: 'nft' }, // 2
    { title: 'Artwork 3', description: 'Description 3', type: 'image' }, // 3
    { title: 'Artwork 4', description: 'Description 4', type: 'image' }, // 4
    { title: 'Artwork 5', description: 'Description 5', type: 'nft' }, // 5
    { title: 'Artwork 6', description: 'Description 6', type: 'nft' }, // 6
    { title: 'Artwork 7', description: 'Description 7', type: 'nft' }, // 7
    { title: 'Artwork 8', description: 'Description 8', type: 'image' }, // 8
    { title: 'Artwork 9', description: 'Description 9', type: 'image' }, // 9
    { title: 'Artwork 10', description: 'Description 10', type: 'nft' }, // 10
    { title: 'Artwork 11', description: 'Description 11', type: 'nft' }, // 11
    { title: 'Artwork 12', description: 'Description 12', type: 'nft' }, // 12
    { title: 'Artwork 13', description: 'Description 13', type: 'video' }, // 13
    { title: 'Artwork 14', description: 'Description 14', type: 'video' }, // 14
    { title: 'Artwork 15', description: 'Description 15', type: 'nft' }, // 15
    { title: 'Artwork 16', description: 'Description 16', type: 'nft' }, // 16
    { title: 'Artwork 17', description: 'Description 17', type: 'nft' }, // 17
    { title: 'Artwork 18', description: 'Description 18', type: 'nft' }, // 18
    { title: 'Artwork 19', description: 'Description 19', type: 'nft' }, // 19
    { title: 'Artwork 20', description: 'Description 20', type: 'nft' }, // 20
    { title: 'Artwork 21', description: 'Description 21', type: 'nft' }, // 21
    { title: 'Artwork 22', description: 'Description 22', type: 'nft' }, // 22
    { title: 'Artwork 23', description: 'Description 23', type: 'nft' }, // 23
    { title: 'Artwork 24', description: 'Description 24', type: 'video' }, // 24
    { title: 'Artwork 25', description: 'Description 25', type: 'video' }, // 25
    { title: 'Artwork A', description: 'Description A', type: 'kinetic' }, // 26
    { title: 'Artwork B', description: 'Description B', type: 'kinetic' }, // 27
    { title: 'Artwork C', description: 'Description C', type: 'kinetic' }, // 28
    { title: 'Artwork D', description: 'Description D', type: 'kinetic' } // 29
  )

  // Add more artworks as needed
  // Change titles and descriptions here to match your art :)
}

interface ArtPostions {
  position: Vector3
  rotation: Vector3
  scale: Vector3
}

export const artPositions: ArtPostions[] = [
  // Ground floor gallery:
  // Back wall three artworks south to north (room: 1)
  { position: Vector3.create(2.79, 3, 9.8), rotation: Vector3.create(0, -90, 0), scale: Vector3.create(4, 4, 4) }, // 0
  {
    position: Vector3.create(2.8, 3.25, 16),
    rotation: Vector3.create(0, -90, 0),
    scale: Vector3.create(0.003 * 1920, 0.003 * 1080, 1)
  }, // 1
  { position: Vector3.create(2.82, 3, 22.19), rotation: Vector3.create(0, -90, 0), scale: Vector3.create(4, 4, 4) }, // 2
  // South door
  {
    position: Vector3.create(12.15, 3, 7.75),
    rotation: Vector3.create(0, 180, 0),
    scale: Vector3.create(1.5, 1.5, 1.5)
  }, // 3
  // North door
  { position: Vector3.create(12.18, 3, 24.2), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(1.5, 1.5, 1.5) }, // 4

  // First floor gallery:
  // South wall three artworks east to west (room: 2)
  { position: Vector3.create(24.15, 10.9, 8.27), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 5
  { position: Vector3.create(20.6, 10.9, 8.27), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 6
  { position: Vector3.create(17.09, 10.9, 8.27), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 7
  // West wall two artworks south to north
  { position: Vector3.create(3.57, 11.1, 11.2), rotation: Vector3.create(0, -90, 0), scale: Vector3.create(1, 2, 1) }, // 8
  { position: Vector3.create(3.57, 11.1, 20.8), rotation: Vector3.create(0, -90, 0), scale: Vector3.create(1, 2, 1) }, // 9
  // North wall three artworks west to east
  { position: Vector3.create(17.07, 10.9, 23.71), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 10
  { position: Vector3.create(20.6, 10.9, 23.71), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 11
  { position: Vector3.create(24.17, 10.9, 23.71), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 12

  // Mezzanine level:
  // West wall two artworks south to north (room: 2)
  {
    position: Vector3.create(3.5, 15.43, 12),
    rotation: Vector3.create(0, -90, 0),
    scale: Vector3.create(0.0025 * 1920, 0.0025 * 1080, 1)
  }, // 13
  {
    position: Vector3.create(3.5, 15.43, 20.15),
    rotation: Vector3.create(0, -90, 0),
    scale: Vector3.create(0.0025 * 1920, 0.0025 * 1080, 1)
  }, // 14
  { position: Vector3.create(8.44, 15.43, 23.73), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 15
  { position: Vector3.create(15, 15.43, 23.73), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 16
  { position: Vector3.create(21.55, 15.43, 23.73), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(4, 4, 4) }, // 17
  // East wall three artworks north to south
  { position: Vector3.create(26.29, 15.43, 21.28), rotation: Vector3.create(0, 90, 0), scale: Vector3.create(4, 4, 4) }, // 18
  { position: Vector3.create(26.29, 15.43, 16.13), rotation: Vector3.create(0, 90, 0), scale: Vector3.create(4, 4, 4) }, // 19
  { position: Vector3.create(26.29, 15.43, 10.7), rotation: Vector3.create(0, 90, 0), scale: Vector3.create(4, 4, 4) }, // 20
  //South wall three artworks east to west
  { position: Vector3.create(21.5, 15.43, 8.34), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 21
  { position: Vector3.create(15, 15.43, 8.34), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 22
  { position: Vector3.create(8.4, 15.43, 8.34), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(4, 4, 4) }, // 23
  /// Exterior Video south
  { position: Vector3.create(21.75, 13.25, 7.5), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(6, 8.65, 1) }, // 24
  /// Exterior Video north
  {
    position: Vector3.create(21.75, 13.25, 24.5),
    rotation: Vector3.create(0, 180, 0),
    scale: Vector3.create(6, 8.65, 1)
  }, // 25

  /// 3D Art / Animated Sculptures:
  // room: 1
  { position: Vector3.create(8.3, 1.9, 13), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(0.5, 0.5, 0.5) }, // 26
  { position: Vector3.create(8.3, 1.9, 19), rotation: Vector3.create(0, 180, 0), scale: Vector3.create(0.5, 0.5, 0.5) }, // 27
  // room: 2
  {
    position: Vector3.create(21.65, 10.5, 16),
    rotation: Vector3.create(0, 0, 0),
    scale: Vector3.create(0.8, 0.8, 0.8)
  }, // 28
  { position: Vector3.create(6.5, 9.72, 16), rotation: Vector3.create(0, 0, 0), scale: Vector3.create(0.8, 0.8, 0.8) } // 29
]
