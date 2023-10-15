import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useGetBooksByCategory } from '../../../../hooks/book/useGetBooksByCategory'

import { onKeyDownHandler_Enter } from '../../../../utils/onKeyDownHandler_Enter'

import BookCard from '../../../ui/book-card/BookCard'
import BookCardLoaderLoop from '../../../ui/loaders/BookCardLoaderLoop/BookCardLoaderLoop'

import styles from './OtherBooks.module.scss'

/**
 * Other books component. This component outputs other books, if the author has only one book, then the component outputs similar books by category, otherwise the rest of the author's books.
 * @component
 * @typedef PropType
 * @property {array<{id: number, category: string}>} categories - It's an array of categories.
 * @property {array<{id: number, name: string, images: string, author: {id: number, name: string}}>} books - This is an array of all of the author's books.
 * @property {number} bookId - This is the id of the book.
 * @property {number} authorId - This is the id of the author.
 * @property {boolean} related - These values determine which type of component to render: "Related books" or "Other books author".
 * @property {boolean} loading - This boolean value is responsible for displaying the component.
 *
 * @param {PropType} props
 * @returns JSX component OtherBooks.
 */
const OtherBooks = ({
	categories,
	books,
	bookId,
	authorId,
	related,
	loading = false
}) => {
	const { data, isFetching } = useGetBooksByCategory(categories, related)
	const navigate = useNavigate()

	const setStateRelatedBooks = relatedBooksLength => {
		switch (relatedBooksLength) {
			case 1:
				return (
					<div>
						<BookCard style='verticalMiddleCard_Empty' />
					</div>
				)
			default:
				return (
					<div>
						{data?.map((book, index) =>
							index < 7 && book?.id !== bookId ? (
								<BookCard
									style='verticalMiddleCard'
									data={book}
									key={book?.id}
								/>
							) : null
						)}
					</div>
				)
		}
	}

	return loading ? (
		<div className={styles.wrapperRelated_Loader}>
			<h1>Loading...</h1>
			<div>
				<BookCardLoaderLoop quantity={6} style='verticalMiddleCard_Loader' />
			</div>
		</div>
	) : related ? (
		<div className={styles.wrapperRelated}>
			<h1>Related</h1>
			{isFetching ? (
				<div>
					<BookCardLoaderLoop quantity={6} style='verticalMiddleCard_Loader' />
				</div>
			) : (
				setStateRelatedBooks(data?.length)
			)}
		</div>
	) : (
		<div className={styles.wrapperOtherBooksByAuthor}>
			<h1>Other books by this author</h1>
			<div>
				{books?.map((book, index) =>
					index < 6 && book?.id !== Number(bookId) ? (
						<BookCard style='verticalMiddleCard' data={book} key={book?.id} />
					) : null
				)}
				<div
					onClick={() => navigate(`/author/${authorId}`)}
					tabIndex={0}
					onKeyDown={event =>
						onKeyDownHandler_Enter(event, `/author/${authorId}`, navigate)
					}
				>
					<h1>SEE ALL</h1>
				</div>
			</div>
		</div>
	)
}

OtherBooks.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			category: PropTypes.string
		})
	),
	books: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			images: PropTypes.string,
			author: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
		})
	),
	bookId: PropTypes.number,
	authorId: PropTypes.number,
	related: PropTypes.bool,
	loading: PropTypes.bool
}

export default OtherBooks
