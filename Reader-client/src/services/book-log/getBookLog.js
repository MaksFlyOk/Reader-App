import { $axios } from '../../api'

const BOOK_LOG = '/book/log'

class GetBook {
	/**
	 * This function returns a request to axios to retrieve the book log by log id.
	 * @param {number} bookLogId
	 * @returns {Promise<CommentResponse>}
	 */
	async getBookLogById(bookLogId) {
		return $axios.get(`${BOOK_LOG}/${bookLogId}`)
	}
}

export default new GetBook()
