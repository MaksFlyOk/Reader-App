import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import styles from './PopUpList.module.scss'

/**
 * It's a Pop-Up List component.
 * @component
 * @typedef PropType
 * @property {array<{value: string, label: string}>} options - This is an array with list items, each item object stores a value and a label.
 * @property {function} register - React Hook Form function to register the input field.
 * @property {string} name - This is the name for registering input's for the React Hook Form.
 * @property {string} state - This is the forwarded external state for tracking the current active field.
 * @property {function} setValue - React Hook Form function to set the value inside the input field.
 * @property {function} onSubmit - Function for submitting form data.
 *
 * @param {PropType} props
 * @returns JSX component PopUpList.
 */
const PopUpList = ({ options, register, name, state, setValue, onSubmit }) => {
	const [isDropDown, setIsDropDown] = useState(false)
	const dropDown = useRef()

	const handleClickOutside = e => {
		if (dropDown.current && !dropDown.current.contains(e.target)) {
			setIsDropDown(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className={styles.dropDown} ref={dropDown}>
			<div
				onClick={() =>
					isDropDown ? setIsDropDown(false) : setIsDropDown(true)
				}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						event.preventDefault()

						isDropDown ? setIsDropDown(false) : setIsDropDown(true)
					}
				}}
				tabIndex={0}
			>
				<span>{options.find(elem => elem.value === state).label}</span>
				<svg
					className={
						isDropDown
							? styles.arrowDropDownEnabled
							: styles.arrowDropDownDisabled
					}
					xmlns='http://www.w3.org/2000/svg'
					width='12'
					height='8'
					viewBox='0 0 12 8'
					fill='none'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0.276203 0.651642C0.634498 0.307128 1.20424 0.318299 1.54875 0.676594L6 5.40189L10.4513 0.676594C10.7958 0.318299 11.3655 0.307128 11.7238 0.651642C12.0821 0.996156 12.0933 1.5659 11.7487 1.92419L6.64875 7.32419C6.47907 7.50066 6.24482 7.60039 6 7.60039C5.75519 7.60039 5.52093 7.50066 5.35125 7.32419L0.251251 1.92419C-0.0932627 1.5659 -0.0820913 0.996156 0.276203 0.651642Z'
						fill='white'
					/>
				</svg>
			</div>
			<div
				className={
					isDropDown
						? `${styles.dropDownElements} ${styles.active}`
						: `${styles.dropDownElements}`
				}
			>
				{options.map((elem, index) => (
					<span
						key={index}
						style={state === elem.value ? { display: 'none' } : null}
					>
						<input
							type='radio'
							value={elem.value}
							id={index}
							defaultChecked={index === 0 ? true : false}
							{...register(name)}
							onClick={() => {
								setIsDropDown(false)
							}}
						/>
						<label
							htmlFor={index}
							tabIndex={0}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									event.preventDefault()

									event.target.control.checked = true

									setValue('sort', event.target.control.defaultValue)
									onSubmit()

									setIsDropDown(false)
								}

								if (
									event.key === 'Tab' &&
									event.target ===
										event.target.offsetParent.childNodes[1].lastChild.lastChild
								) {
									setIsDropDown(false)
								}
							}}
						>
							{elem.label}
						</label>
					</span>
				))}
			</div>
		</div>
	)
}

PopUpList.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string
		})
	),
	register: PropTypes.func,
	name: PropTypes.string,
	state: PropTypes.string,
	setValue: PropTypes.func,
	onSubmit: PropTypes.func
}

export default PopUpList
