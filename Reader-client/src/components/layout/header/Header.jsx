import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../ui/button/Button'
import Logo from '../../ui/logo/Logo'
import styles from './Header.module.scss'
import Nav from './nav/Nav'
import { navigationElements } from './navigationElements'

const Header = () => {
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			<Logo />
			<Nav navArr={navigationElements}></Nav>
			<div className={styles.leftNavButtons}>
				<div>
					<button
						onClick={() => {
							navigate('/search')
						}}
					>
						<img src='/public/Header icon/Search button.svg' alt='Search' />
					</button>
					<button
						onClick={() => {
							navigate('/profile/read-later')
						}}
					>
						<img
							src='/public/Header icon/Read later button.svg'
							alt='Read later'
						/>
					</button>
				</div>
				<Button clickHandler={() => navigate(isAuth ? '/profile' : '/auth')}>
					{isAuth ? 'Profile' : 'Login'}
				</Button>
			</div>
		</header>
	)
}

export default Header
