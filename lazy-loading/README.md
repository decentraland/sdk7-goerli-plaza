# Lazy Loading

This is an optimized scene that only loads certain entities when the player approaches them. This reduces the scene load time, and also has less of an impact on framerate as the player moves through the scene.

![](screenshot/screenshot.gif)

Art galleries often include a lot of NFTs, which raises the material count and impacts performance considerably. Keep in mind that the material count only considers materials being used at a given time. Entities that are not currently being loaded aren't counted. The ideal solution is to not load everything at once, but instead to load and unload content that is indoors as the player enters the corresponding parts of the scene.

This scene includes multiple small buildings, each with a set of NFTs in it. Each of these buildings has a trigger area that loads its NFTs only when the player walks near it, and then hides them when the player walks away.

For easier maintenance, the scene lists all of the NFTs in the scene in an array, including data about their positions and what subScene they belong to. The scene then assigns these to their corresponding subScene and handles showing and hiding them when appropriate.

We then take this further.  What if you wanted multiple galleries but not the space to display them all in your parcel.  Enter SubScenes.   We show you how to register entities to SubScenes, register those SubScenes to a Scene Manager and from there you can convienently swap out which subscenes you want visible and when.  It also provides a visibilityStrategy flag on the SubScene and registered SceneEntities allowing you to further fine tune how you manage resources of the scene.

## Video Tutorial

[https://www.youtube.com/watch?v=DXB72BNdEuU](https://www.youtube.com/watch?v=DXB72BNdEuU)


