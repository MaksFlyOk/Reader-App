import PropTypes from 'prop-types'

import styles from './Layout.module.scss'

import Footer from './footer/Footer'
import Header from './header/header'

/**
 * Layout component.
 * @component
 * @typedef PropType
 * @property {html} children - It should be html markup.
 *
 * @param {PropType} props
 * @returns JSX component Layout.
 */
const Layout = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default Layout
