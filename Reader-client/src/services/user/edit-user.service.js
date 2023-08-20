import { $axios } from '../../api'

const USER = '/user'

class EditUserService {
	async editUser(type, body) {
		return $axios.patch(`${USER}/edit/${type}`, body)
	}
}

export default new EditUserService()
