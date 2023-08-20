import styles from './Button.module.scss'

const Button = ({ children, style = 'fillButton', clickHandler }) => {
	return (
		<button className={styles[style]} onClick={clickHandler}>
			{children}
			{style === 'arrowButton' ? (
				<img src='/public/Button arrow.svg' alt='Button arrow' />
			) : null}
		</button>
	)
}

export default Button
