import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

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

	useEffect(() => {
		if (error) {
			setAlertShow(true)
			let time = setTimeout(() => {
				setAlertShow(false)
				clearTimeout(time)
			}, 4000)
		}
	}, [error])

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
