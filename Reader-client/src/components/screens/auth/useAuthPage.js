import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import { setToken } from '../../../utils/setToken.util'

import { $axios } from '../../../api'

export const useAuthPage = () => {
	const [isAuthForm, setAuth] = useState('login')
	const { isAuth, setIsAuth, setIsAdmin } = useContextStates()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading, error } = useMutation(
		['auth'],
		async ({ name, email, password }) => {
			if (name === undefined) {
				const { data } = await $axios.post(`/auth/login`, {
					email,
					password
				})

				if (data?.isAdmin) {
					setIsAdmin(true)
				}

				setToken(data)
			} else {
				const { data } = await $axios.post(`/auth/register`, {
					name,
					email,
					password
				})

				setToken(data)
			}
		},
		{
			onError: () => {
				reset()
			},
			onSuccess: () => {
				setIsAuth(true)

				reset()

				navigate('/profile')
				window.location.reload()
			}
		}
	)

	useEffect(() => {
		if (isAuth) {
			navigate('/profile')
		}
	})

	const onSubmit = data => {
		mutate(data)
	}

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
			isLoading,
			handleSubmit,
			onSubmit,
			isAuthForm,
			errors,
			register,
			setAuth,
			error,
			isAlertShow
		}),
		[isLoading, errors, isAuthForm, isAlertShow]
	)
}
