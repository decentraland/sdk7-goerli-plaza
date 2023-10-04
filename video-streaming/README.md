# Video streaming

A scene with examples of some simple interactions. Perform the corresponding action on each cube to turn it green.

![](screenshot/screenshot.png)

This scene shows you:

- How to stream video into a scene
- How to reuse the same video texture in multiple screens
- How to play/pause a video stream

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

1. Download this full repository from [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```
npm run start
```

**Scene Usage**

Click on the screen to pause/play it.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.

# Setting up the Server for Streaming

### _NOTE: These are just brief notes from my meeting with HPrivakos (will tidy up later...)_

## Choosing a hosting option
There are a number of options for streaming video. The simplest option is to use a managed hosting provider like [Vimeo](https://vimeo.com/) or [Livepeer Studio](https://livepeer.studio/) where you pay a fee to the provider to manage all the streaming infrastructure. The other recommended alternative is to set up your own server, using free software but paying for hosting on a platform like Digital Ocean. All these options have pros and cons for different scenarios. You should evaluate what's best for you taking into account your needs, technical skills and budget.

### Managed hosted

**Vimeo Pro (or higher)**:

Pros:

- Should be able to support unlimited concurrent users
- Is extremely easy to set up
- Costs $20 USD a month
- Offers analytics dashboard

Cons:

- Only allows you to stream pre-loaded videos, **no live streaming**.
- In this modality, players see the video start when each arrives to the scene. What they see may be out of sync with each other.

**Vimeo Premium**

Pros:

- Should be able to support unlimited concurrent users
- Is extremely easy to set up
- Allows for **live streaming**
- Offers analytics dashboard

Cons:

- Costs $75 usd a month

**Livepeer Studio**:

Pros:

- Easy to set up
- Free 1000 minutes/month video processing (transcoding and uploading videos)
- Allows for **live streaming**

Cons:
- No analytics dashboard
- Streaming of **pre-loaded videos (VODs)** currently requires using Studio API
- After 1000 free monthly minutes, costs are calculated as:
    - $0.005 USD/min for transcoding
    - $0.015 USD/GB for delivery


### Self-hosted

**Set up own server on Digital Ocean**

Pros:

- You can do streaming or **any modality** you want
- Can cost as little as $5 USD a month (this option supports up to roughly 50 viewers)
- Relatively nice UI, if you have a strong technical background

Cons:

- Requires high technical skills to set up everything manually
- The cheap option is not recommended for +50 viewers, more expensive options may be on par with Vimeo Premium.

> Note: For many Decentraland Foundation events, we use Amazon Web Services hosting. This option is more robust, but also more expensive and less friendly to set up.

## Set up Vimeo Pro


This is the simplest option, but doesn't allow for live streaming.

1. Create a Vimeo account if you don't have one. Then upgrade to any of the [paid tiers](https://vimeo.com/upgrade) offered there.

2. Upload a video to one of your folders.

3. Open the video's settings, and select **Advanced**.

4. Pick **Distribution**, and scroll to the bottom to Video file links. Copy the last one of these links, the one labeled **HTTP live streaming**.

> Note: The other available links on specific resoltuions often don't work when streamed into Decentraland. Always use the **HTTP Live streaming**. This option adjusts the quality of the video dynamically depending on the player's connection, leading to an optimal result. Note that this link is different from performing a streaming of a live event: players will each see the video from start to finish, without necessarily being in sync with what each other is seeing. 

5. Paste the link into your scene, replacing the placeholder on the `VideoClip` object.

> Tip: If you intend your video to loop, make sure you set the `loop` property on the `VideoTexture` in your scene. Otherwise the video will play just once for each player.

<!--
## Set up Vimeo Premium

This is the most powerful option, but is significantly more expensive than the others.

1. Create a Vimeo account if you don't have one. Then upgrade to the [**Premium**](https://vimeo.com/upgrade) tier.


...Additional steps to be confirmed
-->

## Set up Livepeer Studio

The first step is to create a [Livepeer Studio account](https://livepeer.studio/register).

**Live streaming**
1. While signed in, go to the [Streams](https://livepeer.studio/dashboard/streams) section
2. Click the `+ Create stream` button
3. Give your stream a name in the prompt. Click `Create stream` button when finished.
4. For broadcasting (via broadcasting software like OBS), use the the `RTMP ingest URL` and `Stream key` found on the newly created stream page. 
5. For playback in a video player, use the `Playback URL` url.

**Pre-loaded video (VOD) streaming**

*Functionality to upload asset directly in Studio dashboard coming in Q3 2022*

## Custom Server on Digital Ocean (Advanced)

This is the cheapest option, but is significantly harder to set up than the others.

See [ADVANCED-SETUP.md](https://github.com/decentraland-scenes/video-streaming/blob/master/AVDANCED-SETUP.md) for detailed instructions for how to deploy a server, configure it, and install all the necessary command-line tools.
