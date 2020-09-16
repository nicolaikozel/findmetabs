import { SpotifyAccessStatus } from "../../../constants/spotify"

import slice from "./slice"

export const spotifyAccessStatusSelector = state => state[slice.name].get("spotifyAccessStatus")

export const isSpotifyAccessAuthorizedSelector = state => state[slice.name].get("spotifyAccessStatus") === SpotifyAccessStatus.ALLOWED