import { $axios } from '../api'

const AUTH = '/auth'

class AuthService {
	/**
	 * This function returns an axios request to delete an authorized user's account.
	 * @returns {Promise<CommentResponse>}
	 */
	async deleteUser() {
		return $axios.delete(`${AUTH}/delete`)
	}
}

export default new AuthService()
