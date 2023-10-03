# Events API Board

Call the Decentraland Events API to display events that are currently going on. If there are several active at the same time, it will cycle through up to 5 events.


<img src="images/screenshot.png" width="500"> 

This scene shows you:
- How to call the Decentraland Events API
- How to handle async functions that require waiting for a response
- How to parse a JSON response from an API
- How to parse incoming text fields so that they adjust to line width and a maximum length
- How to use a system to shuffle through different in-world UI screens 
- How to use a teleport to travel to other locations in Decentraland

Events that are currently going on have a `live` field = _true_, so it's easy to filter through the returned events to only pick those that are live.

The board displays the event's title, screenshot, location, and location name (if applicable). The board also works as a teleport when clicked, taking players to the currently displayed event.

## About the events API:

Root URL: https://events.decentraland.org/api/events/

Events are always ordered by their `start_at` time

optional params:

- limit: only show x amount of events
- offset: start showing events from x position onwards
- position: a single event on x position
- estate_id: only events that happen in a given estate
- user: only events created by a given user
- onlyUpcoming: only events that have not started yet


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

**Scene Usage**

If there are no live events right now, you won't see the board when running the preview. If there are several live events, they will be shuffled through every few seconds, or you can also click on the dots on the bottom of the board to switch through them manually.


Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.


## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.