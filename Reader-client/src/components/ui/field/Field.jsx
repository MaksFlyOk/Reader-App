import PropTypes from 'prop-types'

import styles from './Field.module.scss'

import { COLORS } from '../../../app.constants'

/**
 * Field component.
 * @component
 * @typedef PropType
 * @property {function} register - This is a field registration function, it is swiped from react-hook-from.
 * @property {string} name - This is the name of the field.
 * @property {string} error - This is a validation error, thrown from react-hook-form.
 * @property {boolean} loading - Disables input if the parent component is loading data.
 * @property {object} options - These are validation and option settings, swiped according to the react-hook-form documentation.
 * @property {"email" | "password" | "search" | "tel" | "text"} type - This is the type of the input[type='type'] field.
 * @property {any} rest - This is all other required data for which no variables have been set.
 *
 * @param {PropType} props
 * @returns JSX component Field.
 */
const Field = ({ register, name, error, loading, options, type, ...rest }) => {
	return (
		<div className={styles.inputWrapper}>
			<input
				{...register(name, options)}
				{...rest}
				type={type}
				disabled={loading}
				className={styles.field}
				style={error ? { border: `2px solid ${COLORS.danger}` } : { border: 0 }}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}

Field.propTypes = {
	register: PropTypes.func,
	name: PropTypes.string,
	error: PropTypes.string,
	loading: PropTypes.bool,
	options: PropTypes.object,
	type: PropTypes.oneOf(['email', 'password', 'search', 'tel', 'text']),
	rest: PropTypes.any
}

export default Field
