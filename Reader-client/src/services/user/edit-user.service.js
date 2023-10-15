import { $axios } from '../../api'

const USER = '/user'

class EditUserService {
	/**
	 * This function returns a request to axios to change the name or password of an authorized user.
	 * @param {"name" | "password"} type
	 * @param {{name: string | undefined, password: string | undefined, newPassword: string | undefined, image: FileList}} data
	 * @returns {Promise<CommentResponse>}
	 */
	async editUser(type, data) {
		return $axios.patch(`${USER}/edit/${type}`, data)
	}
}

export default new EditUserService()
