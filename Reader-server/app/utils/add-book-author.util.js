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
