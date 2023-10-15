import { useContextStates } from '../../../hooks/useContextStates'

import LinkTo from '../../ui/link-to/LinkTo'
import RunningLine from '../../ui/running-line/RunningLine'
import Section from '../../ui/section/Section'

import styles from './Home.module.scss'

import Layout from '../../layout/layout'

import TopAuthor from './top-author/TopAuthor'
import TopBook from './top-book/TopBook'

const Home = () => {
	const { isAuth } = useContextStates()

	return (
		<Layout>
			<RunningLine></RunningLine>
			<div className={styles.infoSection}>
				<Section style='lastBook' />
				<Section
					style='hero'
					heroImage='/public/section/Search-vector.svg'
					heroTitle='FIND SOMETHING TO READ'
					heroDescription='Fancy something unusual and unpredictable? Funny or exciting? No problem. Check out the collections we have prepared for you.'
				/>
			</div>
			<TopBook />
			<LinkTo
				style='linkLarge'
				title='Do you like being here?'
				paragraph='If you want to know what is going on here, go further and everything will fall into place.'
				img='/public/link-to/Question-mark.svg'
				linkNavigate='/about-us'
			/>
			<TopAuthor />
			<div className={styles.links}>
				<LinkTo
					style='linkLittleDark'
					title='Find something for yourself'
					img='/public/link-to/Logo-dark-little-link.svg'
					linkNavigate='/search'
				/>
				<LinkTo
					style='linkLittleAccent'
					title={isAuth ? 'Profile' : 'Join us'}
					img='/public/link-to/Arrow-accent-little-link.svg'
					linkNavigate={isAuth ? '/profile' : '/auth'}
				/>
			</div>
		</Layout>
	)
}

export default Home
