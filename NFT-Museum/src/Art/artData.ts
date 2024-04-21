import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { sceneCentrePosition } from "../structures";




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
        { title: 'Artwork 1', description: 'Description 1' },
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

  }
   
    


    // Add more artworks as needed
    // The artwork id matches the title and description number
    // Change titles and descriptions here to match your art :) 
  

