function requestLogger(req, res, next) {
	let currentDate = new Date()
	let formattedDate =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds()
	console.log(`[${formattedDate}] ${req.method}:${req.url} ${res.statusCode}`)
	next()
}

module.exports = {
	requestLogger,
}