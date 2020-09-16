const playlistsRouter = require("express").Router()

const playlists = require("./playlists")
const get_playlist_details = require("./get_playlist_details")
const get_tracks_in_playlist = require("./get_tracks_in_playlist")
const add_track_to_playlist = require("./add_track_to_playlist")

playlistsRouter.get("/", playlists)
playlistsRouter.get("/:playlistId", get_playlist_details)
playlistsRouter.get("/:playlistId/tracks", get_tracks_in_playlist)
playlistsRouter.post("/:playlistId/tracks", add_track_to_playlist)

module.exports = playlistsRouter
