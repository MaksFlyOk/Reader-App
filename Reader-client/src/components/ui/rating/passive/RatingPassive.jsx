import PropTypes from 'prop-types'

import { setNumberOfGrades } from '../../../../utils/file/setNumberOfGrades.util'
import { setRating } from '../../../../utils/file/setRating.util'

import styles from '../Rating.module.scss'

/**
 * Other books component. This component outputs other books, if the author has only one book, then the component outputs similar books by category, otherwise the rest of the author's books.
 * @component
 * @typedef PropType
 * @property {number} sumRate - It's the sum of all the ratings in the book data.
 * @property {number} rateLength - This is the length of the array with all the ratings, i.e. the number of users who gave a rating.
 * @property {string} style - These are the display styles of the component. By default they are "passive" - for displaying in the panel for each book (dark version), "passiveForBook" - for displaying in the book screen (light version).
 *
 * @param {PropType} props
 * @returns JSX component OtherBooks.
 */
const RatingPassive = ({ sumRate, rateLength, style = 'passive' }) => {
	return style === 'passive' ? (
		<div className={styles.passive}>
			<span>{setRating(sumRate, rateLength)}</span>
			<img src='/public/rating/Star-dark-stroke.svg' draggable={false} />
			<span>({setNumberOfGrades(rateLength)})</span>
		</div>
	) : (
		<div className={styles.passiveForBook}>
			<img src='/public/rating/Star-light-stroke.svg' draggable={false} />
			<span>{setRating(sumRate, rateLength)}</span>
			<span>({setNumberOfGrades(rateLength)})</span>
		</div>
	)
}

RatingPassive.propTypes = {
	sumRate: PropTypes.number,
	rateLength: PropTypes.number,
	style: PropTypes.oneOf(['passive', 'passiveForBook'])
}

export default RatingPassive
