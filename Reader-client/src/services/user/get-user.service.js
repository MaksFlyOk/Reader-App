import { $axios } from '../../api'

const USER = '/user'

class GetUserService {
	async getProfile() {
		return $axios.get(`${USER}/profile`)
	}
}

export default new GetUserService()
