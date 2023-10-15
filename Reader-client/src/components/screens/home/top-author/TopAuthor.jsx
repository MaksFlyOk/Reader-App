import { useNavigate } from 'react-router-dom'

import { useGetAuthorByRate_TopAuthors } from '../../../../hooks/author/useGetAuthorByRate_Authors'

import { onKeyDownHandler_Enter } from '../../../../utils/onKeyDownHandler_Enter'

import AuthorCard from '../../../ui/author-card/AuthorCard'
import AuthorCardLoaderLoop from '../../../ui/loaders/AuthorCardLoaderLoop/AuthorCardLoaderLoop'

import styles from './TopAuthor.module.scss'

const TopAuthor = () => {
	const { data, isLoading } = useGetAuthorByRate_TopAuthors()

	const navigate = useNavigate()

	const setAuthorsList = authorsArrayLength => {
		if (authorsArrayLength === 0) {
			return <AuthorCard style='horizontalMiddleCard_Empty' />
		} else {
			return (
				<div className={styles.bookContainer}>
					{data?.map((author, index) =>
						index < 8 ? (
							<AuthorCard
								author={author}
								style='horizontalMiddleCard'
								key={author?.id}
							/>
						) : null
					)}
					<div
						onClick={() => navigate('/authors')}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, '/authors', navigate)
						}
						tabIndex={0}
					>
						<span>SEE ALL</span>
					</div>
				</div>
			)
		}
	}

	return (
		<div className={styles.wrapper}>
			<h1>Authors</h1>
			{isLoading ? (
				<div className={styles.bookContainer}>
					<AuthorCardLoaderLoop
						style='horizontalMiddleCard_Loader'
						quantity={7}
					/>
					<div
						onClick={() => navigate('/authors')}
						onKeyDown={event =>
							onKeyDownHandler_Enter(event, '/authors', navigate)
						}
						tabIndex={0}
					>
						<span>SEE ALL</span>
					</div>
				</div>
			) : (
				setAuthorsList(data?.length)
			)}
		</div>
	)
}

export default TopAuthor
