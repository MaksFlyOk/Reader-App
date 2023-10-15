import PropTypes from 'prop-types'

import styles from './Star.module.scss'

import { COLORS } from '../../../../app.constants'

/**
 * This is a component for RatingActive, it is needed to display the rating of a book in the form of stars and also to give a rating.
 * @component
 * @typedef PropType
 * @property {number | boolean} dataRate - This is an evaluation of an authorized user's book.
 * @property {function} clickHandler - This is the function when you click on the asterisk.
 *
 * @param {PropType} props
 * @returns JSX component Star.
 */
const Star = ({ dataRate, clickHandler }) => {
	let dataRateIndex = dataRate
	const stars = []

	for (let i = 0; i < 5; i++) {
		if (dataRateIndex > 0 && dataRateIndex !== false) {
			stars.push(
				<svg
					className={styles.star}
					key={i}
					tabIndex={0}
					data-value={i}
					onClick={event => clickHandler(event)}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							clickHandler(event)
						}
					}}
					xmlns='http://www.w3.org/2000/svg'
					width='19'
					height='18'
					viewBox='0 0 19 18'
					fill={COLORS.white}
				>
					<path
						d='M9.01786 0.837128C9.19624 0.387624 9.80376 0.387624 9.98214 0.837128L11.9557 5.81058C12.0309 6.00008 12.2009 6.12956 12.3961 6.14596L17.5188 6.57641C17.9818 6.61532 18.1695 7.22092 17.8168 7.53764L13.9138 11.0419C13.7651 11.1754 13.7002 11.3849 13.7456 11.5845L14.938 16.824C15.0458 17.2975 14.5543 17.6718 14.1579 17.4181L9.77219 14.6103C9.60508 14.5034 9.39492 14.5034 9.22781 14.6103L4.84208 17.4181C4.44569 17.6718 3.95419 17.2975 4.06196 16.824L5.25438 11.5845C5.29981 11.3849 5.23487 11.1754 5.08616 11.0419L1.18321 7.53764C0.83046 7.22092 1.0182 6.61532 1.48119 6.57641L6.60387 6.14596C6.79906 6.12956 6.96909 6.00008 7.04428 5.81058L9.01786 0.837128Z'
						stroke={COLORS.white}
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			)

			dataRateIndex -= 1
		} else {
			stars.push(
				<svg
					className={styles.star}
					tabIndex={0}
					key={i}
					data-value={i}
					onClick={event => clickHandler(event)}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							clickHandler(event)
						}
					}}
					xmlns='http://www.w3.org/2000/svg'
					width='19'
					height='18'
					viewBox='0 0 19 18'
					fill='transparent'
				>
					<path
						d='M9.01786 0.837128C9.19624 0.387624 9.80376 0.387624 9.98214 0.837128L11.9557 5.81058C12.0309 6.00008 12.2009 6.12956 12.3961 6.14596L17.5188 6.57641C17.9818 6.61532 18.1695 7.22092 17.8168 7.53764L13.9138 11.0419C13.7651 11.1754 13.7002 11.3849 13.7456 11.5845L14.938 16.824C15.0458 17.2975 14.5543 17.6718 14.1579 17.4181L9.77219 14.6103C9.60508 14.5034 9.39492 14.5034 9.22781 14.6103L4.84208 17.4181C4.44569 17.6718 3.95419 17.2975 4.06196 16.824L5.25438 11.5845C5.29981 11.3849 5.23487 11.1754 5.08616 11.0419L1.18321 7.53764C0.83046 7.22092 1.0182 6.61532 1.48119 6.57641L6.60387 6.14596C6.79906 6.12956 6.96909 6.00008 7.04428 5.81058L9.01786 0.837128Z'
						stroke={COLORS.white}
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			)
		}
	}

	return stars
}

Star.propTypes = {
	dataRate: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	clickHandler: PropTypes.func.isRequired
}

export default Star
