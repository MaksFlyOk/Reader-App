import PropTypes from 'prop-types'

import AuthorCard from '../../author-card/AuthorCard'

/**
 * This is a loader component that draws the required number of AuthorCard components.
 * @component
 * @typedef PropType
 * @property {number} quantity - This is the required number of elements to be drawn.
 * @property {"horizontalMiddleCard" | "horizontalMiddleCard_Empty" | "horizontalMiddleCard_Loader" | "verticalLargeCard" | "verticalLargeCard_Empty" | "verticalLargeCard_Loader"} style - You can throw in the same styles as for AuthorCard.
 *
 * @param {PropType} props
 * @returns JSX component AuthorCardLoaderLoop.
 */
const AuthorCardLoaderLoop = ({ quantity, style }) => {
	const createLoaderElementsLoop = quantity => {
		const arrayOfElements = []

		for (let index = 0; index < quantity; index++) {
			arrayOfElements.push(<AuthorCard style={style} key={`loader_${index}`} />)
		}

		return arrayOfElements
	}

	return createLoaderElementsLoop(quantity)
}

AuthorCardLoaderLoop.propTypes = {
	quantity: PropTypes.number,
	style: PropTypes.oneOf([
		'horizontalMiddleCard',
		'horizontalMiddleCard_Empty',
		'horizontalMiddleCard_Loader',

		'verticalLargeCard',
		'verticalLargeCard_Empty',
		'verticalLargeCard_Loader'
	])
}

export default AuthorCardLoaderLoop
