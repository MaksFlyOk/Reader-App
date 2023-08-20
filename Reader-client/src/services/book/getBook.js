import { $axios } from '../../api'

const BOOK = '/book'

class GetBook {
	async getBookById(bookId) {
		return $axios.get(`${BOOK}/${bookId}`)
	}
}

export default new GetBook()
