import { Link } from 'react-router-dom'
import Logo from '../../ui/logo/Logo'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.wrapper}>
			<Logo />
			<div>
				<Link to='/about-us'>About us</Link>
				<a
					href='https://github.com/MaksFlyOk?tab=repositories'
					target='_blank'
					rel='noopener noreferrer'
				>
					support@redeem.com
				</a>
			</div>
		</footer>
	)
}

export default Footer
