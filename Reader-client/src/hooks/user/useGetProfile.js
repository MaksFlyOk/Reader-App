import { useQuery } from '@tanstack/react-query'

import getUserService from '../../services/user/get-user.service'

/**
 * This hook allows you to retrieve user data from the server.
 * @hook
 *
 * @returns {{id: number, name: string, email: string, profileImage: string, isAdmin: boolean, createdAt: string}} User Data.
 */
export const useGetProfile = () => {
	return useQuery(['get profile'], () => getUserService.getProfile(), {
		select: ({ data }) => data
	})
}
