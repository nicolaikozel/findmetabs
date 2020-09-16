// This must be kept in sync with root config.js because of ModuleScopePlugin

const production = {
	API_URL: "http://www.findmetabs.com",
	CLIENT_URL: "http://www.findmetabs.com",
}

const development = {
	API_URL: "http://localhost:5000",
	CLIENT_URL: "http://localhost:3000",
}

module.exports =
	process.env.NODE_ENV === "production" ? production : development
