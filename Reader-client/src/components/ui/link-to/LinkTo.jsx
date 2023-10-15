import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import styles from './LinkTo.module.scss'

/**
 * Link to component. This component is just a link with text.
 * @component
 * @typedef PropType
 * @property {string} title - That's the headline.
 * @property {"linkLarge" | "linkLittleDark" | "linkLittleAccent"} style - Allows you to set the style for the link, "linkLarge" - large link with title and paragraph, "linkLittleDark" || "linkLittleAccent" - small link with title, can be two colors: dark("#2a2c2e") and accent("#cdb4db") respectively.
 * @property {string} paragraph - This is the main part of the text.
 * @property {string} img - The string is the path to the picture.
 * @property {string} linkNavigate - A string is a navigation path.
 *
 * @param {PropType} props
 * @returns JSX component LinkTo.
 */
const LinkTo = ({ title, style, paragraph, img, linkNavigate }) => {
	const navigate = useNavigate()

	const setStyleLinkTo = style => {
		switch (style) {
			case 'linkLarge':
				return (
					<section className={styles[style]}>
						<div>
							<h2>{title}</h2>
							<p>{paragraph}</p>
						</div>
						<div>
							<div>
								<img src={img} draggable={false} />
							</div>
							<button onClick={() => navigate(linkNavigate)}>
								<img
									src='/public/link-to/Link-to-arrow-dark.svg'
									alt='arrow'
									draggable={false}
								/>
							</button>
						</div>
					</section>
				)
			case 'linkLittleDark':
				return (
					<button
						className={styles[style]}
						onClick={() => navigate(linkNavigate)}
					>
						<h2>{title}</h2>
						<div>
							<img src={img} draggable={false} />
						</div>
					</button>
				)
			case 'linkLittleAccent':
				return (
					<button
						className={styles[style]}
						onClick={() => navigate(linkNavigate)}
					>
						<h2>{title}</h2>
						<div>
							<img src={img} draggable={false} />
						</div>
					</button>
				)
		}
	}

	return setStyleLinkTo(style)
}

LinkTo.propTypes = {
	title: PropTypes.string,
	style: PropTypes.oneOf(['linkLarge', 'linkLittleDark', 'linkLittleAccent']),
	paragraph: PropTypes.string,
	img: PropTypes.string,
	linkNavigate: PropTypes.string
}

export default LinkTo
