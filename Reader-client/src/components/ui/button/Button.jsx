import PropTypes from 'prop-types'

import styles from './Button.module.scss'

/**
 * Button component.
 * @component
 * @typedef PropType
 * @property {text} children - This is the button text parameter, we throw it inside the tag.
 * @property {string} style - fillButton - Button with background; borderButton - Button without background, but with stroke; arrowButton - A button with a background as well as an arrow inside it.
 * @property {function} clickHandler - Pass the function that will be executed when pressed.
 *
 * @param {PropType} props
 * @returns JSX component Button.
 */
const Button = ({ children, style = 'fillButton', clickHandler }) => {
	return (
		<button className={styles[style]} onClick={clickHandler}>
			{children}
			{style === 'arrowButton' ? (
				<img src='/public/button/Button-arrow.svg' alt='Button arrow' />
			) : null}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.any,
	style: PropTypes.oneOf(['fillButton', 'borderButton', 'arrowButton']),
	clickHandler: PropTypes.func
}

export default Button
