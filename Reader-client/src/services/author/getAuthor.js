import { $axios } from '../../api'

const AUTHOR = '/author'

class GetAuthor {
	async getAuthorById(authorId) {
		return $axios.get(`${AUTHOR}/${authorId}`)
	}
}

export default new GetAuthor()
