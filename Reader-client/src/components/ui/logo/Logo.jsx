import { useNavigate } from 'react-router-dom'

import styles from './Logo.module.scss'

/**
 * Logo component. This is the Logo component, when you click on it you will be redirected to Home("/").
 * @component
 * @returns JSX component Logo.
 */
const Logo = () => {
	const navigate = useNavigate()

	return (
		<button
			className={styles.logo}
			onClick={() => {
				navigate('/')
			}}
		>
			<img src='/public/Icon.svg' alt='Logo' draggable={false} />
			<span>Redeem</span>
		</button>
	)
}

export default Logo
