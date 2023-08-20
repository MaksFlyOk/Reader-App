export const readLaterFind = (readLater, bookId) => {
	return readLater.find(element => element.id === bookId)
}
