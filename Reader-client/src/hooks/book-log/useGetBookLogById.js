import { useQuery } from '@tanstack/react-query'

import getBookLog from '../../services/book-log/getBookLog'

/**
 * This hook allows you to grab the log of a specific book and user.
 * @hook
 *
 * @param {number} bookLogId - This is the log id of the specific book and user.
 * @returns {{id: number, createdAt: string, updatedAt: string, isCompleted: boolean, userId: number, bookId: number, chapters: array<{id: number, createdAt: string, updatedAt: string, isCompleted: boolean, bookLogId: number, userId: number, chapterId: number}>}} Book Log Data.
 */
export const useGetBookLogById = bookLogId => {
	return useQuery(
		['get book log by id', bookLogId],
		() => getBookLog.getBookLogById(bookLogId),
		{
			select: ({ data }) => data,
			enabled: !!bookLogId
		}
	)
}
