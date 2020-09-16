import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import sessionStorageHelpers from "../../../helpers/sessionStorageHelpers"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	spotifyAccessStatus: sessionStorageHelpers.getSpotifyAccessStatus(),
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		setSpotifyAccessStatus: (state, action) => state.set("spotifyAccessStatus", action.payload),
	},
})