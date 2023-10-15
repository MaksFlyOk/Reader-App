import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { getFilePath } from '../../../utils/file/getFile.util'
import { onKeyDownHandler_Enter } from '../../../utils/onKeyDownHandler_Enter'
import { setInitialTheAuthor } from '../../../utils/setInitialTheAuthor.util'

import styles from './BookCard.module.scss'

import RatingPassive from '../rating/passive/RatingPassive'
import ReadLaterButton from '../read-later-button/ReadLaterButton'

/**
 * This is the component for the book card.
 * @component
 * @typedef PropType
 * @property {"horizontalMiddleCard" | "horizontalMiddleCard_Empty" | "horizontalMiddleCard_Loader" | "verticalMiddleCard" | "verticalMiddleCard_Empty" | "verticalMiddleCard_Loader" | "verticalLargeCard" | "verticalLargeCard_Empty" | "verticalLargeCard_Loader" | "horizontalLittleCardTag_Li" | "horizontalLittleCardTag_Li_Empty" | "horizontalLittleCardTag_Li_Loader" | "horizontalLargeCardTag_Li" | "horizontalLargeCardTag_Li_Empty" | "horizontalLargeCardTag_Li_Loader"} style - Here we set one of the styles for the book card.
 * @property {{id: number, name: string, images: string, author: {id: number, name: string}, sumRate: number, rate: array<{id: number, bookId: number, userId: number, rating: number}>}} data - It's an object with book data.
 * @property {function} functionOptionally - This is an optional feature that can be thrown into cards with styles: "horizontalLittleCardTag_Li", "horizontalLargeCardTag_Li".
 * @property {number} indexOptionally - This is an optional index that can be thrown into cards with styles: "horizontalLittleCardTag_Li", "horizontalLargeCardTag_Li".
 * @property {boolean} stateOptionally - This is an optional state that can be thrown into cards with styles: "horizontalLittleCardTag_Li", "horizontalLargeCardTag_Li".
 *
 * @param {PropType} props
 * @returns JSX component BookCard.
 */
const BookCard = ({
	style,
	data,
	functionOptionally,
	indexOptionally,
	stateOptionally
}) => {
	const navigate = useNavigate()

	const switchStyles = (style, data, functionOptionally, indexOptionally) => {
		switch (style) {
			case 'horizontalMiddleCard':
				return (
					<div
						onClick={() => navigate(`/book/${data?.id}`)}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, `/book/${data?.id}`, navigate)
						}
						className={styles[style]}
						tabIndex={0}
					>
						<div>
							<img
								src={
									data?.images
										? getFilePath(data?.images)
										: '/public/read-later/Book.jpg'
								}
								draggable={false}
							/>
						</div>
						<div>
							<div>
								<h2>{setInitialTheAuthor(data?.author?.name, 11)}</h2>
								<h1>{data?.name}</h1>
							</div>
							<RatingPassive
								sumRate={data?.sumRate}
								rateLength={data?.rate?.length}
							/>
						</div>
					</div>
				)
			case 'horizontalMiddleCard_Empty':
				return (
					<div className={styles[style]}>
						<div>
							<img src='/public/read-later/Book.jpg' draggable={false} />
						</div>
						<div>
							<div>
								<h1>There seems to be something missing here</h1>
							</div>
						</div>
					</div>
				)
			case 'horizontalMiddleCard_Loader':
				return (
					<div className={styles[style]}>
						<div></div>
						<div>
							<div>
								<h2>Loading...</h2>
								<h1>Loading...</h1>
							</div>
							<h1>Loading...</h1>
						</div>
					</div>
				)

			case 'verticalMiddleCard':
				return (
					<div
						onClick={() => navigate(`/book/${data?.id}`)}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, `/book/${data?.id}`, navigate)
						}
						className={styles[style]}
						tabIndex={0}
					>
						<div>
							<img src={getFilePath(data?.images)} draggable={false} />
						</div>
						<div>
							<h2>{setInitialTheAuthor(data?.author?.name, 8)}</h2>
							<h1>{data?.name}</h1>
						</div>
					</div>
				)
			case 'verticalMiddleCard_Empty':
				return (
					<div className={styles[style]}>
						<div>
							<img src='/public/read-later/Book.jpg' draggable={false} />
						</div>
						<div>
							<h1>There seems to be something missing here</h1>
						</div>
					</div>
				)
			case 'verticalMiddleCard_Loader':
				return (
					<div className={styles[style]}>
						<div></div>
						<div>
							<h2>Loading...</h2>
							<h1>Loading...</h1>
						</div>
					</div>
				)

			case 'verticalLargeCard':
				return (
					<div
						onClick={() => navigate(`/book/${data?.id}`)}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, `/book/${data?.id}`, navigate)
						}
						className={styles[style]}
						tabIndex={0}
					>
						<div>
							<img src={getFilePath(data?.images)} draggable={false} />
						</div>
						<div>
							<h2>{data?.name}</h2>
							<RatingPassive
								sumRate={data?.sumRate}
								rateLength={data?.rate?.length}
								style='passive'
							/>
						</div>
					</div>
				)
			case 'verticalLargeCard_Empty':
				return (
					<div className={styles[style]}>
						<div>
							<img src='/public/read-later/Book.jpg' draggable={false} />
						</div>
						<div>
							<h2>There seems to be something missing here</h2>
						</div>
					</div>
				)
			case 'verticalLargeCard_Loader':
				return (
					<div className={styles[style]}>
						<div></div>
						<div>
							<h2>Loading...</h2>
							<h2>Loading...</h2>
						</div>
					</div>
				)

			case 'horizontalLittleCardTag_Li':
				return (
					<li className={styles[style]}>
						<div>
							<span
								onClick={() => navigate(`/book/${data[indexOptionally]?.id}`)}
								onKeyDown={event =>
									onKeyDownHandler_Enter(
										event,
										`/book/${data[indexOptionally]?.id}`,
										navigate
									)
								}
								tabIndex={0}
							>
								{data[indexOptionally]?.name}
							</span>
							<span
								onClick={() =>
									navigate(`/author/${data[indexOptionally]?.author?.id}`)
								}
								onKeyDown={event =>
									onKeyDownHandler_Enter(
										event,
										`/author/${data[indexOptionally]?.author?.id}`,
										navigate
									)
								}
								tabIndex={0}
							>
								{data[indexOptionally]?.author?.name}
							</span>
						</div>
						<ReadLaterButton
							type='onlyDeleteReadLaterButton'
							functionOptionally={() =>
								functionOptionally(data[indexOptionally]?.id)
							}
						/>
					</li>
				)
			case 'horizontalLittleCardTag_Li_Empty':
				return (
					<li
						className={styles[style]}
						key={'empty_list'}
						style={stateOptionally ? { display: 'flex' } : { display: 'none' }}
					>
						<div>
							<span>{`There aren't any books here`}</span>
						</div>
						<ReadLaterButton
							type='onlyDeleteReadLaterButton'
							functionOptionally={functionOptionally}
						/>
					</li>
				)
			case 'horizontalLittleCardTag_Li_Loader':
				return (
					<li className={styles[style]}>
						<div>
							<span>Loading...</span>
							<span>Loading...</span>
						</div>
						<span></span>
					</li>
				)

			case 'horizontalLargeCardTag_Li':
				return (
					<li className={styles[style]}>
						<div>
							<div>
								<img
									src={getFilePath(data[indexOptionally]?.images)}
									alt='book image'
								/>
							</div>
							<div>
								<span
									onClick={() => navigate(`/book/${data[indexOptionally]?.id}`)}
									onKeyDown={event =>
										onKeyDownHandler_Enter(
											event,
											`/book/${data[indexOptionally]?.id}`,
											navigate
										)
									}
									tabIndex={0}
								>
									{data[indexOptionally]?.name}
								</span>
								<span
									onClick={() =>
										navigate(`/author/${data[indexOptionally]?.author?.id}`)
									}
									onKeyDown={event =>
										onKeyDownHandler_Enter(
											event,
											`/author/${data[indexOptionally]?.author?.id}`,
											navigate
										)
									}
									tabIndex={0}
								>
									{setInitialTheAuthor(data[indexOptionally]?.author?.name, 20)}
								</span>
								<div>
									<span>Genre</span>
									<span>{data[indexOptionally]?.genre?.genre}</span>
								</div>
								<RatingPassive
									sumRate={data[indexOptionally]?.sumRate}
									rateLength={data[indexOptionally]?.rate?.length}
								/>
							</div>
						</div>
						<ReadLaterButton
							type='onlyDeleteReadLaterButton'
							functionOptionally={() =>
								functionOptionally(data[indexOptionally]?.id)
							}
						/>
					</li>
				)
			case 'horizontalLargeCardTag_Li_Empty':
				return (
					<li
						className={styles[style]}
						style={stateOptionally ? { display: 'block' } : { display: 'none' }}
						key={'empty_list'}
					>
						<div>
							<div>
								<img src='/public/read-later/Book.jpg' alt='book image' />
							</div>
							<div>
								<span>{`There aren’t any books  here`} </span>
							</div>
						</div>
						<ReadLaterButton
							type='onlyDeleteReadLaterButton'
							functionOptionally={functionOptionally}
						/>
					</li>
				)
			case 'horizontalLargeCardTag_Li_Loader':
				return (
					<li className={styles[style]}>
						<div>
							<div></div>
							<div>
								<span>Loading...</span>
								<span>Loading...</span>
								<div>
									<span>Loading...</span>
									<span>Loading...</span>
								</div>
								<span>Loading...</span>
							</div>
						</div>
					</li>
				)
		}
	}

	return switchStyles(style, data, functionOptionally, indexOptionally)
}

BookCard.propTypes = {
	style: PropTypes.oneOf([
		'horizontalMiddleCard',
		'horizontalMiddleCard_Empty',
		'horizontalMiddleCard_Loader',

		'verticalMiddleCard',
		'verticalMiddleCard_Empty',
		'verticalMiddleCard_Loader',

		'verticalLargeCard',
		'verticalLargeCard_Empty',
		'verticalLargeCard_Loader',

		'horizontalLittleCardTag_Li',
		'horizontalLittleCardTag_Li_Empty',
		'horizontalLittleCardTag_Li_Loader',

		'horizontalLargeCardTag_Li',
		'horizontalLargeCardTag_Li_Empty',
		'horizontalLargeCardTag_Li_Loader'
	]),
	data: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				images: PropTypes.string,
				author: PropTypes.shape({
					id: PropTypes.number,
					name: PropTypes.string
				}),
				sumRate: PropTypes.number,
				rate: PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.number,
						bookId: PropTypes.number,
						userId: PropTypes.number,
						rating: PropTypes.number
					})
				)
			})
		)
	]),
	functionOptionally: PropTypes.func,
	indexOptionally: PropTypes.number,
	stateOptionally: PropTypes.bool
}

export default BookCard
