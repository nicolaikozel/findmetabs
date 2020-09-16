import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	error: null,
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		resetError: state => state.set("error", null),
	},
	extraReducers: builder =>
		builder
			.addMatcher(
				action => action.type.endsWith("Failure"),
				(state, action) => {
					if (action.type.endsWith("playSongFailure")) {
						return state
					}
					return state.set("error", action.payload)
				}
			)
})