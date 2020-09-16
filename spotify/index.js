const spotify = require("express").Router()

const authorization = require("./authorization")
const tracks = require("./tracks")
const playback = require("./playback")
const playlists = require("./playlists")

spotify.use("/authorization", authorization)
spotify.use("/tracks", tracks)
spotify.use("/playback", playback)
spotify.use("/playlists", playlists)

module.exports = spotify
