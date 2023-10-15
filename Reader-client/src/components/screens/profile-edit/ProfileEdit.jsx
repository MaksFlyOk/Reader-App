import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'
import { useGetProfile } from '../../../hooks/user/useGetProfile'

import authService from '../../../services/auth.service'
import fileService from '../../../services/file/file.service'
import editUserService from '../../../services/user/edit-user.service'

import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'
import DragAndDrop from '../../ui/field/drag-and-drop/DragAndDrop'
import Logo from '../../ui/logo/Logo'

import styles from './ProfileEdit.module.scss'

import { TOKEN } from '../../../app.constants'

const ProfileEdit = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		getFieldState,
		setError
	} = useForm({
		mode: 'onChange'
	})

	const { data, isFetching } = useGetProfile()
	const { setIsAuth, setIsAdmin } = useContextStates()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	/**
	 * @description This state determines the display of the account deletion confirmation window.
	 */
	const [isConfirmShow, setConfirmShow] = useState(false)

	const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
		/**
		 * This asynchronous mutation sends a request to the server using axios to change the name, password, or avatar of an authorized user.
		 * @param {object} data
		 * @param {string | undefined} data.name
		 * @param {string | undefined} data.password
		 * @param {string | undefined} data.newPassword
		 * @param {file | undefined} data.image
		 */
		async data => {
			if (data.name) {
				await editUserService.editUser('name', data)
			}

			if (data.password && data.newPassword) {
				await editUserService.editUser('password', data)
			}

			if (data.image) {
				await fileService.uploadUserProfileImage(data)
			}

			reset()
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['get profile'])
			}
		}
	)

	const onSubmit = data => {
		mutateAsync(data)
	}

	const deleteAccountHandler = async () => {
		await authService.deleteUser()
		Cookies.remove(TOKEN)

		setIsAuth(false)
		setIsAdmin(false)
		navigate('/auth')
	}

	return (
		<>
			<div className={styles.wrapper}>
				<div>
					<Logo />
					<div className={styles.profileEdit}>
						{isFetching || isLoadingMutate ? (
							<div className={styles.profileImageLoader}></div>
						) : (
							<div>
								<img
									src={
										data?.profileImage
											? import.meta.env.VITE_SERVER_URL + data?.profileImage
											: '/public/profile/Profile.jpg'
									}
									alt='Profile image'
								/>
							</div>
						)}
						<div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Field
									loading={isFetching || isLoadingMutate ? true : false}
									error={errors?.name?.message}
									name='name'
									register={register}
									options={{
										minLength: {
											value: 4,
											message: 'Minimum number of character for username is 4'
										},
										maxLength: {
											value: 16,
											message: 'Maximum number of character for username is 16'
										}
									}}
									type='text'
									placeholder={`Name (${
										isFetching || isLoadingMutate ? '' : data?.name
									})`}
								/>
								<Field
									loading={isFetching || isLoadingMutate}
									error={errors?.password?.message}
									name='password'
									register={register}
									options={{
										minLength: {
											value: 6,
											message: 'Minimum number of character for password is 6'
										},
										maxLength: {
											value: 16,
											message: 'Maximum number of character for password is 16'
										}
									}}
									type='password'
									placeholder='Password'
								/>
								<Field
									loading={isFetching || isLoadingMutate}
									error={errors?.newPassword?.message}
									name='newPassword'
									register={register}
									options={{
										minLength: {
											value: 6,
											message:
												'Minimum number of character for new password is 6'
										},
										maxLength: {
											value: 16,
											message:
												'Maximum number of character for new password is 16'
										}
									}}
									type='password'
									placeholder='New password'
								/>
								<DragAndDrop
									loading={isFetching || isLoadingMutate}
									error={errors?.image?.message}
									name='image'
									register={register}
									type='file'
									setError={setError}
									setValue={setValue}
									fieldState={getFieldState('image')}
								/>
								<div className={styles.buttonWrapper}>
									<Button
										loading={isFetching || isLoadingMutate}
										clickHandler={() => {
											handleSubmit(onSubmit)
										}}
									>
										Edit
									</Button>
									<span
										disabled={isFetching || isLoadingMutate}
										onClick={() =>
											isConfirmShow
												? setConfirmShow(false)
												: setConfirmShow(true)
										}
										tabIndex={0}
										onKeyDown={event => {
											if (event.key === 'Enter') {
												isConfirmShow
													? setConfirmShow(false)
													: setConfirmShow(true)
											}
										}}
									>
										Delete acc
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{isConfirmShow ? (
				<div className={styles.confirm}>
					<div>
						<h1>You are sure?</h1>
						<div>
							<span
								onClick={() => deleteAccountHandler()}
								tabIndex={0}
								onKeyDown={event => {
									if (event.key === 'Enter') {
										deleteAccountHandler()
									}
								}}
							>
								Delete
							</span>
							<span
								onClick={() =>
									isConfirmShow ? setConfirmShow(false) : setConfirmShow(true)
								}
								tabIndex={0}
								onKeyDown={event => {
									if (event.key === 'Enter') {
										isConfirmShow ? setConfirmShow(false) : setConfirmShow(true)
									}
								}}
							>
								Cancel
							</span>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default ProfileEdit
