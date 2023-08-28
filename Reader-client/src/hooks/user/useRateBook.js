import { useQuery } from '@tanstack/react-query'

import bookUserService from '../../services/user/book-user.service'

/**
 * This hook allows you to determine the rating of a particular book given by an authorized user.
 * @hook
 * @param {number} bookId - This is the id of the book.
 * @param {boolean} boolean - This is a boolean variable needed to determine if a query is needed.
 * @returns {object} Rate Data.
 */
export const useRateBook = bookId => {
	return useQuery(
		['check if the user has a rating for this book'],
		() => bookUserService.checkRateBook(bookId),
		{
			select: ({ data }) => data
		}
	)
}
