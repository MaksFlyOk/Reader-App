import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import Button from '../../ui/button/Button'

import styles from './NotFound.module.scss'

const NotFound = () => {
	const { isAuth } = useContextStates()
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div>
				<h1>
					<span className={styles.typewriter}></span>
				</h1>
				<p>
					{`If you ended up here, you may have tried to go where you shouldn't
					have....`}
				</p>
				<Button clickHandler={() => navigate(isAuth ? '/profile' : '/')}>
					Retry
				</Button>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='54'
					height='54'
					viewBox='0 0 54 54'
					fill='none'
				>
					<path
						d='M5.60577 23.3942L2 27L23.3942 48.3942M5.60577 23.3942L27 2L30.3654 5.36538M5.60577 23.3942L23.6346 41.4231L27 38.0577M38.0577 27L30.3654 19.3077M38.0577 27L34.6923 30.3654M38.0577 27L41.4231 30.3654L23.3942 48.3942M27 15.9423L30.3654 12.5769L48.3942 30.6058M27 15.9423L19.3077 23.6346M27 15.9423L30.3654 19.3077M15.9423 27L12.3365 23.3942L30.3654 5.36538M15.9423 27L23.6346 34.6923M15.9423 27L19.3077 23.6346M30.3654 5.36538L52 27L48.3942 30.6058M48.3942 30.6058L27 52L23.3942 48.3942M27 38.0577L23.6346 34.6923M27 38.0577L34.6923 30.3654M23.6346 34.6923L27 31.3269M31.3269 27L27 22.6731M31.3269 27L27 31.3269M31.3269 27L34.6923 30.3654M27 22.6731L22.6731 27M27 22.6731L30.3654 19.3077M22.6731 27L27 31.3269M22.6731 27L19.3077 23.6346'
						stroke='#00000033'
						strokeWidth='2.5'
						strokeLinejoin='round'
					/>
				</svg>
			</div>
		</div>
	)
}

export default NotFound
