import { $axios } from '../../api'

const AUTHOR = '/author'

class GetAuthor {
	/**
	 * This function returns axios request to retrieve the Author by id.
	 * @param {number} authorId
	 * @returns {Promise<CommentResponse>}
	 */
	async getAuthorById(authorId) {
		return $axios.get(`${AUTHOR}/${authorId}`)
	}

	/**
	 * This function returns axios request to retrieve the Top Authors.
	 * @returns {Promise<CommentResponse>}
	 */
	async getAuthorByRate_TopAuthors() {
		return $axios.get(`${AUTHOR}/all/rating/top-authors`)
	}

	/**
	 * This function returns axios request to retrieve the Authors page.
	 * @param {number} currentPage
	 * @returns {Promise<CommentResponse>}
	 */
	async getAuthorByRatePagination(currentPage) {
		return $axios.get(`${AUTHOR}/all/rating/authors/page/${currentPage}`)
	}
}

export default new GetAuthor()
