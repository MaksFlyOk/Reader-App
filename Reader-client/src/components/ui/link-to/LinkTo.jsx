import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import styles from './LinkTo.module.scss'

/**
 * Link to component. This component is just a link with text.
 * @component
 * @typedef PropType
 * @property {string} title - That's the headline.
 * @property {string} paragraph - This is the main part of the text.
 * @property {string} img - The string is the path to the picture.
 * @property {string} linkNavigate - A string is a navigation path.
 *
 * @param {PropType} props
 * @returns JSX component LinkTo.
 */
const LinkTo = ({ title, paragraph, img, linkNavigate }) => {
	const navigate = useNavigate()

	return (
		<section className={styles.wrapper}>
			<div>
				<h1>{title}</h1>
				<p>{paragraph}</p>
			</div>
			<div>
				<div>
					<img src={img} draggable={false} />
				</div>
				<div onClick={() => navigate(linkNavigate)}>
					<img
						src='/public/link-to/Link-to-arrow-dark.svg'
						alt='arrow'
						draggable={false}
					/>
				</div>
			</div>
		</section>
	)
}

LinkTo.propTypes = {
	title: PropTypes.string,
	paragraph: PropTypes.string,
	img: PropTypes.string,
	linkNavigate: PropTypes.string
}

export default LinkTo
