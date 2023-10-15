import { useQuery } from '@tanstack/react-query'

import getAuthor from '/src/services/author/getAuthor'

/**
 * Query to retrieve authors by rating(first seven), for TopAuthor component..
 * @hook
 *
 * @returns {array<{id: number, name: string, images: string, rate: number, books: array<{id: number, name: string}>}>} Authors Data.
 */
export const useGetAuthorByRate_TopAuthors = () => {
	return useQuery(
		['get author by rate (Authors)'],
		() => getAuthor.getAuthorByRate_TopAuthors(),
		{
			select: ({ data }) => data
		}
	)
}
