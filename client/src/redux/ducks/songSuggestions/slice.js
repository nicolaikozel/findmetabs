import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	error: null,
	isLoadingSuggestions: false,
	otherSuggestions: null,
	primarySuggestion: null,
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		getRandomSongSuggestions: state => state.merge({ isLoadingSuggestions: true }),
		getRandomSongSuggestionsSuccess: {
			prepare: suggestions => {
				let primarySuggestion, otherSuggestions = null
				if (suggestions.length > 0) {
					primarySuggestion = suggestions[0]
					otherSuggestions = suggestions.slice(1)
				}
				return {
					payload: {
						otherSuggestions,
						primarySuggestion,
					}
				}
			},
			reducer: (state, action) => state.merge({
				isLoadingSuggestions: false,
				otherSuggestions: Immutable.fromJS(
					action.payload.otherSuggestions,
				),
				primarySuggestion: Immutable.fromJS(
					action.payload.primarySuggestion,
				),
			}),
		},
		getRandomSongSuggestionsFailure: (state, action) => state.merge({
			error: action.payload,
			isLoadingSuggestions: false,
			otherSuggestions: null,
			primarySuggestion: null,
		}),
		setPrimarySongSuggestion: (state, action) => state.merge({
			otherSuggestions: state
				.get("otherSuggestions")
				.push(state.get("primarySuggestion"))
				.filter(
					suggestion =>
						suggestion.get("id") !==
                            action.payload.get("id"),
				),
			primarySuggestion: action.payload,
		}),
	},
})