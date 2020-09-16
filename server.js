const cors = require("cors")
const express = require("express")
const path = require("path")

const routes = require("./routes")
const middleware = require("./middleware")

// Initialize Server
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware
app.use(middleware.requestLogger)
// Setup API endpoints
app.use("/api", routes)

if (process.env.NODE_ENV == "production") {
	// Serve static files from React App
	app.use(express.static(path.join(__dirname, "/client/build")))
	// For any request that doesn't match one above,
	// send back React's index.html file.
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/client/build/index.html"))
	})
}

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Express server listening on port ${port}.`)
})
