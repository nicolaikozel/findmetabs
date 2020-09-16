import windowHelpers from "./windowHelpers"

const openTab = track => {
	const searchValue = `${
		track.get("title").split("-")[0]
	} ${track.get("artist")}`
	const url = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(
		searchValue.replace(/[^a-zA-Z ]/g, ""),
	)}`
	windowHelpers.openNewTab(url)
}

export default { openTab }