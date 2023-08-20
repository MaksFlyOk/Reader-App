import { $axios } from '../../api'

export const UPLOAD = '/upload'

class FileService {
	async uploadUserProfileImage(body) {
		let formData = new FormData()
		formData.append('file', body.image[0])
		return $axios.post(`${UPLOAD}/profileImage`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}

export default new FileService()
