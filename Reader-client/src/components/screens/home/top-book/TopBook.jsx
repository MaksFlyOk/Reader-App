import { useNavigate } from 'react-router-dom'

import { useGetBooksByRate_TopBooks } from '../../../../hooks/book/useGetBooksByRate_TopBook'

import { onKeyDownHandler_Enter } from '../../../../utils/onKeyDownHandler_Enter'

import BookCard from '../../../ui/book-card/BookCard'
import BookCardLoaderLoop from '../../../ui/loaders/BookCardLoaderLoop/BookCardLoaderLoop'

import styles from './TopBook.module.scss'

const TopBook = () => {
	const { data, isLoading } = useGetBooksByRate_TopBooks()

	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<h1>Top books</h1>
			{isLoading ? (
				<div className={styles.bookContainer}>
					<BookCardLoaderLoop
						style='horizontalMiddleCard_Loader'
						quantity={5}
					/>
					<div
						onClick={() => navigate('/books')}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, '/books', navigate)
						}
						tabIndex={0}
					>
						<span>SEE ALL</span>
					</div>
				</div>
			) : data?.length === 0 ? (
				<div className={styles.bookContainer}>
					<BookCard style='horizontalMiddleCard_Empty' />
				</div>
			) : (
				<div className={styles.bookContainer}>
					{data?.map((book, index) =>
						index < 5 ? (
							<BookCard
								style='horizontalMiddleCard'
								data={book}
								key={book?.id}
							/>
						) : null
					)}
					<div
						onClick={() => navigate('/books')}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, '/books', navigate)
						}
						tabIndex={0}
					>
						<span>SEE ALL</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default TopBook
