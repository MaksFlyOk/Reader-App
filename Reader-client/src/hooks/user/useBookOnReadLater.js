import { useQuery } from '@tanstack/react-query'

import bookUserService from '../../services/user/book-user.service'

/**
 * This hook allows you to determine if a book is in the read later list of an authorized user.
 * @hook
 * @param {number} bookId - This is the id of the book.
 * @returns {object} BookOnList Data.
 */
export const useBookOnReadLater = bookId => {
	return useQuery(
		['check the book on list Read Later'],
		() => bookUserService.checkBookOnReadLater(bookId),
		{
			select: ({ data }) => data
		}
	)
}
