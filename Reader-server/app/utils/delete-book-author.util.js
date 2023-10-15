/**
 * This function checks the availability of the book with the author.
 * @param {array<{name: string, id: number, images: string, rate: array<{userId: number, rating: number}>, sumRate: number }>} authorBooks
 * @param {number} bookId
 * @returns {boolean}
 */
export const deleteBookId = (authorBooks, bookId) => {
	const arrBooksIds = []

	authorBooks.books.forEach(item => {
		arrBooksIds.push(item.id)
	})

	if (arrBooksIds.includes(bookId)) {
		const index = arrBooksIds.indexOf(bookId)
		if (index > -1) {
			arrBooksIds.splice(index, 1)
		}
		return arrBooksIds
	} else {
		return true
	}
}
