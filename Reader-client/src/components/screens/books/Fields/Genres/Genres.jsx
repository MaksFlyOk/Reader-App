import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

import styles from './Genres.module.scss'

/**
 * This is the component for Genres inside the filtering (Books page).
 * @component
 * @typedef PropType
 * @property {array<{id: number, genre: string}>} genres - These are all genres of books extracted from the database.
 * @property {function} register - React Hook Form function to register the input field.
 * @property {function} setValue - React Hook Form function to set the value inside the input field.
 * @property {function} getValues - React Hook Form function to get the value inside the input field.
 * @property {function} onSubmit - Function for submitting form data.
 *
 * @param {PropType} props
 * @returns JSX component Genres.
 */
const Genres = ({ genres = [], register, onSubmit, setValue, getValues }) => {
	const [genresEnabled, setGenresEnabled] = useState(false)
	const firstGenre = useRef()

	/**
	 * This function sets the Genres value when you interact with the keyboard.
	 * @param {event} event - This is the event when a key is pressed on the keyboard.
	 */
	const onKeyDownHandler_Enter = event => {
		if (event.key === 'Enter') {
			event.preventDefault()

			if (!event.target.control.checked) {
				event.target.control.checked = true

				setValue(
					'genre',
					getValues('genre') === false
						? [event.target.control.id]
						: [...getValues('genre'), event.target.control.id]
				)
			} else {
				event.target.control.checked = false

				setValue(
					'genre',
					getValues('genre').filter(genre => genre !== event.target.control.id)
				)
			}

			onSubmit()
		}
	}

	return (
		<div className={styles.wrapper}>
			<h2>Genres</h2>
			<div className={styles.wrapperGenres}>
				{genres.length <= 3 ? (
					genres.map(genre => (
						<span key={genre?.id} className={styles.genre}>
							<input
								tabIndex={-1}
								type='checkbox'
								{...register('genre')}
								value={genre?.id}
								id={genre?.id}
							/>
							<label
								tabIndex={0}
								htmlFor={genre?.id}
								onKeyDown={onKeyDownHandler_Enter}
							>
								{genre?.genre}
							</label>
						</span>
					))
				) : (
					<>
						{genres.map((genre, index) => {
							if (index < 3) {
								return (
									<span key={genre?.id} className={styles.genre}>
										<input
											tabIndex={-1}
											type='checkbox'
											{...register('genre')}
											value={genre?.id}
											id={genre?.id}
										/>
										<label
											ref={index === 0 ? firstGenre : null}
											htmlFor={genre?.id}
											tabIndex={0}
											onKeyDown={onKeyDownHandler_Enter}
										>
											{genre?.genre}
										</label>
									</span>
								)
							} else {
								return (
									<span
										key={genre?.id}
										className={
											genresEnabled ? styles.genre : styles.genreDisabled
										}
									>
										<input
											tabIndex={-1}
											type='checkbox'
											{...register('genre')}
											value={genre?.id}
											id={genre?.id}
										/>
										<label
											htmlFor={genre?.id}
											tabIndex={0}
											onKeyDown={onKeyDownHandler_Enter}
										>
											{genre?.genre}
										</label>
									</span>
								)
							}
						})}
						<span
							tabIndex={0}
							className={genresEnabled ? styles.buttonHide : styles.buttonView}
							onClick={() =>
								genresEnabled ? setGenresEnabled(false) : setGenresEnabled(true)
							}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									event.preventDefault()

									genresEnabled
										? setGenresEnabled(false)
										: setGenresEnabled(true)
									firstGenre.current.focus()
								}
							}}
						>
							{genresEnabled ? 'Hide all' : 'View All'}
							<img src='/public/button/Button-arrow.svg' alt='arrow' />
						</span>
					</>
				)}
			</div>
		</div>
	)
}

Genres.propTypes = {
	register: PropTypes.func,
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			genre: PropTypes.string
		})
	),
	setValue: PropTypes.func,
	getValues: PropTypes.func,
	onSubmit: PropTypes.func
}

export default Genres
