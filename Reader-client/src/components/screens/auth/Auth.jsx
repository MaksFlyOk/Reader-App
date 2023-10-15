import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'
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
		isAlertShow,
		setFocus
	} = useAuthPage()

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			<main className={styles.wrapper}>
				<section>
					<Logo />
					<div className={styles.formWrapper}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div
								style={
									isAuthForm === 'register'
										? { display: 'block' }
										: { display: 'none' }
								}
							>
								<Field
									loading={isLoading}
									error={errors?.name?.message}
									name='name'
									register={register}
									options={{
										required: 'Name is required',
										minLength: {
											value: 4,
											message: 'Minimum number of character for username is 4'
										},
										maxLength: {
											value: 16,
											message: 'Maximum number of character for username is 16'
										},
										disabled: isAuthForm === 'login' ? true : false
									}}
									type='text'
									placeholder='Name'
								/>
							</div>
							<Field
								loading={isLoading}
								error={errors?.email?.message}
								name='email'
								register={register}
								options={{ required: 'Email is required' }}
								type='email'
								placeholder='Email'
							/>
							<Field
								loading={isLoading}
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
										message: 'Maximum number of character for password is 16'
									}
								}}
								type='password'
								placeholder='Password'
							/>
							<div className={styles.buttonWrapper}>
								<Button
									loading={isLoading}
									clickHandler={() => {
										handleSubmit(onSubmit)
									}}
								>
									{isAuthForm === 'login' ? 'Sign in' : 'Sign up'}
								</Button>
								<span
									disabled={isLoading}
									onClick={() =>
										setAuth(isAuthForm === 'login' ? 'register' : 'login')
									}
									tabIndex={0}
									onKeyDown={event => {
										if (event.key === 'Enter') {
											setAuth(isAuthForm === 'login' ? 'register' : 'login')

											setFocus('email')
										}
									}}
								>
									{isAuthForm === 'login' ? 'Sign up' : 'Sign in'}
									<img
										src='/public/button/Button-arrow.svg'
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
					</div>
				</section>
			</main>
		</>
	)
}

export default Auth
