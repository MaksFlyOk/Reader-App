import { useNavigate } from 'react-router-dom'

import { useBooksByRate } from '../../../../hooks/book/useBooksByRate'

import { getFilePath } from '../../../../utils/file/getFile.util.js'
import { setInitialTheAuthor } from '../../../../utils/setInitialTheAuthor.util'

import Loader from '../../../ui/loader/Loader'
import RatingPassive from '../../../ui/rating/passive/RatingPassive'

import styles from './TopBook.module.scss'

const TopBook = () => {
	const { data, isLoading } = useBooksByRate()

	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<h1>Top books</h1>
			{isLoading ? (
				<Loader height='20vw' />
			) : (
				<div className={styles.bookContainer}>
					{data?.map((book, index) =>
						index < 5 ? (
							<div key={book?.id} onClick={() => navigate(`/book/${book?.id}`)}>
								<div>
									<img src={getFilePath(book?.images)} draggable={false} />
								</div>
								<div>
									<div>
										<h2>{setInitialTheAuthor(book?.author?.name, 11)}</h2>
										<h1>{book?.name}</h1>
									</div>
									<RatingPassive
										sumRate={book?.sumRate}
										rateLength={book?.rate?.length}
									/>
								</div>
							</div>
						) : null
					)}
					<div onClick={() => navigate('/books')}>
						<h1>SEE ALL</h1>
					</div>
				</div>
			)}
		</div>
	)
}

export default TopBook
