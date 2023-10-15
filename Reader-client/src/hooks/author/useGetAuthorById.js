import { useQuery } from '@tanstack/react-query'

import getAuthor from '../../services/author/getAuthor'

/**
 * This hook allows you to retrieve author data from the server by its id.
 * @hook
 *
 * @param {number} authorId
 * @returns {{id: number, name: string, images: string, rate: number, books: array<{id: number, name: string, images: string, sumRate: number, rate: array<{userId: number, rating: number}>}>}} Author Data.
 */
export const useGetAuthorById = authorId => {
	return useQuery(
		['get author by id'],
		() => getAuthor.getAuthorById(authorId),
		{
			select: ({ data }) => data
		}
	)
}
