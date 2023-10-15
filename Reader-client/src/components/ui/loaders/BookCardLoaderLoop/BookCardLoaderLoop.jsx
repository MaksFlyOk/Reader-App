import PropTypes from 'prop-types'

import BookCard from '../../book-card/BookCard'

/**
 * This is a loader component that draws the required number of BookCard components.
 * @component
 * @typedef PropType
 * @property {number} quantity - This is the required number of elements to be drawn.
 * @property {"horizontalMiddleCard" | "horizontalMiddleCard_Empty" | "horizontalMiddleCard_Loader" | "verticalMiddleCard" | "verticalMiddleCard_Empty" | "verticalMiddleCard_Loader" | "verticalLargeCard" | "verticalLargeCard_Empty" | "verticalLargeCard_Loader" | "horizontalLittleCardTag_Li" | "horizontalLittleCardTag_Li_Empty" | "horizontalLittleCardTag_Li_Loader" | "horizontalLargeCardTag_Li" | "horizontalLargeCardTag_Li_Empty" | "horizontalLargeCardTag_Li_Loader"} style - You can throw in the same styles as for BookCard.
 *
 * @param {PropType} props
 * @returns JSX component BookCardLoaderLoop.
 */
const BookCardLoaderLoop = ({ quantity, style }) => {
	const createLoaderElementsLoop = quantity => {
		const arrayOfElements = []

		for (let index = 0; index < quantity; index++) {
			arrayOfElements.push(<BookCard style={style} key={`loader_${index}`} />)
		}

		return arrayOfElements
	}

	return createLoaderElementsLoop(quantity)
}

BookCardLoaderLoop.propTypes = {
	quantity: PropTypes.number,
	style: PropTypes.oneOf([
		'horizontalMiddleCard',
		'horizontalMiddleCard_Empty',
		'horizontalMiddleCard_Loader',

		'verticalMiddleCard',
		'verticalMiddleCard_Empty',
		'verticalMiddleCard_Loader',

		'verticalLargeCard',
		'verticalLargeCard_Empty',
		'verticalLargeCard_Loader',

		'horizontalLittleCardTag_Li',
		'horizontalLittleCardTag_Li_Empty',
		'horizontalLittleCardTag_Li_Loader',

		'horizontalLargeCardTag_Li',
		'horizontalLargeCardTag_Li_Empty',
		'horizontalLargeCardTag_Li_Loader'
	])
}

export default BookCardLoaderLoop
