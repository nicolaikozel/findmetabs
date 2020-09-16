function serializeDevice(device) {
	return {
		id: device.id,
		volume: device.volume_percent,
	}
}

module.exports = {
	serializeDevice,
}