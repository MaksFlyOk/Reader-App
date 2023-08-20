import { useQuery } from '@tanstack/react-query'
import getUserService from '../services/user/get-user.service'

export const useProfile = () => {
	return useQuery(['get profile'], () => getUserService.getProfile(), {
		select: ({ data }) => data
	})
}
