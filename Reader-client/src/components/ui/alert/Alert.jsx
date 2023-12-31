import cn from 'clsx'
import PropTypes from 'prop-types'

import styles from './Alert.module.scss'

/**
 * Alert component.
 * @component
 * @typedef PropType
 * @property {string} children - This is the alert text parameter, we throw it inside the tag.
 * @property {"error" | "info" | "warning"} type - If you don't pass a type parameter, the default will be success, there are also 3 other types: "error", "info", "warning".
 *
 * @param {PropType} props
 * @returns JSX component Alert.
 */
const Alert = ({ children, type }) => {
	return <div className={cn(styles.alert, styles[type])}>{children}</div>
}

Alert.propTypes = {
	children: PropTypes.string,
	type: PropTypes.oneOf(['error', 'info', 'warning'])
}

export default Alert
