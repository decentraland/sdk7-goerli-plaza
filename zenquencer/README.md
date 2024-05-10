# Zenquencer

A sequencer that can be used to make music with others, writing musical patterns by activating stones.

When notes are played, activated or deactivated, these changes are shared with nearby players via the message bus. The note pattern is also stored in an Amazon S3 server.

![](screenshot/zenquencer.gif)

This scene shows you:
- How to use the message bus to keep players in sync with each other's actions while they're together in the scene
- How to send HTTP requests to an API to store the scene state in a permanent place, so others can then retrieve changes
- How to set up a server that is capable of handling the storage of data in a separate Amazon S3 server
- How to obtain the realm that a player is currently on
- How to play sounds from a file
- How to use a system to coordinate the timing of various actions
- How to use the utils library `Delay` component to buffer the updating various changes to the server



## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Setting up the server**

The scene is set up to make use of the same server that's used by Genesis Plaza. To launch your own server, we recommend you deploy what's in the `/server` folder to your own Firebase account, following the steps in [this tutorial](https://decentraland.org/blog/tutorials/servers-part-2/). To store data on an Amazon S3 server, as done here, you'll also need to set up your own Amazon S3, and fetch credentials for that account to include in your server folder.


## About syncing changes between players


When a player comes into the scene, they download the latest pattern from off the server. Then, as different players that are there change the pattern, they get these changes from each other using the Message Bus, they don’t need to check the server regularly to know what’s new.

For this to work properly, we need to keep a separate version of this pattern for each realm and know what realm each player is on when they update the pattern. This is because only players that are in the same realm message each other via the Message Bus. There would otherwise be odd inconsistencies in what the pattern ends up being when players that are in different realms modify the same pattern without notifying each other. The scene includes the player’s realm as part of the requests it sends, and the server then handles a different .json file depending on the realm.

> Note: This works fine as long as the scene is deployed in one single place in the map. If various copies of the same scene exist and call the same server, writing to the same database, then that could be a problem. If two players are interacting with the two different versions of the scene, they will be acting upon the same database, but they won't share changes via the message bus. This will result in inconsistencies in between what each one sees and the final result being stored.

Another noteworthy thing we’re doing in this example is that changes aren’t sent to the server right away, but instead we do a little buffer using the utils.Delay component, so that if the player changes several notes in quick succession, the server only gets notified of the final state of the pattern. This helps reduce the number of requests that the server needs to handle. For it to work, each update request needs to send the full state of the pattern, rather than just the changed elements.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.
