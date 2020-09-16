import slice from "./slice"

export const isLoadingSongSuggestionsSelector = state => state[slice.name].get("isLoadingSuggestions", false)

export const otherSongSuggestionsSelector = state => state[slice.name].get("otherSuggestions")

export const primarySongSuggestionSelector = state => state[slice.name].get("primarySuggestion")