import { $axios } from '../../api'

export const UPLOAD = '/upload'

class FileService {
	/**
	 * This function returns a request to axios to load the user's avatar.
	 * @param {{name: string | undefined, password: string | undefined, newPassword: string | undefined, image: FileList}} data
	 * @returns {Promise<CommentResponse>}
	 */
	async uploadUserProfileImage(data) {
		let formData = new FormData()
		formData.append('file', data.image[0])
		return $axios.post(`${UPLOAD}/profileImage`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}

export default new FileService()
