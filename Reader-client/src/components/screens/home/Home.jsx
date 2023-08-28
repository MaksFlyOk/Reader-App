import LinkTo from '../../ui/link-to/LinkTo'
import RunningLine from '../../ui/running-line/RunningLine'
import Section from '../../ui/section/Section'

import styles from './Home.module.scss'

import Layout from '../../layout/layout'

import TopBook from './top-book/TopBook'

const Home = () => {
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
				title='Do you like being here?'
				paragraph='If you want to know what is going on here, go further and everything will fall into place.'
				img='/public/link-to/Question-mark.svg'
				linkNavigate='/about-us'
			/>
		</Layout>
	)
}

export default Home
