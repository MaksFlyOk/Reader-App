import { useQuery } from '@tanstack/react-query'
import getBook from '../services/book/getBook'

export const useBook = bookId => {
	return useQuery(['get book by id'], () => getBook.getBookById(bookId), {
		select: ({ data }) => data
	})
}
