import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'
import Loader from '../../ui/loader/Loader'
import Logo from '../../ui/logo/Logo'
import styles from './Auth.module.scss'
import { useAuthPage } from './useAuthPage'

const Auth = () => {
	const {
		isLoading,
		handleSubmit,
		onSubmit,
		isAuthForm,
		errors,
		register,
		setAuth,
		error,
		isAlertShow
	} = useAuthPage()

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			<div className={styles.wrapper}>
				<div>
					<Logo />
					<div className={styles.formWrapper}>
						{isLoading === true ? (
							<Loader />
						) : (
							<>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div
										style={
											isAuthForm === 'register'
												? { display: 'block' }
												: { display: 'none' }
										}
									>
										<Field
											error={errors?.name?.message}
											name='name'
											register={register}
											options={{
												required: 'Name is required',
												minLength: {
													value: 4,
													message:
														'Minimum number of character for username is 4'
												},
												maxLength: {
													value: 16,
													message:
														'Maximum number of character for username is 16'
												},
												disabled: isAuthForm === 'login' ? true : false
											}}
											type='text'
											placeholder='Name'
										/>
									</div>
									<Field
										error={errors?.email?.message}
										name='email'
										register={register}
										options={{ required: 'Email is required' }}
										type='email'
										placeholder='Email'
									/>
									<Field
										error={errors?.password?.message}
										name='password'
										register={register}
										options={{
											required: 'Password is required',
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
									<div className={styles.buttonWrapper}>
										<Button
											clickHandler={() => {
												handleSubmit(onSubmit)
											}}
										>
											{isAuthForm === 'login' ? 'Sign in' : 'Sign up'}
										</Button>
										<span
											onClick={() =>
												setAuth(isAuthForm === 'login' ? 'register' : 'login')
											}
										>
											{isAuthForm === 'login' ? 'Sign up' : 'Sign in'}
											<img
												src='/public/Button arrow.svg'
												alt='Button arrow'
												style={
													isAuthForm === 'register'
														? { transform: 'rotate(-90deg)' }
														: { transform: 'rotate(0deg)' }
												}
											/>
										</span>
									</div>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Auth
