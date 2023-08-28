import { $axios } from '../../api'

const USER = '/user'

class GetUserService {
	async getProfile() {
		return $axios.get(`${USER}/profile`)
	}

	async getReadLaterList() {
		return $axios.get(`${USER}/profile/read-later`)
	}
}

export default new GetUserService()
