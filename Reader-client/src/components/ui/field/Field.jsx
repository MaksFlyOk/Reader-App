import styles from './Field.module.scss'

const Field = ({
	register,
	name,
	error,
	options,
	styleInput = 'whiteField',
	type,
	...rest
}) => {
	return (
		<div className={styles.inputWrapper}>
			<input
				{...register(name, options)}
				{...rest}
				type={type}
				className={styles[styleInput]}
				style={error ? { border: '2px solid #ff2e63' } : { border: 0 }}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}

export default Field
