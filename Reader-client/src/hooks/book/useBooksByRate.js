import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows you to retrieve data, in decreasing order of rating, from the server.
 * @hook
 * @returns {object} Books by Rate Data.
 */
export const useBooksByRate = () => {
	return useQuery(['get books by rate'], () => getBook.getBookByRate(), {
		select: ({ data }) => data
	})
}
