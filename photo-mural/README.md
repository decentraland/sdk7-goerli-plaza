# sdk7 Photo Mural example scene

Example scene of this module for displaying public photos from Camera Reel.

You can instantiate as many units as you want in the same scene. 

### Quick Start

```javascript
new PhotoMural({
    sceneCoords: ["143,-76", "143,-79"],
    transform: {
        position: Vector3.create(3, 1, 3),
        rotation: Quaternion.fromEulerDegrees(0, 45, 0)
    }
})
```

In case of having many instances of Photo Mural getting photos from the same scene coordinates, they will share the fetch system in order to optimize the amount of requests.

Photos from Camera Reel taken at this location has to manually be set as Public by the users. This can be done from Camera Reel Gallery inside Decentraland Explorer shortcut: [k]