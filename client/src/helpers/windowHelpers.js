function openNewTab(url) {
	let newTab = window.open(url)
	newTab.opener = null
}

export default {
	openNewTab,
}