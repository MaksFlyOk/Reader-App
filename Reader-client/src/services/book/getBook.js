import { $axios } from '../../api'

const BOOK = '/book'

class GetBook {
	async getBookByIdNotAuth(bookId) {
		return $axios.get(`${BOOK}/${bookId}`)
	}
	async getLastCreatedBook() {
		return $axios.get(`${BOOK}/last`)
	}
	async getBookByRate() {
		return $axios.get(`${BOOK}/all/rating`)
	}
	async getBookByCategory(categories) {
		return $axios.post(`${BOOK}/category`, categories)
	}
}

export default new GetBook()
