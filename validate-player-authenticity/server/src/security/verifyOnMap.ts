import { MARGIN_OF_ERROR, PeerResponse } from '../utils'

// validate that the player is active in a catalyst server, and in the indicated coordinates, or within a margin of error
export async function checkPlayer(playerId: string, server: string, parcel: number[]) {
  const url = server + '/comms/peers/'
  // const url = `https://peer.decentraland.org/comms/peers`

  try {
    const response = await fetch(url)
    const data: PeerResponse = await response.json()
    if (data.ok) {
      const player = data.peers.find((peer) => peer.address && peer.address.toLowerCase() === playerId.toLowerCase())

      if (!player.parcel) {
        return false
      }

      return player && checkCoords(player.parcel, parcel)
    }
  } catch (error) {
    console.log(error)
    return false
  }

  return false
}

// check coordinates against a single parcel - within a margin of error
export function checkCoords(coords: number[], parcel: number[]) {
  const validMargin = (p: number, c: number) => Math.abs(p - c) <= MARGIN_OF_ERROR
  return validMargin(coords[0], parcel[0]) && validMargin(coords[1], parcel[1])
}
