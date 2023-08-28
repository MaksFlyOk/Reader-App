import styles from './AboutUs.module.scss'

import Layout from '../../layout/layout'

const AboutUs = () => {
	return (
		<Layout>
			<div className={styles.wrapper}>
				<div>
					<div>
						<h1>About us</h1>
						<p>
							There is no us, this app was written by one person. Hi by the way,
							I have about 6 months of training under my belt, this project is
							being written to practice React. Oops, my GitHub is down there,
							unless of course you are on it now....
						</p>
					</div>
					<a
						href='https://github.com/MaksFlyOk/Reader-App'
						target='_blank'
						rel='noopener noreferrer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='22'
							height='22'
							viewBox='0 0 22 22'
							fill='none'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M10.9664 0C4.91131 0 0 5.04826 0 11.2721C0 16.2512 3.16208 20.4697 7.46789 21.9911C8.00612 22.0602 8.20795 21.7144 8.20795 21.4378C8.20795 21.1612 8.20795 20.4697 8.20795 19.5015C5.18043 20.193 4.50764 17.9801 4.50764 17.9801C4.0367 16.6662 3.29664 16.3204 3.29664 16.3204C2.28746 15.6289 3.36391 15.6289 3.36391 15.6289C4.44037 15.698 5.04587 16.8045 5.04587 16.8045C6.05505 18.5333 7.60245 18.0493 8.20795 17.7726C8.27523 17.0119 8.61162 16.5279 8.88073 16.2513C6.45872 15.9746 3.90214 15.0065 3.90214 10.6498C3.90214 9.40498 4.30581 8.43682 5.04587 7.60697C4.97859 7.39951 4.57492 6.22388 5.18043 4.70249C5.18043 4.70249 6.12232 4.42587 8.20795 5.87811C9.08257 5.60149 10.0245 5.53234 10.9664 5.53234C11.9083 5.53234 12.8502 5.67065 13.7248 5.87811C15.8104 4.42587 16.7523 4.70249 16.7523 4.70249C17.3578 6.22388 16.9541 7.39951 16.8868 7.67612C17.5596 8.43682 18.0306 9.47413 18.0306 10.7189C18.0306 15.0756 15.474 15.9746 13.052 16.2513C13.4557 16.597 13.792 17.2886 13.792 18.3259C13.792 19.8473 13.792 21.0229 13.792 21.4378C13.792 21.7144 13.9939 22.0602 14.5321 21.9911C18.9052 20.4697 22 16.2512 22 11.2721C21.9327 5.04826 17.0214 0 10.9664 0Z'
								fill='black'
								fillOpacity='0.87'
							/>
						</svg>
						GitHub
					</a>
				</div>
			</div>
		</Layout>
	)
}

export default AboutUs
