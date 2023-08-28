import { $axios } from '../../api'

const USER_BOOK = '/user/book'

class BookUserService {
	async bookToReadLater(type, bookId) {
		return $axios.patch(`${USER_BOOK}/${type}/${bookId}`)
	}
	async checkBookOnReadLater(bookId) {
		return $axios.get(`${USER_BOOK}/check/${bookId}`)
	}

	async checkRateBook(bookId) {
		return $axios.get(`${USER_BOOK}/check/rate/${bookId}`)
	}
}

export default new BookUserService()
