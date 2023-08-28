import { useQuery } from '@tanstack/react-query'

import getBookLog from '../../services/book-log/getBookLog'

/**
 * This hook allows you to grab the log of a specific book and user.
 * @hook
 * @param {number} bookLogId - This is the log id of the specific book and user.
 * @returns {object} Book Log Data.
 */
export const useBookLogById = bookLogId => {
	return useQuery(
		['get book log by id', bookLogId],
		() => getBookLog.getBookLogById(bookLogId),
		{
			select: ({ data }) => data
		}
	)
}
