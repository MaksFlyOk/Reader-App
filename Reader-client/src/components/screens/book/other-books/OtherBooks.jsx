import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useBooksByCategory } from '../../../../hooks/book/useBooksByCategory'

import { getFilePath } from '../../../../utils/file/getFile.util'
import { setInitialTheAuthor } from '../../../../utils/setInitialTheAuthor.util'

import Loader from '../../../ui/loader/Loader'

import styles from './OtherBooks.module.scss'

/**
 * Other books component. This component outputs other books, if the author has only one book, then the component outputs similar books by category, otherwise the rest of the author's books.
 * @component
 * @typedef PropType
 * @property {string[]} categories - It's an array of categories.
 * @property {object[]} books - This is an array of all of the author's books.
 * @property {number} bookId - This is the id of the book.
 * @property {number} authorId - This is the id of the author.
 * @property {boolean} boolean - These values determine which type of component to render: "Related books" or "Other books author".
 *
 * @param {PropType} props
 * @returns JSX component OtherBooks.
 */
const OtherBooks = ({ categories, books, bookId, authorId, boolean }) => {
	const { data, isLoading } = useBooksByCategory(categories, boolean)
	const navigate = useNavigate()

	return boolean ? (
		<div className={styles.wrapperRelated}>
			<h1>Related</h1>
			{isLoading ? (
				<Loader height='12vw' />
			) : (
				<div>
					{data?.map((book, index) =>
						index < 7 && book?.id !== bookId ? (
							<div
								key={book?.id}
								onClick={() => navigate(`/book/${book?.id}`)}
								className={styles.book}
							>
								<div>
									<img src={getFilePath(book?.images)} draggable={false} />
								</div>
								<div>
									<h2>{setInitialTheAuthor(book?.author?.name, 8)}</h2>
									<h1>{book?.name}</h1>
								</div>
							</div>
						) : null
					)}
				</div>
			)}
		</div>
	) : (
		<div className={styles.wrapperOtherBooksByAuthor}>
			<h1>Other books by this author</h1>
			<div>
				{books?.map((book, index) =>
					index < 6 && book?.id !== Number(bookId) ? (
						<div
							key={book?.id}
							onClick={() => navigate(`/book/${book?.id}`)}
							className={styles.book}
						>
							<div>
								<img src={getFilePath(book?.images)} draggable={false} />
							</div>
							<div>
								<h2>{setInitialTheAuthor(book?.author?.name, 8)}</h2>
								<h1>{book?.name}</h1>
							</div>
						</div>
					) : null
				)}
				<div onClick={() => navigate(`/author/${authorId}`)}>
					<h1>SEE ALL</h1>
				</div>
			</div>
		</div>
	)
}

OtherBooks.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string),
	books: PropTypes.arrayOf(PropTypes.object),
	bookId: PropTypes.number,
	authorId: PropTypes.number,
	boolean: PropTypes.bool
}

export default OtherBooks
