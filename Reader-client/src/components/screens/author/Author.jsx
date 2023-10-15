import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGetAuthorById } from '../../../hooks/author/useGetAuthorById'

import { setBookAuthorNumber } from '../../../utils/setBooksAuthorNumber.util'

import BookCard from '../../ui/book-card/BookCard'
import BookCardLoaderLoop from '../../ui/loaders/BookCardLoaderLoop/BookCardLoaderLoop'

import styles from './Author.module.scss'

import Layout from '../../layout/layout'

const Author = () => {
	/**
	 * @description This state determines the state of the component. In case of True, it displays an error window.
	 */
	const [errorQuery, setErrorQuery] = useState(false)

	const { pathname } = useLocation()
	const authorId = pathname.split('/')[2]

	const { data, isFetching } = useGetAuthorById(authorId)

	useEffect(() => {
		if (!isFetching && !data) {
			setErrorQuery(true)
		}
	}, [isFetching, data])

	const authorState = {
		loader: (
			<div>
				<h2 className={styles.authorNameLoader}>Loading...</h2>
				<span className={styles.booksQuantityLoader}></span>
			</div>
		),
		author: (
			<div>
				<h2>{errorQuery ? 'Author not found' : data?.name}</h2>
				<span>
					{errorQuery
						? '...'
						: `${setBookAuthorNumber(data?.books?.length)} books`}
				</span>
			</div>
		)
	}

	const authorBooksState = {
		error: <BookCard style='verticalLargeCard_Empty' />,
		books:
			data?.books?.length === 0 ? (
				<BookCard style='verticalLargeCard_Empty' />
			) : (
				data?.books?.map(book => (
					<BookCard data={book} style='verticalLargeCard' key={book?.id} />
				))
			)
	}

	return (
		<Layout>
			<section className={styles.wrapper}>
				{isFetching ? <>{authorState.loader}</> : authorState.author}
				<div>
					{isFetching ? (
						<BookCardLoaderLoop
							quantity={4}
							style={'verticalLargeCard_Loader'}
						/>
					) : errorQuery ? (
						authorBooksState.error
					) : (
						authorBooksState.books
					)}
				</div>
			</section>
		</Layout>
	)
}

export default Author
