import { useQuery } from '@tanstack/react-query'

import getUserService from '../../services/user/get-user.service'

/**
 * This hook allows you to retrieve user data from the server.
 * @hook
 * @returns {object} User Data.
 */
export const useProfile = () => {
	return useQuery(['get profile'], () => getUserService.getProfile(), {
		select: ({ data }) => data
	})
}
