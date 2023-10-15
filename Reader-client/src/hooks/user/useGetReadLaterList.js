import { useQuery } from '@tanstack/react-query'

import getUserService from '../../services/user/get-user.service'

/**
 * This hook allows you to get a "Read Later" list for an authorized user.
 * @hook
 *
 * @returns {array<{id: number, name: string, genre: {id: number, createdAt: string, updatedAt: string, genre: string}, sumRate: number, images: string, author: {id: number, name: string}, rate: array<{id: number, rating: number, userId: number, bookId: number}>}>} User List "Read Later" Data.
 */
export const useGetReadLaterList = () => {
	return useQuery(
		['get read later list'],
		() => getUserService.getReadLaterList(),
		{
			select: ({ data }) => data
		}
	)
}
