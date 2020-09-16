import slice from "./slice"

export const errorSelector = state => state[slice.name].get("error")