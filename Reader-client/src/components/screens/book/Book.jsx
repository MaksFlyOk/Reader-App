import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import { getFilePath } from '../../../utils/file/getFile.util'
import { onKeyDownHandler_Enter } from '../../../utils/onKeyDownHandler_Enter'

import LinkTo from '../../ui/link-to/LinkTo'
import RatingActive from '../../ui/rating/active/RatingActive'
import RatingPassive from '../../ui/rating/passive/RatingPassive'
import ReadLaterButton from '../../ui/read-later-button/ReadLaterButton'

import styles from './Book.module.scss'

import { $axios } from '../../../api.js'
import Layout from '../../layout/layout'

import BookInfo from './book-info/BookInfo'
import ChaptersOrText from './chapters-or-text/ChaptersOrText'
import OtherBooks from './other-books/OtherBooks'

const Book = () => {
	/**
	 * @description This state determines the data displayed on the page.
	 */
	const [data, setData] = useState(null)
	/**
	 * @description This state determines the state of the component. In case of True, it displays an error window.
	 */
	const [errorQuery, setErrorQuery] = useState(false)

	const { isAuth } = useContextStates()

	const { pathname } = useLocation()
	const bookId = pathname.split('/')[2]

	const navigate = useNavigate()

	const { mutateAsync, isLoading } = useMutation(
		['create or get book auth/not auth'],
		/**
		 * This asynchronous mutation sends a request to the server using axios. If the user is authorized, then an authorized request with book log creation/retrieval is sent, otherwise a request to retrieve book data without creating a log is sent.
		 * @param {object} data
		 * @param {boolean} data.isAuth
		 * @param {number} data.bookId
		 */
		async ({ isAuth, bookId }) => {
			if (isAuth) {
				await $axios
					.get(`/book/auth/${bookId}`)
					.then(response => {
						setData(response.data)
					})
					.catch(() => setErrorQuery(true))
			} else {
				await $axios
					.get(`/book/${bookId}`)
					.then(response => {
						setData(response.data)
					})
					.catch(() => setErrorQuery(true))
			}
		}
	)

	useEffect(() => {
		mutateAsync({ isAuth, bookId })
	}, [isAuth, pathname])

	const bookState = {
		loader: (
			<>
				<div className={styles.aboutBook_Loader}>
					<div>
						<figure></figure>
						<div>
							<h2>loading...</h2>
							<h1>Loading</h1>
							<h1>Loading</h1>
							<BookInfo loading={true} />
						</div>
					</div>
					<article>
						<h3>Description</h3>
						<p>Loading...</p>
					</article>
				</div>
				<OtherBooks loading={true} boolean={false} />
				<ChaptersOrText loading={true} />
			</>
		),
		error: (
			<>
				<div className={styles.errorBook}>
					<figure>
						<img
							src='/public/read-later/Book.jpg'
							alt='Book image'
							draggable={false}
						/>
					</figure>
					<div>
						<h1>{`Looks like something went wrong, sorry...`}</h1>
					</div>
				</div>
				<LinkTo
					title={`You can check out the other books`}
					paragraph={`We apologize for the inconvenience.`}
					img='/public/link-to/Book-SVG.svg'
					linkNavigate='/books'
					style='linkLarge'
				/>
			</>
		)
	}

	return (
		<Layout>
			<section className={styles.wrapper}>
				{isLoading || (!data && !errorQuery) ? (
					bookState.loader
				) : errorQuery ? (
					bookState.error
				) : (
					<>
						<div className={styles.aboutBook}>
							<div>
								<figure>
									<div>
										{isAuth ? (
											<ReadLaterButton bookId={Number(bookId)} />
										) : null}
									</div>
									<img
										src={getFilePath(data?.images)}
										alt='Last Book'
										draggable={false}
									/>
								</figure>
								<div>
									<h2
										onClick={() => navigate(`/author/${data?.author?.id}`)}
										onKeyDown={event =>
											onKeyDownHandler_Enter(
												event,
												`/author/${data?.author?.id}`,
												navigate
											)
										}
										tabIndex={0}
									>
										{data?.author?.name}
									</h2>
									<h1>{data?.name}</h1>
									{isAuth ? (
										<RatingActive
											bookId={data?.id}
											rate={data?.rate}
											sumRate={data?.sumRate}
										/>
									) : (
										<RatingPassive
											sumRate={data?.sumRate}
											rateLength={data?.rate?.length}
											style='passiveForBook'
										/>
									)}
									<BookInfo
										category={data?.category}
										genre={data?.genre}
										publishDate={data?.publishDate}
										pages={data?.pages}
									/>
								</div>
							</div>
							<article>
								<h3>Description</h3>
								<p>{data?.description.replaceAll(`'`, `"`)}</p>
							</article>
						</div>
						<OtherBooks
							categories={data?.category}
							bookId={Number(bookId)}
							authorId={data?.author?.id}
							books={data?.author?.books}
							related={data?.author?.books?.length < 2 ? true : false}
						/>
						{isAuth ? (
							<ChaptersOrText
								chapters={data?.chapters}
								bookLogId={data?.bookLogs[0]?.id}
							/>
						) : (
							<LinkTo
								title={`You've come this far...`}
								paragraph={`Since you've come this far, perhaps you'd like to join us?`}
								img='/public/link-to/Question-mark.svg'
								linkNavigate='/auth'
								style='linkLarge'
							/>
						)}
					</>
				)}
			</section>
		</Layout>
	)
}

export default Book
