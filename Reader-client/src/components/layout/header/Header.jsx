import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import Button from '../../ui/button/Button'
import Logo from '../../ui/logo/Logo'

import styles from './Header.module.scss'

import Nav from './nav/Nav'
import { navigationElements } from './navigationElements'

const Header = () => {
	const navigate = useNavigate()

	const { isAuth } = useContextStates()

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
						<img src='/public/header-icon/Search-button.svg' alt='Search' />
					</button>
					<button
						onClick={() => {
							navigate(isAuth ? '/profile/read-later' : '/auth')
						}}
					>
						<img
							src='/public/header-icon/Read-later-button.svg'
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
