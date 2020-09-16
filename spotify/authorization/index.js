const authorizationRouter = require("express").Router()

const login = require("./login")
const callback = require("./callback")
const refresh_token = require("./refresh_token")

authorizationRouter.get("/login", login)
authorizationRouter.get("/callback", callback)
authorizationRouter.post("/refresh_token", refresh_token)

module.exports = authorizationRouter
