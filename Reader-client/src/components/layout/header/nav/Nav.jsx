import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Nav.module.scss'

/**
 * Navigation component.
 * @component
 * @typedef PropType
 * @property {array.<{title: string, link: string}>} navArr - This is an array of navigation elements.
 *
 * @param {PropType} props
 * @returns JSX component Nav.
 */
const Nav = ({ navArr }) => {
	return (
		<nav className={styles.nav}>
			{navArr.map((item, index) => (
				<Link to={item.link} key={`nav_link_${index}`}>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

Nav.propTypes = {
	navArr: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			link: PropTypes.string
		})
	)
}

export default Nav
