import { $axios } from '../../api'

const USER_BOOK = '/user/book'

class BookUserService {
	/**
	 * This function returns a request to axios to add or remove a book from the read later list.
	 * @param {"add" | "delete"} type
	 * @param {number} bookId
	 * @returns {Promise<CommentResponse>}
	 */
	async bookToReadLater(type, bookId) {
		return $axios.patch(`${USER_BOOK}/${type}/${bookId}`)
	}

	/**
	 * This function returns a request to axios to check if the book is in the read later list.
	 * @param {number} bookId
	 * @returns {Promise<CommentResponse>}
	 */
	async checkBookOnReadLater(bookId) {
		return $axios.get(`${USER_BOOK}/check/${bookId}`)
	}

	/**
	 * This function returns a request to axios to check if a particular book is graded by an authorized user.
	 * @param {number} bookId
	 * @returns {Promise<CommentResponse>}
	 */
	async checkRateBook(bookId) {
		return $axios.get(`${USER_BOOK}/check/rate/${bookId}`)
	}
}

export default new BookUserService()
