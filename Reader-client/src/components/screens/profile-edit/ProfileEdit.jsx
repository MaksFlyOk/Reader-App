import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'
import { useProfile } from '../../../hooks/user/useProfile'

import authService from '../../../services/auth.service'
import fileService from '../../../services/file/file.service'
import editUserService from '../../../services/user/edit-user.service'

import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'
import DragAndDrop from '../../ui/field/drag-and-drop/DragAndDrop'
import Loader from '../../ui/loader/Loader'
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

	const { data, isLoading, refetch } = useProfile()
	const { setIsAuth, setIsAdmin, setUserId } = useContextStates()
	const navigate = useNavigate()

	const [isConfirmShow, setConfirmShow] = useState(false)

	const onSubmit = data => {
		console.log(data)
		if (data.name) {
			editUserService.editUser('name', data)
		}

		if (data.password && data.newPassword) {
			editUserService.editUser('password', data)
		}

		if (data.image[0]) {
			fileService.uploadUserProfileImage(data)
		}

		if (data.name || (data.password && data.newPassword) || data.image[0]) {
			refetch()
		}

		reset()
	}

	const deleteHandler = () => {
		authService.deleteUser()
		Cookies.remove(TOKEN)

		setUserId(undefined)
		setIsAuth(false)
		setIsAdmin(false)
		navigate('/auth')
	}

	return (
		<>
			{isConfirmShow ? (
				<div className={styles.confirm}>
					<div>
						<h1>You are sure?</h1>
						<div>
							<span onClick={() => deleteHandler()}>Delete</span>
							<span
								onClick={() =>
									isConfirmShow ? setConfirmShow(false) : setConfirmShow(true)
								}
							>
								Cancel
							</span>
						</div>
					</div>
				</div>
			) : null}
			<div className={styles.wrapper}>
				<div>
					<Logo />
					{isLoading ? (
						<Loader />
					) : (
						<div className={styles.profileEdit}>
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
							<div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Field
										styleInput='fieldSmall'
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
												message:
													'Maximum number of character for username is 16'
											}
										}}
										type='text'
										placeholder={`Name (${data?.name})`}
									/>
									<Field
										styleInput='fieldSmall'
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
												message:
													'Maximum number of character for password is 16'
											}
										}}
										type='password'
										placeholder='Password'
									/>
									<Field
										styleInput='fieldSmall'
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
										styleInput='fileFieldSmall'
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
											clickHandler={() => {
												handleSubmit(onSubmit)
											}}
										>
											Edit
										</Button>
										<span
											onClick={() =>
												isConfirmShow
													? setConfirmShow(false)
													: setConfirmShow(true)
											}
										>
											Delete acc
										</span>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default ProfileEdit
