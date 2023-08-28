import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { $axios } from '../../../api'

export const useRating = () => {
	const { mutate, isLoading, error } = useMutation(
		['rate the book '],
		async ({ bookId, userRating }) => {
			await $axios.patch(`/user/book/rate/${bookId}`, {
				rating: Number(userRating) + 1
			})
		},
		{
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
