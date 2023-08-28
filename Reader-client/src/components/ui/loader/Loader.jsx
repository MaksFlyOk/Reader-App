import PropTypes from 'prop-types'

import styles from './Loader.module.scss'

/**
 * Loader component.
 * @component
 * @typedef PropType
 * @property {string} width - Sets the width of the loader.
 * @property {string} height - Sets the height of the loader.
 * @property {string} color - Sets the loader color, by default it is Accent(#cdb4db), there are also: Black(#2a2c2e), White(#f6f4f0).
 *
 * @param {PropType} props
 * @returns JSX component Loader.
 */
const Loader = ({ width = '100%', height = '100%', color = 'Accent' }) => {
	return (
		<svg
			className={styles.svgLogoAnimation}
			style={{ width: width, height: height, margin: 'auto auto' }}
			width='54'
			height='54'
			viewBox='0 0 54 54'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				className={styles[color]}
				d='M5.60577 23.3942L2 27L23.3942 48.3942M5.60577 23.3942L27 2L30.3654 5.36538M5.60577 23.3942L23.6346 41.4231L27 38.0577M38.0577 27L30.3654 19.3077M38.0577 27L34.6923 30.3654M38.0577 27L41.4231 30.3654L23.3942 48.3942M27 15.9423L30.3654 12.5769L48.3942 30.6058M27 15.9423L19.3077 23.6346M27 15.9423L30.3654 19.3077M15.9423 27L12.3365 23.3942L30.3654 5.36538M15.9423 27L23.6346 34.6923M15.9423 27L19.3077 23.6346M30.3654 5.36538L52 27L48.3942 30.6058M48.3942 30.6058L27 52L23.3942 48.3942M27 38.0577L23.6346 34.6923M27 38.0577L34.6923 30.3654M23.6346 34.6923L27 31.3269M31.3269 27L27 22.6731M31.3269 27L27 31.3269M31.3269 27L34.6923 30.3654M27 22.6731L22.6731 27M27 22.6731L30.3654 19.3077M22.6731 27L27 31.3269M22.6731 27L19.3077 23.6346'
				strokeWidth='2.5'
				strokeLinejoin='round'
			></path>
		</svg>
	)
}

Loader.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color: PropTypes.oneOf(['Accent', 'Black', 'White'])
}

export default Loader
