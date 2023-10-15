import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows you to retrieve from the server the data of books that correspond to categories.
 * @hook
 *
 * @param {number[]} categories - It's an array of categories.
 * @param {boolean} boolean - This is a boolean variable needed to determine if a query is needed.
 * @returns {array<{id: number, name: string, description: string, images: string, category: array<{id: number, category: string}>, genre: {id: number, genre: string}, publishDate: number, pages: number, author: {id: number, name: string, books: array<{id: number, name: string, images: string, author: {id: number, name: string}}>}, chapters: array<{id: number, name: string, text: string}>, sumRate: number, rate: array<{rating: number, userId: number}>}>} Books by Categories Data.
 */
export const useGetBooksByCategory = (categories, boolean) => {
	if (boolean && categories !== undefined) {
		categories = categories.map(category => category?.id)
	}

	return useQuery(
		['get books by categories'],
		() => getBook.getBookByCategory({ categories }),
		{
			select: ({ data }) => data,
			enabled: boolean !== undefined && boolean && categories !== undefined
		}
	)
}
