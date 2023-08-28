import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows to get data about a book from the server by its id, if the user is not authorized.
 * @hook
 * @param {number} bookId - This is the id of the book.
 * @returns {object} Book Data.
 */
export const useBookByIdNotAuth = bookId => {
	return useQuery(
		['get book by id (not auth)'],
		() => getBook.getBookByIdNotAuth(bookId),
		{
			select: ({ data }) => data
		}
	)
}
