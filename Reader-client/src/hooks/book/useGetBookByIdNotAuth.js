import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows to get data about a book from the server by its id, if the user is not authorized.
 * @hook
 *
 * @param {number} bookId - This is the id of the book.
 * @returns {{id: number, name: string, description: string, images: string, category: array<{id: number, category: string}>, genre: {id: number, genre: string}, publishDate: number, pages: number, author: {id: number, name: string, books: array<{id: number, name: string, images: string, author: {id: number, name: string}}>}, chapters: array<{id: number, name: string, text: string}>, sumRate: number, rate: array<{rating: number, userId: number}>}} Book Data.
 */
export const useGetBookByIdNotAuth = bookId => {
	return useQuery(
		['get book by id (not auth)'],
		() => getBook.getBookByIdNotAuth(bookId),
		{
			select: ({ data }) => data
		}
	)
}
