## Weather API

A scene that checks a weather API for the weather in a location and displays that weather condition, showing rain, thunder or snowflakes
Use real weather data from different locations by changing the coordinates, or change the value of the "mode" variable to "static" or "loop" to see different weather conditions manifest.

![](screenshot/screenshot.png)

This scene shows you:

- How to call a REST API and parse a JSON response
- How to conditionally render different scenarios based on the API's responses
- How to simulate rain by moving multiple entities down and recycling them
- How to sumulate snow by slowly moving and rotating multiple entities down and recyling them


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

You need to create an account on the [Weather Unlocked API](http://www.weatherunlocked.com/products/weather-api/overview). Then, replace the values of the fields `appId` and `APIkey` with your own credentials.

You can also replace the values of `lat` and `lon` to access weather data from a different location.

Modify the value of `mode` and `staticWeather` to see different weather conditions independently of what the real weather is. For example, if you set it to "snow" you will see snow.

You can also modify `dropSpeed` and `flakeSpeed` to change the speed at which raindrops or snowflakes fall.


Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.


## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
