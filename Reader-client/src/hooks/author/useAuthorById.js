import { useQuery } from '@tanstack/react-query'

import getAuthor from '../../services/author/getAuthor'

/**
 * This hook allows you to retrieve author data from the server by its id.
 * @hook
 * @param {number} authorId - This is the id of the author.
 * @returns {object} Author Data.
 */
export const useAuthorById = authorId => {
	return useQuery(
		['get author by id'],
		() => getAuthor.getAuthorById(authorId),
		{
			select: ({ data }) => data
		}
	)
}
