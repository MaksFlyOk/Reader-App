import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { getFilePath } from '../../../utils/file/getFile.util'
import { onKeyDownHandler_Enter } from '../../../utils/onKeyDownHandler_Enter'
import { setBookAuthorNumber } from '../../../utils/setBooksAuthorNumber.util'
import { setInitialTheAuthor } from '../../../utils/setInitialTheAuthor.util'

import styles from './AuthorCard.module.scss'

/**
 * This is the card component for the author.
 * @component
 * @typedef PropType
 * @property {{id: number, name: string, images: string, _count: {books: number}}} author - It's an object with author data.
 * @property {"horizontalMiddleCard" | "horizontalMiddleCard_Empty" | "horizontalMiddleCard_Loader" | "verticalLargeCard" | "verticalLargeCard_Empty" | "verticalLargeCard_Loader"} style - Here we set one of the styles for the author card.
 *
 * @param {PropType} props
 * @returns JSX component AuthorCard.
 */
const AuthorCard = ({ author, style }) => {
	const navigate = useNavigate()

	const switchStyles = (style, author) => {
		switch (style) {
			case 'horizontalMiddleCard':
				return (
					<div className={styles[style]}>
						<div>
							<img
								src={
									author?.images
										? getFilePath(author?.images)
										: '/public/author/Author-image.jpg'
								}
								alt='Author image'
								draggable={false}
							/>
						</div>
						<div>
							<div>
								<span>{setBookAuthorNumber(author?._count?.books)}</span>
								<h1>{author?.name}</h1>
							</div>
							<div>
								<div
									onClick={() => navigate(`/author/${author?.id}`)}
									onKeyDown={event =>
										onKeyDownHandler_Enter(
											event,
											`/author/${author?.id}`,
											navigate
										)
									}
									tabIndex={0}
								>
									<img
										src='/public/author/arrow.svg'
										alt='arrow'
										draggable={false}
									/>
								</div>
							</div>
						</div>
					</div>
				)
			case 'horizontalMiddleCard_Empty':
				return (
					<div className={styles[style]}>
						<div>
							<img
								src='/public/author/Author-image.jpg'
								alt='Author image'
								draggable={false}
							/>
						</div>
						<div>
							<h1>There seems to be something missing here</h1>
						</div>
					</div>
				)
			case 'horizontalMiddleCard_Loader':
				return (
					<div className={styles[style]}>
						<div></div>
						<div>
							<div>
								<span>Loading...</span>
								<h1>Loading...</h1>
							</div>
							<div>
								<div>
									<img
										src='/public/author/arrow.svg'
										alt='arrow'
										draggable={false}
									/>
								</div>
							</div>
						</div>
					</div>
				)

			case 'verticalLargeCard':
				return (
					<div
						className={styles[style]}
						onClick={() => navigate(`/author/${author?.id}`)}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, `/author/${author?.id}`, navigate)
						}
						tabIndex={0}
					>
						<div>
							<img
								src={
									author?.images
										? getFilePath(author?.images)
										: '/public/author/Author-image.jpg'
								}
								alt='Author image'
								draggable={false}
							/>
						</div>
						<div>
							<span>{setBookAuthorNumber(author?._count?.books)} books</span>
							<h2>{setInitialTheAuthor(author?.name, 24)}</h2>
						</div>
					</div>
				)
			case 'verticalLargeCard_Empty':
				return (
					<div className={styles[style]}>
						<div>
							<img
								src='/public/author/Author-image.jpg'
								alt='Author image'
								draggable={false}
							/>
						</div>

						<h2>There seems to be something missing here</h2>
					</div>
				)
			case 'verticalLargeCard_Loader':
				return (
					<div className={styles[style]}>
						<div></div>
						<div>
							<span>Loading...</span>
							<h2>Loading...</h2>
						</div>
					</div>
				)
		}
	}

	return switchStyles(style, author)
}

AuthorCard.propTypes = {
	author: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		images: PropTypes.string,
		_count: PropTypes.shape({
			books: PropTypes.number
		})
	}),
	style: PropTypes.oneOf([
		'horizontalMiddleCard',
		'horizontalMiddleCard_Empty',
		'horizontalMiddleCard_Loader',

		'verticalLargeCard',
		'verticalLargeCard_Empty',
		'verticalLargeCard_Loader'
	])
}

export default AuthorCard
