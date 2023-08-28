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
 * @returns JSX component layout.
 */
const Layout = ({ children }) => {
	return (
		<section className={styles.wrapper}>
			<Header />
			{children}
			<Footer />
		</section>
	)
}

Layout.propTypes = {
	children: PropTypes.any
}

export default Layout
