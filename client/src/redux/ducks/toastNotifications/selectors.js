import slice from "./slice"

export const currentNotificationSelector = state => state[slice.name].get("currentNotification")

export const isShowingNotificationSelector = state => state[slice.name].get("isShowingNotification")
