import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows you to retrieve from the server the data of books that correspond to categories.
 * @hook
 * @param {string[]} categories - It's an array of categories.
 * @param {boolean} boolean - This is a boolean variable needed to determine if a query is needed.
 * @returns {object} Books by Categories Data.
 */
export const useBooksByCategory = (categories, boolean) => {
	return useQuery(
		['get books by categories'],
		() => getBook.getBookByCategory({ categories }),
		{
			select: ({ data }) => data,
			enabled: boolean
		}
	)
}
