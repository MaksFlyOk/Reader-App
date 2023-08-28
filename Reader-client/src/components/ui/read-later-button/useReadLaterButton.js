import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { $axios } from '../../../api'

export const useReadLaterButton = () => {
	const { mutate, isLoading, error } = useMutation(
		['add/delete the book to Read Later '],
		async ({ type, bookId }) => {
			await $axios.patch(`/user/book/${type}/${bookId}`)
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
