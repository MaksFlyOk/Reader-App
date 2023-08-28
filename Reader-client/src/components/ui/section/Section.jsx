import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useLastCreatedBook } from '../../../hooks/book/useLastCreatedBook'

import { getFilePath } from '../../../utils/file/getFile.util'
import { setDescriptionLength } from '../../../utils/setDescriptionLength.util'
import { setInitialTheAuthor } from '../../../utils/setInitialTheAuthor.util'

import styles from './Section.module.scss'

import Button from '../button/Button'
import Loader from '../loader/Loader'

/**
 * Section component. This is a component in which you can place any information and link to it.
 * @component
 * @typedef PropType
 * @property {string} style - These are variations of the component style: "lastBook" is a variation for the last book added, "hero" is a variation for posting information with a themed icon.
 * @property {string} heroImage - The property required for the style variant is "hero", throw in the icon.
 * @property {string} heroTitle -The property required for the style option is "hero", throw in the header.
 * @property {string} heroDescription - The property required for the style variant is "hero", throw in the description.
 *
 * @param {PropType} props
 * @returns JSX component Section.
 */
const Section = ({
	style = 'lastBook',
	heroImage,
	heroTitle,
	heroDescription
}) => {
	const { data, isLoading } = useLastCreatedBook()
	const navigate = useNavigate()

	return (
		<section className={styles.wrapper}>
			{style === 'lastBook' ? (
				<>
					{isLoading ? (
						<Loader width='20vw' />
					) : (
						<div className={styles[style]}>
							<div>
								<div>
									<h1>{data?.name}</h1>
									<h2>{setInitialTheAuthor(data?.author?.name, 11)}</h2>
									<span>{setDescriptionLength(data?.description, 50)}</span>
								</div>
								<Button
									style='borderButton'
									clickHandler={() => {
										navigate(`/book/${data?.id}`)
									}}
								>
									Browse now
								</Button>
							</div>
							<div>
								<div>
									<img
										src={getFilePath(data?.images)}
										alt='Last Book'
										draggable={false}
									/>
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<div className={styles[style]}>
					<div>
						<div>
							<h1>{heroTitle}</h1>
							<span>{heroDescription}</span>
						</div>
						<Button
							style='borderButton'
							clickHandler={() => {
								navigate(`/search`)
							}}
						>
							Browse now
						</Button>
					</div>
					<div>
						<img src={heroImage} alt='Search' draggable={false} />
					</div>
				</div>
			)}
		</section>
	)
}

Section.propTypes = {
	style: PropTypes.oneOf(['lastBook', 'hero']),
	heroImage: PropTypes.string,
	heroTitle: PropTypes.string,
	heroDescription: PropTypes.string
}

export default Section
