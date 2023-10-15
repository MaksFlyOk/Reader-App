import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import styles from './Category.module.scss'

import { COLORS } from '../../../../../app.constants'

/**
 * This is the component for Categories inside the filtering (Books page).
 * @component
 * @typedef PropType
 * @property {function} register - React Hook Form function to register the input field.
 * @property {array<{id: number, category: string}>} options - These are all categories of books retrieved from the database.
 * @property {function} setValue - React Hook Form function to set the value inside the input field.
 * @property {function} getValues - React Hook Form function to get the value inside the input field.
 * @property {function} onSubmit - Function for submitting form data.
 *
 * @param {PropType} props
 * @returns JSX component Category.
 */
const Category = ({
	register,
	options = [],
	setValue,
	getValues,
	onSubmit
}) => {
	/**
	 * @description This is a ref to the wrapper for the category sheet and search field.
	 */
	const wrapperCategories = useRef()
	/**
	 * @description This is a ref to the <Input> of the category post.
	 */
	const search = useRef()
	const categoriesRefs = useRef([])

	const [dropdownState, setDropdownState] = useState(false)
	/**
	 * @description This state determines the value of the search query.
	 */
	const [valueSearch, setValueSearch] = useState('')
	/**
	 * @description This state defines all checked categories.
	 */
	const [valueChecked, setValueChecked] = useState(
		/** @type {import('react').Ref[]} */ ([])
	)

	const { ref, ...rest } = register('category')

	/**
	 * his function works by moving through the Categories sheet using TAB. That is, it moves through the categories and check or uncheck for each category by pressing Enter, also closes the sheet when it reaches its end and automatically sends a request for books to the appropriate filters.
	 * @param {event} event - This is the event when a key is pressed on the keyboard.
	 */
	const onKeyDown_Enter_Category = event => {
		const categoryElem = categoriesRefs.current.indexOf(event.target.firstChild)

		if (event.key === 'Enter') {
			event.preventDefault()

			if (categoryElem !== -1) {
				categoriesRefs.current[categoryElem].checked =
					!categoriesRefs.current[categoryElem].checked
			}
		}

		if (event.key === 'Tab') {
			if (
				event.target.firstChild === categoriesRefs.current.at(-1) ||
				(valueSearch !== '' &&
					event.target.firstChild ===
						categoriesRefs.current
							.filter(category => category.parentNode.classList.length === 2)
							.at(-1))
			) {
				setDropdownState(false)

				search.current.value = ''
				setValueSearch('')

				onSubmit()
			}
		}
	}

	/**
	 * This function sets the styles and TabIndex for the categories. If type: TabIndex, then if the category is displayed 0, otherwise -1. If type: Styles: if the category is displayed "styles.categoryView", otherwise "".
	 * @param {{id: number, category: string}} category
	 * @param {"tabIndex" | "styles"} type
	 * @returns {number | styles}
	 */
	const setSearchCategoriesList = (category, type) => {
		if (
			(category.category.toLowerCase().includes(valueSearch.toLowerCase()) &&
				valueSearch) ||
			dropdownState
		) {
			return type === 'tabIndex' ? 0 : styles.categoryView
		}

		return type === 'tabIndex' ? -1 : ''
	}

	/**
	 * This function simply sets the state of DropDownState = True.
	 */
	const handleDropdownClick = () => {
		setDropdownState(true)
	}

	/**
	 * This function is triggered when the popup menu is opened, provided that the "Click" was not within the list.
	 * @param {event} event
	 */
	const handleClickOutside = event => {
		if (
			wrapperCategories.current &&
			!wrapperCategories.current.contains(event.target)
		) {
			setDropdownState(false)

			search.current.value = ''
			setValueSearch('')
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		setValueChecked(prevState => {
			const newState = categoriesRefs.current.filter(checkbox => {
				return checkbox.checked === true
			})

			if (prevState.length !== newState.length) {
				search.current.value = ''
				setValueSearch('')

				setValue(
					'category',
					newState.map(category => category.value)
				)

				return newState
			}

			return prevState
		})

		if (
			!valueSearch &&
			!search.current.value &&
			document.activeElement === search.current
		) {
			setDropdownState(true)
		} else {
			setDropdownState(false)
		}
	}, [onSubmit, valueSearch, onKeyDown_Enter_Category])

	return (
		<div className={styles.wrapper}>
			<h2>Category</h2>
			<div className={styles.wrapperCategories} ref={wrapperCategories}>
				<div className={styles.search}>
					<input
						type='text'
						ref={search}
						placeholder='Find category'
						onFocus={handleDropdownClick}
						onChange={val => setValueSearch(val.target.value)}
					/>
				</div>
				<ul className={styles.categories}>
					{options.map((category, index) => (
						<li
							tabIndex={setSearchCategoriesList(category, 'tabIndex')}
							key={category?.id}
							onKeyDown={onKeyDown_Enter_Category}
							className={`${styles.category} ${setSearchCategoriesList(
								category,
								'styles'
							)}`}
						>
							<input
								type='checkbox'
								name='category'
								tabIndex={-1}
								ref={element => {
									ref(element)
									categoriesRefs.current[index] = element
								}}
								value={category?.id}
								id={category?.category}
								{...rest}
							/>
							<label htmlFor={category?.category}>{category?.category}</label>
						</li>
					))}
				</ul>
				<div
					className={styles.valueChecked}
					style={dropdownState ? { opacity: `0%` } : { opacity: `100%` }}
				>
					{valueChecked.map(checkbox => (
						<button
							key={`Button_disabled_checkbox_byId_${checkbox.id}`}
							type='button'
							onClick={() => {
								categoriesRefs.current.filter(
									currentCheckbox => currentCheckbox === checkbox
								).checked = false

								setValue('category', [
									...getValues('category').filter(
										category => category !== checkbox.value
									)
								])
								onSubmit()
							}}
						>
							{checkbox.id}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0Z'
									fill={COLORS.white}
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M14.5962 5.40283C14.7915 5.5981 14.7915 5.91468 14.5962 6.10994L10.7071 9.99903L14.5962 13.8881C14.7915 14.0834 14.7915 14.4 14.5962 14.5952C14.4009 14.7905 14.0843 14.7905 13.8891 14.5952L10 10.7061L6.11091 14.5952C5.91565 14.7905 5.59907 14.7905 5.40381 14.5952C5.20854 14.4 5.20854 14.0834 5.40381 13.8881L9.29289 9.99903L5.40381 6.10994C5.20854 5.91468 5.20854 5.5981 5.40381 5.40283C5.59907 5.20757 5.91565 5.20757 6.11091 5.40283L10 9.29192L13.8891 5.40283C14.0843 5.20757 14.4009 5.20757 14.5962 5.40283Z'
									fill={COLORS.white}
								/>
							</svg>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

Category.propTypes = {
	register: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			category: PropTypes.string
		})
	),
	setValue: PropTypes.func,
	getValues: PropTypes.func,
	onSubmit: PropTypes.func
}

export default Category
