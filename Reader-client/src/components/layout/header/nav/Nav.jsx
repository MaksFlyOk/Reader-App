import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'

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

export default Nav
