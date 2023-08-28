import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'
import { useProfile } from '../../../hooks/user/useProfile'

import { dateRegister } from '../../../utils/dateRegister.util'
import { getFilePath } from '../../../utils/file/getFile.util'

import Button from '../../ui/button/Button'
import Loader from '../../ui/loader/Loader'
import ReadLaterPanel from '../../ui/read-later-panel/ReadLaterPanel'

import styles from './Profile.module.scss'

import { TOKEN } from '../../../app.constants'
import Layout from '../../layout/layout'

const Profile = () => {
	const { isAdmin, setIsAdmin, setIsAuth } = useContextStates()

	const navigate = useNavigate()

	const { data, isLoading, refetch } = useProfile()

	useEffect(() => {
		if (data?.isAdmin) {
			setIsAdmin(true)
		}
		refetch()
	})

	const logoutHandler = () => {
		Cookies.remove(TOKEN)
		setIsAuth(false)
		setIsAdmin(false)

		navigate('/')
	}

	return (
		<Layout>
			<div className={styles.wrapper}>
				{isLoading ? (
					<Loader width='20vw' />
				) : (
					<>
						<div className={styles.rightSection}>
							<div>
								<img
									src={
										data?.profileImage
											? getFilePath(data?.profileImage)
											: '/public/profile/Profile.jpg'
									}
									alt='Profile image'
									draggable={false}
								/>
							</div>
							<Button
								style='arrowButton'
								clickHandler={() => navigate('/profile/edit')}
							>
								Edit profile
							</Button>
						</div>
						<div className={styles.leftSection}>
							<h1>{data?.name}</h1>
							<h1>{data?.email}</h1>
							<h1>{dateRegister(data?.createdAt)}</h1>
							<div>
								<Button clickHandler={logoutHandler}>Logout</Button>
								{isAdmin ? (
									<Button clickHandler={() => navigate('/admin-panel')}>
										Admin panel
									</Button>
								) : null}
							</div>
							<ReadLaterPanel style='profile' />
						</div>
					</>
				)}
			</div>
		</Layout>
	)
}

export default Profile
