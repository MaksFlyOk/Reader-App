/**
 * This function checks the availability of the book with the author.
 * @param {array<{name: string, id: number, images: string, rate: array<{userId: number, rating: number}>, sumRate: number }>} authorBooks
 * @param {number} bookId
 * @returns {boolean | array<number>} - If the book is already in the list, True is returned, otherwise a new array with book id is returned.
 */
export const addBookId = (authorBooks, bookId) => {
	const arrBooksIds = []

	authorBooks.books.forEach(item => {
		arrBooksIds.push(item.id)
	})

	if (arrBooksIds.includes(bookId)) {
		return true
	} else {
		return [...arrBooksIds, bookId]
	}
}
