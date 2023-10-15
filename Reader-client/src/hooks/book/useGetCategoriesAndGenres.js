import { useQuery } from '@tanstack/react-query'

import { $axios } from '../../api'

/**
 * This hook allows you to retrieve data about all categories and genres from the server.
 * @hook
 *
 * @param {function} setQueryError - This function is needed to set the error to the "queryError" state.
 * @returns {{categories: array<{id: number, category: string}>, genres: array<{id: number, genre: string}>, publishDatesRange: [minDate: number, maxDate: number]}} Categories & Genres Data.
 */
export const useGetCategoriesAndGenres = setQueryError => {
	return useQuery(
		['get categories and genres'],
		() => $axios.get(`/book/all/categories-and-genres`),
		{
			select: ({ data }) => data,
			onError: error => setQueryError(error?.response?.data?.message)
		}
	)
}
