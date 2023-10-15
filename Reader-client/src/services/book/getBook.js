import { $axios } from '../../api'

const BOOK = '/book'

class GetBook {
	/**
	 * This function returns axios request to retrieve the Book by id.
	 * @param {number} bookId
	 * @returns {Promise<CommentResponse>}
	 */
	async getBookByIdNotAuth(bookId) {
		return $axios.get(`${BOOK}/${bookId}`)
	}

	/**
	 * This function returns an axios request to retrieve the most recently added book.
	 * @returns {Promise<CommentResponse>}
	 */
	async getLastCreatedBook() {
		return $axios.get(`${BOOK}/last`)
	}

	/**
	 * This function returns axios request to retrieve the Books page.
	 * @param {number} currentPage
	 * @returns {Promise<CommentResponse>}
	 */
	async getBookByRate_Pagination(page) {
		return $axios.get(`${BOOK}/all/rating/page/${page}`)
	}

	/**
	 * This function returns an axios query to retrieve an array of Top Books.
	 * @returns {Promise<CommentResponse>}
	 */
	async getBookByRate_TopBooks() {
		return $axios.get(`${BOOK}/all/rating/top-books`)
	}

	/**
	 * This function returns an axios query to retrieve an array of Books filtered by category.
	 * @param {array<number>} categories - This is an array of category id's.
	 * @returns {Promise<CommentResponse>}
	 */
	async getBookByCategory(categories) {
		return $axios.post(`${BOOK}/category`, categories)
	}
}

export default new GetBook()
