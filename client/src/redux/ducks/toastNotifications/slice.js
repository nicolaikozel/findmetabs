import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	currentNotification: null,
	isShowingNotification: false,
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		showNotification: {
			prepare: (icon, message) => {
				return {
					payload: {
						icon,
						message,
					}
				}
			},
			reducer: (state, action) => state.set("currentNotification", Immutable.fromJS(action.payload)),
		},
		setIsShowingNotification: (state, action) => state.set("isShowingNotification", action.payload),
	},
})