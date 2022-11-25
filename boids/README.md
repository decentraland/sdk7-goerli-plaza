# Boids

Boids is an implementation of the boids algorithm. This can be used for simulation flock behavior such as birds or fish in 3D space.  It uses a grid implementation for fast lookups. 

# Class Overview

BoidsController class defines a container for boids entities. All entities (flock or obstalces) are added to BoidsController. BoidsController calculates and updates entity positions and velocities.

BoidSystem is the wrapper for BoidsController to make it work inside a Decentraland SDK. The responsibility of this class is to create a new BoidsController instance with the received data and run the requested iterations in this isolated context.

setupBoids is the setup class.  It will initialize the BoidController.  Here can define here the area, flock, obsticles, predators, subGrid count

BoidEntity class defines an entitiy model which has a position and a velocity. Also it has some utiliy methods.

Grid class creates cubic grid for spatial partitioning. This helps lookups to be performed faster for nearby entities. More information can be found here: http://gameprogrammingpatterns.com/spatial-partition.html

# Configuration

/src/boids/Constants.js

See Debug Markers such as grid markers, boundary top/bottom, obstacles, seek and prediator entities

```
//see debug markers for seek/obsticle/predator
VISIBLE_OBSTACLES:boolean = true 
VISIBLE_SEEK:boolean = true
VISIBLE_PREDATOR:boolean = true

// see boundary grid markers
SHOW_DEBUG_BOUNDARY_MARKERS:boolean = true
// see boundary planes (top,bottom)
SHOW_DEBUG_BOUNDARY_PLANES:boolean = true
```

/src/config.ts

```
TEST_CONTROLS_ENABLE = true
```

/src/boids/setupBoids.js

see initBoidController for creation of all entities types.  Some flags of note include

```
//SETUP BOUNDARIES
const parcelSize = 15.5
const width = parcelSize 
const depth = parcelSize * 2
const height = 5
const heightBottomOffset = 1 
const subGrids = 4 //large grid count makes all fish operating the same get reduced

/*
300 - 1 subgrid
600 - 2 subgrid
700 - 3 subgrid*
*/
//SETUP INITIALIZATION OF BOIDS
const flockEntityCount = 80
//will randomly place these
const obstacleEntityCount = 0
const predatorCount = 0
const seekCount = 0
```


## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Open this folder on the command line, then run:

```
dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

## Deploy to Decentraland

If you own any parcels of land in Decentraland, or have permissions to deploy to someone else's, you can publish this project.

1. Make sure the scene parcels in `scene.json` match those you own or have permissions on.
2. Run `dcl deploy` on the project folder
3. This will open a browser tab to confirm. Metamask will prompt you to sign.
   > Note: Make sure you are using the wallet that owns the parcels or has permissions.

### Deploy to a free server

If you don't own parcels in Decentraland or are not ready to publish your scene to the world, you can share your creations by uploading your scenes to a free hosting service.

See [Upload a preview](https://docs.decentraland.org/development-guide/deploy-to-now/) for instructions on how to do this.

## Resources

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

Find more example scenes, tutorials and helper libraries in the [Awesome Repository](https://github.com/decentraland-scenes/Awesome-Repository).

If you need any help, join [Decentraland's Discord](https://dcl.gg/discord), where you'll find a vibrant community of other creators who are eager to help. You're sure to find help in the #SDK support channel.

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.

## Acknowledgements

Code here is an adaptation of [https://ercang.github.io/boids-js/3-boids-webworkers/](https://ercang.github.io/boids-js/3-boids-webworkers/)

[https://github.com/ercang/boids-js](https://github.com/ercang/boids-js)

BoidJS has standard MIT licence. See the terms and conditions in the [LICENSE](credits/LICENSE) file.
