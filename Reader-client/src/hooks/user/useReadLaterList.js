import { useQuery } from '@tanstack/react-query'

import getUserService from '../../services/user/get-user.service'

/**
 * This hook allows you to get a "Read Later" list for an authorized user.
 * @hook
 * @returns {object} User List "Read Later" Data.
 */
export const useReadLaterList = () => {
	return useQuery(
		['get read later list'],
		() => getUserService.getReadLaterList(),
		{
			select: ({ data }) => data
		}
	)
}
