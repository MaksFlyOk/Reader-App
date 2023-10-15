import PropTypes from 'prop-types'
import { Fragment } from 'react'

import styles from './RunningLine.module.scss'

/**
 * Running line component. It's just an endless ticker. You can pass text and iconPath to it, if you pass only one variable, the second one will just get disabled.
 * @component
 * @typedef PropType
 * @property {string} text - This is the text component of the ticker. By default it is "Redeem".
 * @property {string} iconPath - This is the picture that is between the lines of the ticker. The default path is "/public/Icon light.svg". If you set "none", you can disable the picture.
 *
 * @param {PropType} props
 * @returns JSX component RunningLine.
 */
const RunningLine = ({
	text = 'Redeem',
	iconPath = '/public/Icon-light.svg'
}) => {
	const createElementsLoop = quantity => {
		const arrayOfElements = []

		for (let i = 0; i < quantity; i++) {
			arrayOfElements.push(
				<Fragment key={`running-line-element_${i}`}>
					<span>{text}</span>
					{iconPath === 'none' ? null : (
						<img src={iconPath} alt='Redeem' draggable={false} />
					)}
				</Fragment>
			)
		}

		return arrayOfElements
	}

	return (
		<figure className={styles.wrapper}>
			<div>{createElementsLoop(17)}</div>
			<div aria-hidden='true'>{createElementsLoop(17)}</div>
		</figure>
	)
}

RunningLine.propTypes = {
	text: PropTypes.string,
	iconPath: PropTypes.string
}

export default RunningLine
