import { useQuery } from '@tanstack/react-query'

import getBook from '../../services/book/getBook'

/**
 * This hook allows you to retrieve the last created book.
 * @hook
 *
 * @returns {{id: number, name: string, description: string, images: string, category: array<{id: number, category: string}>, genre: {id: number, genre: string}, publishDate: number, pages: number, author: {id: number, name: string, books: array<{id: number, name: string, images: string, author: {id: number, name: string}}>}, chapters: array<{id: number, name: string, text: string}>, sumRate: number, rate: array<{rating: number, userId: number}>}} Book Data.
 */
export const useGetLastCreatedBook = () => {
	return useQuery(
		['get last created book'],
		() => getBook.getLastCreatedBook(),
		{
			select: ({ data }) => data
		}
	)
}
