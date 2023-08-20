import { $axios } from '../api'

const AUTH = '/auth'

class AuthService {
	async deleteUser() {
		return $axios.delete(`${AUTH}/delete`)
	}
}

export default new AuthService()
