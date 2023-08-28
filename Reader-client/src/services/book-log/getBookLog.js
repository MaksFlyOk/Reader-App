import { $axios } from '../../api'

const BOOK_LOG = '/book/log'

class GetBook {
	async getBookLogById(bookLogId) {
		return $axios.get(`${BOOK_LOG}/${bookLogId}`)
	}
}

export default new GetBook()
