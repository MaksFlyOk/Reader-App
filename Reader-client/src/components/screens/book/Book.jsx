import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import { getFilePath } from '../../../utils/file/getFile.util'
import { setReadTime } from '../../../utils/setReadTime.util'

import LinkTo from '../../ui/link-to/LinkTo'
import Loader from '../../ui/loader/Loader'
import RatingActive from '../../ui/rating/active/RatingActive'
import RatingPassive from '../../ui/rating/passive/RatingPassive'
import ReadLaterButton from '../../ui/read-later-button/ReadLaterButton'

import styles from './Book.module.scss'

import { $axios } from '../../../api.js'
import Layout from '../../layout/layout'

import ChaptersOrText from './chapters-or-text/ChaptersOrText'
import OtherBooks from './other-books/OtherBooks'

const Book = () => {
	const { isAuth } = useContextStates()
	const [data, setData] = useState(null)

	const { pathname } = useLocation()
	const bookId = pathname.split('/')[2]

	const { mutate, isLoading } = useMutation(
		['create or get book auth/not auth'],
		async ({ isAuth, bookId }) => {
			if (isAuth) {
				$axios.get(`/book/auth/${bookId}`).then(response => {
					setData(response.data)
				})
			} else {
				$axios.get(`/book/${bookId}`).then(response => {
					setData(response.data)
				})
			}
		}
	)

	useEffect(() => {
		mutate({ isAuth, bookId })
	}, [isAuth, pathname])

	return (
		<Layout>
			<section>
				{isLoading || !data ? (
					<Loader height='40vw' color='Black' />
				) : (
					<>
						<div className={styles.aboutBook}>
							<div>
								<div>
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
								</div>
								<div>
									<h2>{data?.author?.name}</h2>
									<h1>{data?.name}</h1>
									{isAuth ? (
										<RatingActive bookId={data?.id} />
									) : (
										<RatingPassive
											sumRate={data?.sumRate}
											rateLength={data?.rate?.length}
											style='passiveForBook'
										/>
									)}
									<table>
										<thead>
											<tr>
												<td>Category</td>
												<td>{data?.category.join(', ')}</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<td>Genre</td>
												<td>{data?.genre}</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<td>Publish date</td>
												<td>{data?.publishDate}</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<td>Pages </td>
												<td>{data?.pages}</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<td>Read time</td>
												<td>{setReadTime(data?.pages)}</td>
											</tr>
										</thead>
									</table>
								</div>
							</div>
							<div>
								<span>Description</span>
								<span>{data?.description.replaceAll(`'`, `"`)}</span>
							</div>
						</div>
						<OtherBooks
							categories={data?.category}
							bookId={Number(bookId)}
							authorId={data?.author?.id}
							books={data?.author?.books}
							boolean={data?.author?.books?.length < 2 ? true : false}
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
							/>
						)}
					</>
				)}
			</section>
		</Layout>
	)
}

export default Book
