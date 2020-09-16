const playbackRouter = require("express").Router()

const play = require("./play")
const pause = require("./pause")
const state = require("./state")

playbackRouter.put("/play", play)
playbackRouter.put("/pause", pause)
playbackRouter.get("/", state)

module.exports = playbackRouter
