import { $axios } from '../../api'

const USER = '/user'

class GetUserService {
	/**
	 * This function returns a request to axios to retrieve the profile of an authorized user.
	 * @returns {Promise<CommentResponse>}
	 */
	async getProfile() {
		return $axios.get(`${USER}/profile`)
	}

	/**
	 * This function returns a request to axios to retrieve the read list of an authorized user.
	 * @returns {Promise<CommentResponse>}
	 */
	async getReadLaterList() {
		return $axios.get(`${USER}/profile/read-later`)
	}
}

export default new GetUserService()
