import PropTypes from 'prop-types'

import styles from './RunningLine.module.scss'

/**
 * Running line component. It's just an endless ticker. You can pass text and iconPath to it, if you pass only one variable, the second one will just get disabled.
 * @component
 * @typedef PropType
 * @property {string} text - This is the text component of the ticker. By default it is "Redeem".
 * @property {string} iconPath - This is the picture that is between the lines of the ticker. The default path is "/public/Icon light.svg".
 *
 * @param {PropType} props
 * @returns JSX component RunningLine.
 */
const RunningLine = ({
	text = 'Redeem',
	iconPath = '/public/Icon-light.svg'
}) => {
	return (
		<div className={styles.wrapper}>
			<div>
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
			</div>
			<div aria-hidden='true'>
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
				<p>{text}</p>
				<img src={iconPath} draggable={false} />
			</div>
		</div>
	)
}

RunningLine.propTypes = {
	text: PropTypes.string,
	iconPath: PropTypes.string
}

export default RunningLine
