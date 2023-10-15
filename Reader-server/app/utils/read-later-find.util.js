/**
 * This function checks if a book has been added to the read later list.
 * @param {array<number>} readLater - Array of id of books in the list read later.
 * @param {number} bookId - Id of the book to be added to the list.
 * @returns {boolean}
 */
export const readLaterFind = (readLater, bookId) => {
	return readLater.find(element => element === bookId)
}
