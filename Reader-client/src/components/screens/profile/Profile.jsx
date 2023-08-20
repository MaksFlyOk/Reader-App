import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN } from '../../../app.constants'
import { useAdmin } from '../../../hooks/useAdmin'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { dateRegister } from '../../../utils/dateRegister.util'
import { getImage } from '../../../utils/getImage.util'
import Layout from '../../layout/layout'
import Button from '../../ui/button/Button'
import Loader from '../../ui/loader/Loader'
import ReadLaterPanel from '../../ui/read-later-panel/ReadLaterPanel'
import styles from './Profile.module.scss'

const Profile = () => {
	const { setIsAuth } = useAuth()
	const { isAdmin, setIsAdmin } = useAdmin()

	const navigate = useNavigate()

	const { data, isLoading } = useProfile()

	useEffect(() => {
		if (data?.isAdmin) {
			setIsAdmin(true)
		}
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
											? getImage(data?.profileImage)
											: '/public/Profile.jpg'
									}
									alt='Profile image'
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
							<ReadLaterPanel data={data?.readLater}></ReadLaterPanel>
						</div>
					</>
				)}
			</div>
		</Layout>
	)
}

export default Profile
