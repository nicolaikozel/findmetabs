const routes = require("express").Router()

const spotify = require("./spotify")

routes.get("/", (req, res) => {
	res.status(200).json({ message: "Connected to API!" })
})
routes.use("/spotify", spotify)

module.exports = routes
