import PropTypes from 'prop-types'

import styles from './DoubleRange.module.scss'

import { UseDoubleRange } from './UseDoubleRange'

/**
 * This is a component to set the publication date of a book inside the filter (Books page).
 * @component
 * @typedef PropType
 * @property {number} min - This is the minimum value for the range field.
 * @property {number} max - This is the maximum value for the range field.
 * @property {{min: number, max: number}} value - These are the values that should be declared in the parent component as state.
 * @property {function} reset - A function from React Hook Form to zero out a field.
 * @property {number} step - This is the step for the range field.
 * @property {function} onChange - Function for setting the value state.
 *
 * @param {PropType} props
 * @returns JSX component DoubleRange.
 */
const DoubleRange = ({
	min = 0,
	max = 0,
	value = { min: 0, max: 0 },
	reset,
	step = 0,
	onChange
}) => {
	const {
		inputNumberMin,
		handleMinChange,
		inputNumberMax,
		handleMaxChange,
		minValue,
		maxValue,
		minPos,
		maxPos
	} = UseDoubleRange(min, max, value, onChange, step, reset)

	return (
		<div className={styles.wrapper}>
			<div className={styles.rangeValue}>
				<input
					step={step}
					ref={inputNumberMin}
					type='number'
					max={max - step}
					min={min}
					onBlur={handleMinChange}
					onKeyDown={event => {
						if (event.key === 'Enter') handleMinChange(event)
					}}
					placeholder={value.min}
					defaultValue={min}
				/>
				<span>to</span>
				<input
					step={step}
					ref={inputNumberMax}
					type='number'
					max={max}
					min={min + step}
					onBlur={handleMaxChange}
					onKeyDown={event => {
						if (event.key === 'Enter') handleMaxChange(event)
					}}
					placeholder={value.max}
					defaultValue={max}
				/>
			</div>
			<div>
				<div>
					<input
						tabIndex={-1}
						type='range'
						value={minValue}
						min={min}
						max={max}
						step={step}
						onChange={handleMinChange}
					/>
					<input
						tabIndex={-1}
						type='range'
						value={maxValue}
						min={min}
						max={max}
						step={step}
						onChange={handleMaxChange}
					/>
				</div>

				<div>
					<div className={styles.control} style={{ left: `${minPos}%` }} />
					<div className={styles.rail}>
						<div
							className={styles.innerRail}
							style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
						/>
					</div>
					<div className={styles.control} style={{ left: `${maxPos}%` }} />
				</div>
			</div>
		</div>
	)
}

DoubleRange.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number
	}),
	reset: PropTypes.func,
	step: PropTypes.number,
	onChange: PropTypes.func
}

export default DoubleRange
