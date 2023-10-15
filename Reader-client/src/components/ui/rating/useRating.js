import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { useAlert } from '../../../hooks/useAlert'

import { $axios } from '../../../api'

export const useRating = () => {
	const queryClient = useQueryClient()

	const { mutate, isLoading, error } = useMutation(
		['rate the book '],
		/**
		 * This mutation sends a request to the server using axios. This request grades the book.
		 * @param {object} data
		 * @param {number} data.bookId
		 * @param {number} data.userRating
		 */
		async ({ bookId, userRating }) => {
			await $axios.patch(`/user/book/rate/${bookId}`, {
				rating: Number(userRating) + 1
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([
					'check if the user has a rating for this book'
				])
			},
			onError: error => {
				return error
			}
		}
	)

	const [isAlertShow, setAlertShow] = useState(false)

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
