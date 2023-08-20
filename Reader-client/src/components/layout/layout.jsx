import Footer from './footer/Footer'
import Header from './header/header'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
	return (
		<section className={styles.wrapper}>
			<Header />
			{children}
			<Footer />
		</section>
	)
}

export default Layout
