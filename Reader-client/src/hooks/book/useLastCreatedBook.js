import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows you to retrieve the last created book.
 * @hook
 * @returns {object} Book Data.
 */
export const useLastCreatedBook = () => {
	return useQuery(
		['get last created book'],
		() => getBook.getLastCreatedBook(),
		{
			select: ({ data }) => data
		}
	)
}
