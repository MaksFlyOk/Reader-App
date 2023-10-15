import { useQuery } from '@tanstack/react-query'

import bookUserService from '../../services/user/book-user.service'

/**
 * This hook allows you to determine if a book is in the read later list of an authorized user.
 * @hook
 *
 * @param {number} bookId - This is the id of the book.
 * @returns {{bookOnList: boolean}} BookOnList Data.
 */
export const useCheckBookOnReadLater = bookId => {
	return useQuery(
		['check the book on list Read Later', bookId],
		() => bookUserService.checkBookOnReadLater(bookId),
		{
			select: ({ data }) => data,
			enabled: Boolean(bookId)
		}
	)
}
