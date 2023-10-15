import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { useAlert } from '../../../hooks/useAlert'

import { $axios } from '../../../api'

export const useReadLaterButton = () => {
	const [isAlertShow, setAlertShow] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isLoading, error } = useMutation(
		['add/delete the book to Read Later '],
		/**
		 * This asynchronous mutation sends a request to the server using axios. This request adds or removes a book from the read later list.
		 * @param {object} data
		 * @param {"add" | "delete"} data.type
		 * @param {number} data.bookId
		 */
		async ({ type, bookId }) => {
			await $axios.patch(`/user/book/${type}/${bookId}`)
		},
		{
			onSuccess: bookId => {
				queryClient.invalidateQueries([
					'check the book on list Read Later',
					bookId
				])
			},
			onError: error => {
				return error
			}
		}
	)

	useAlert(error, setAlertShow)

	return useMemo(
		() => ({
			isLoadingMutate: isLoading,
			error,
			isAlertShow,
			mutate
		}),
		[isLoading, isAlertShow]
	)
}
