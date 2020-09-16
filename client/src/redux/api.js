import axios from "axios"

const instance = axios.create()

let isRefreshingToken = false
let queuedRequests = []

export const getRefreshToken = () => {
	return axios.post("/api/spotify/authorization/refresh_token/").then(response => {
		return response.data.access_token
	})
}

instance.interceptors.response.use(undefined, error => {
	const {
		config,
		response: { status },
	} = error
	const originalRequest = config

	if (status === 401) {
		if (!isRefreshingToken) {
			isRefreshingToken = true
			getRefreshToken()
				.then(accessToken => {
					isRefreshingToken = false
					queuedRequests.forEach(callback => callback())
					queuedRequests = []
				})
		}

		return new Promise(resolve => {
			queuedRequests.push(() => {
				resolve(axios(originalRequest))
			})
		})
	}
	return Promise.reject(error)
})

export default instance
