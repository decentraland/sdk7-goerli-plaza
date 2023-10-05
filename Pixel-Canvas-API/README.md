## Pixel Canvas API

A scene that fetches pixel color data from an API and displays it on a giant canvas. Set your own pixel on the canvas and sync it with an online database via API.



![](images/screenshot.jpg)


This scene shows you:

- How to call a REST API and parse a JSON response
- How to store data in an online databse
- How to detect if player points on an entity
- How to update scene via messageBus
- How to use components to manage entities



## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

 1.  Download this full repository from  [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.
 2.  Install the  [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)
 3.  Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.
 4.  Open the Decentraland Editor tab, and press  **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```bash

npm  run start

```

## Scene Setup

### Self Hosting
You can host the database yourself. Please refer to the [/server](/server) directory for more details.

### Managed Hosting

1. Create an account on [restdb.io](https://restdb.io/)

2. Set up a table in the database with the required fields. Restdb.io will autogenerate a REST API for your table.

The table for this scene should have the following format:

```javascript
posX: number
posY: number
hexColor: string
```
***CORS Configuration***
To allow access from a Decentraland scene:


1. Navigate to the API tab under settings on restdb.io.
2. Create a new "Web page API key (CORS)".
3. Replace the `apiKey` value in `api.ts` with your generated API key.




## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
