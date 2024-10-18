# Leader Board

This is a simple scene that implements a leader board. It includes a basic game of clicking a dog statues as many times as possible in 10 seconds. The score is then sent to a server. It also implements a few security checks to ensure that the requests that arrive to the server are legitimate.

![](screenshot.png)

This scene shows you:

- How to send HTTP requests to an API to store data in a permanent place, so others can then retrieve changes
- How to parse a JSON response from an API call
- How to arrange text fields into an in-world table
- How to parse a string so that it fits a maximum line length and maximum number of lines
- How to fetch the player's UserId

Bare in mind that this implementation doesn't implement any measures to counter cheating. Since new scores are added to the server via RESTful HTTP calls, these could be easily replicated with fake values.


## Try it out

**Previewing the scene**

1. Download this full repository from [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on `scene` directory. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside `scene` directory run:

```
npm run start
```

**Scene Usage**

Play the game by clicking franticly on the dog before the time runs out. If your score makes it into the high-scores it will be uploaded to the server and stored there. It will be retrieved next time you load the scene.

Since you're running the scene locally on localhost, the validations that relate to the request's origin and on querying the catalyst servers are turned off. Turn them on with the `TESTS_ENABLED` flag, on `securityChecks.ts` in the server folder. Notice that once that's enabled your requests from localhost will no longer pass the validations.

By copying the `security` folder in `server`, you can use the same set of security validations on any request that was originated with `signedFetch()` in a Decentraland scene.

Simply run:

```ts
await runChecks(req)
```

Or add a set of coordinates to also validate the request's origin on the map:

```ts
await runChecks(req, VALID_PARCEL)
```

## More About Validating Player Authenticity

On the scene:

- Send requests with `signedFetch`, to include headers with an ephemeral key signature in the request.

On the server:

- Check that the origin of the request, to ensure it's from a Decentraland domain
- Filter out malicious IPs that were manually identified
- Check that the headers included in the `signedFetch` are properly signed, ensuring also that the timestamp in the signature is also recent and that the ephemeral key corresponds to the player's address.
- Query the catalyst server that the player claims to be in, and ensure that the player is truly there.
- Check that the player's location when sending the request is at a specific parcel, or within a margin or error of that.

These checks together ensure that a request needs to come from inside decentraland, from a player in a deployed scene within the specified coordinates.

Through all of these checks, you can make it very hard for anyone who might want to take advantage of your scene. These security measures are especially valuable in scenes that give away tokens, or where there's some kind of monetary incentive for cheating.

### About the ephemeral key

When players log into decentraland, they sign a message using Metamask or their preferred web3 client. This signature is used to generate an ephemeral wallet that exists during that session, this address can be traced back to the player's original address. The advantage is that it can be used by the Decentraland explorer to sign messages behind the curtains, without requesting that the player manually signs every request.

When you use the `signedFetch()` function in a scene, you're sending additional metadata in the request's headers, that includes a signed message encrypted with the ephemeral key. This signed message includes a timestamp, the player's position on the map, the player's actual address, and the contents of the request itself.

### Configurable properties

The following properties can be configured on `securityChecks.ts`:

- `TESTS_ENABLED`: If true, requests from localhost are allowed. If false, the server also enforces that the requests come from a decentraland domain, and validates with a catalyst server that the player is currently there.

- `MARGIN_OF_ERROR`: Make the location checks more or less permissive. A margin or error of 2 will allow locations at + - 2 parcels of distance on either axis from the indicated location.

- `denyListedIPS`: Add any IPs to this list that you want to block from making any requests.

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
