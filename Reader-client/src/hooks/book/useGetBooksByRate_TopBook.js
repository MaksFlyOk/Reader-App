import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * Query to retrieve books by rating(first five), for TopBook component.
 * @hook
 *
 * @returns {array<{id: number, name: string, description: string, images: string, category: array<{id: number, category: string}>, genre: {id: number, genre: string}, publishDate: number, pages: number, author: {id: number, name: string, books: array<{id: number, name: string, images: string, author: {id: number, name: string}}>}, chapters: array<{id: number, name: string, text: string}>, sumRate: number, rate: array<{rating: number, userId: number}>}>} Books by rating for the Top Book component.
 */
export const useGetBooksByRate_TopBooks = () => {
	return useQuery(
		['get books by rate (top book)'],
		() => getBook.getBookByRate_TopBooks(),
		{
			select: ({ data }) => data
		}
	)
}
