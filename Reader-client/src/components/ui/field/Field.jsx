import PropTypes from 'prop-types'

import styles from './Field.module.scss'

/**
 * Field component.
 * @component
 * @typedef PropType
 * @property {function} register - This is a field registration function, it is swiped from react-hook-from.
 * @property {string} name - This is the name of the field.
 * @property {string} error - This is a validation error, thrown from react-hook-form.
 * @property {object} options - These are validation and option settings, swiped according to the react-hook-form documentation.
 * @property {string} styleInput - This is the field style, the default is "field" is the standard field, "fieldSmall" is the field with reduced paddings.
 * @property {string} type - This is the type of the input[type='type'] field.
 * @property {object} rest - This is all other required data for which no variables have been set.
 *
 * @param {PropType} props
 * @returns JSX component Field.
 */
const Field = ({
	register,
	name,
	error,
	options,
	styleInput = 'field',
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

Field.propTypes = {
	register: PropTypes.func,
	name: PropTypes.string,
	error: PropTypes.string,
	options: PropTypes.object,
	styleInput: PropTypes.oneOf(['field', 'fieldSmall']),
	type: PropTypes.oneOf([
		'checkbox',
		'date',
		'email',
		'number',
		'password',
		'radio',
		'range',
		'reset',
		'search',
		'submit',
		'tel',
		'text'
	])
}

export default Field
