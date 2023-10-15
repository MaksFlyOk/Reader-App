import PropTypes from 'prop-types'

import styles from './Other.module.scss'

/**
 * This is a component for special types of filtration (Books page).
 * @component
 * @typedef PropType
 * @property {function} register - React Hook Form function to register the input field.
 * @property {function} setValue - React Hook Form function to set the value inside the input field.
 * @property {function} onSubmit - Function for submitting form data.
 *
 * @param {PropType} props
 * @returns JSX component Other.
 */
const Other = ({ register, onSubmit, setValue }) => {
	/**
	 * This function sets the Other value when you interact with the keyboard.
	 * @param {event} event - This is the event when a key is pressed on the keyboard.
	 */
	const onKeyDownHandler_Enter = event => {
		if (event.key === 'Enter') {
			event.preventDefault()

			if (!event.target.control.checked) {
				event.target.control.checked = true

				setValue('other', true)
			} else {
				event.target.control.checked = false

				setValue('other', false)
			}

			onSubmit()
		}
	}
	return (
		<div>
			<h2>Other</h2>
			<div className={styles.other}>
				<input
					type='checkbox'
					id='stars'
					{...register('other')}
					tabIndex={-1}
				/>
				<label tabIndex={0} htmlFor='stars' onKeyDown={onKeyDownHandler_Enter}>
					4+ stars
				</label>
			</div>
		</div>
	)
}

Other.propTypes = {
	register: PropTypes.func,
	setValue: PropTypes.func,
	onSubmit: PropTypes.func
}

export default Other
