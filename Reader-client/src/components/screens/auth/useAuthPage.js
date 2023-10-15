import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import { setToken } from '../../../utils/setToken.util'

import { $axios } from '../../../api'

export const useAuthPage = () => {
	/**
	 * @description This state determines the type of authorization.
	 */
	const [authFormState, setAuth] = useState(
		/** @type {"login" | "register"} */ ('login')
	)
	const [isAlertShow, setAlertShow] = useState(false)

	const { isAuth, setIsAuth, setIsAdmin } = useContextStates()

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setFocus
	} = useForm({
		mode: 'onChange'
	})

	const { mutateAsync, isLoading, error } = useMutation(
		['auth'],
		/**
		 * This asynchronous mutation sends a request to the server using axios. If name = undefined, this is a request to log the user, otherwise to register.
		 * @param {object} userData
		 * @param {string | undefined} userData.name
		 * @param {string} userData.email
		 * @param {string} userData.password
		 */
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

				navigate('/profile')
			}
		}
	)

	const onSubmit = data => {
		mutateAsync(data)
	}

	useEffect(() => {
		if (isAuth) navigate('/profile')
	})

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
			authFormState,
			errors,
			register,
			setAuth,
			error,
			isAlertShow,
			setFocus
		}),

		[isLoading, errors, authFormState, isAlertShow]
	)
}
