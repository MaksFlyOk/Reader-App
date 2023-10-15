import { useEffect, useState } from 'react'

import { useSetScrollHandlerEffect } from '../../../hooks/useSetEffectScrollHandler'

import getAuthor from '../../../services/author/getAuthor'

import AuthorCard from '../../ui/author-card/AuthorCard'
import AuthorCardLoaderLoop from '../../ui/loaders/AuthorCardLoaderLoop/AuthorCardLoaderLoop'
import RunningLine from '../../ui/running-line/RunningLine'

import styles from './Authors.module.scss'

import Layout from '../../layout/layout'

const Authors = () => {
	const limitPagination = 8

	const [currentPage, setCurrentPage] = useState(1)
	const [authorsArray, setAuthorsArray] = useState(
		/** @type {array<object>} */ ([])
	)
	const [isFetching, setFetching] = useState(true)
	const [totalCount, setTotalCount] = useState(0)

	/**
	 * This function is executed when the Listener is triggered (When the end of the page is reached). Starts loading of a new Pagination page.
	 * @param {event} event
	 */
	const scrollHandler = event => {
		if (
			event.target.documentElement.scrollHeight -
				(event.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			authorsArray.length < totalCount
		) {
			if (authorsArray.length !== 0) {
				setFetching(true)
			}
		}
	}

	useSetScrollHandlerEffect(scrollHandler)

	useEffect(() => {
		if (isFetching) {
			getAuthor
				.getAuthorByRatePagination(currentPage)
				.then(res => {
					res?.data?.length !== 0
						? setAuthorsArray([...authorsArray, ...res.data.data])
						: setAuthorsArray(authorsArray)
					setCurrentPage(res?.data?.page + 1)
					setTotalCount(res?.data?.items)
				})
				.finally(() => {
					setFetching(false)
				})
		}
	}, [isFetching])

	return (
		<Layout>
			<RunningLine text='Authors' iconPath='none' />
			<section className={styles.authorsWrapper}>
				{isFetching ? (
					<>
						{authorsArray?.length !== 0
							? authorsArray?.map(author => (
									<AuthorCard
										key={author?.id}
										author={author}
										style='verticalLargeCard'
									/>
								))
							: null}
						<AuthorCardLoaderLoop
							style='verticalLargeCard_Loader'
							quantity={
								authorsArray?.length !== 0
									? totalCount - limitPagination < limitPagination
										? totalCount - limitPagination
										: limitPagination
									: 8
							}
						/>
					</>
				) : authorsArray.length === 0 ? (
					<AuthorCard style='verticalLargeCard_Empty' />
				) : (
					authorsArray?.map(author => (
						<AuthorCard
							key={author?.id}
							author={author}
							style='verticalLargeCard'
						/>
					))
				)}
			</section>
		</Layout>
	)
}

export default Authors
