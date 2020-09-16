const tracksRouter = require("express").Router()

const random = require("./random")

tracksRouter.get("/random", random)

module.exports = tracksRouter
