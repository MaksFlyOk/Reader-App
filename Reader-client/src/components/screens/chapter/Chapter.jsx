import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useGetBookByIdNotAuth } from '../../../hooks/book/useGetBookByIdNotAuth'

import { getFilePath } from '../../../utils/file/getFile.util'
import { onKeyDownHandler_Enter } from '../../../utils/onKeyDownHandler_Enter'

import Alert from '../../ui/alert/Alert'

import styles from './Chapter.module.scss'

import { $axios } from '../../../api'
import Footer from '../../layout/footer/Footer'

const Chapter = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [bookId, chapterId] = [pathname.split('/')[2], pathname.split('/')[4]]

	/**
	 * @description This state defines the progress bar values in percent.
	 */
	const [width, setWidth] = useState(0)
	/**
	 * @description This state determines the output text of the chapter.
	 */
	const [text, setText] = useState(/** @type {string | null} */ (null))
	const [isAlertShow, setAlertShow] = useState(false)

	const { data, isLoading } = useGetBookByIdNotAuth(bookId)

	const {
		mutateAsync,
		isLoading: isLoadingMutate,
		error
	} = useMutation(
		['get chapter'],
		/**
		 * This asynchronous mutation sends a request to the server using axios. This request returns the text of the chapter.
		 * @param {{id: number, name: string, description: string, images: string, category: array<{id: number, category: string}>, genre: {id: number, genre: string}, publishDate: number, pages: number, author: {id: number, name: string, books: array<{id: number, name: string, images: string, author: {id: number, name: string}}>}, chapters: array<{id: number, name: string, text: string}>, sumRate: number, rate: array<{rating: number, userId: number}>}} data
		 */
		async data => {
			if (data) {
				const chapterIndex = data?.chapters?.findIndex(
					chapter => chapter.id === Number(chapterId)
				)
				await $axios
					.get(`${getFilePath(data?.chapters[chapterIndex]?.text)}`)
					.then(response => {
						setText(response.data)
					})
			}
		}
	)

	useEffect(() => {
		if (isLoading === false) {
			mutateAsync(data)
		}
	}, [data, isLoading])

	useEffect(() => {
		if (error) {
			setAlertShow(true)
			let time = setTimeout(() => {
				setAlertShow(false)
				clearTimeout(time)
			}, 4000)
		}
	}, [error])

	/**
	 * This function handles the Listener ("Scroll") to render the progress bar.
	 * @param {event} event
	 */
	const scrollHeightHandler = event => {
		const onePercent =
			(event.target.documentElement.scrollHeight - window.innerHeight) / 100

		const percent = event.target.documentElement.scrollTop / onePercent

		setWidth(percent)
	}

	useEffect(() => {
		if (text !== null) {
			window.addEventListener('scroll', scrollHeightHandler)
			return () => window.removeEventListener('scroll', scrollHeightHandler)
		}
	}, [text])

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{String(error)}</Alert>
			) : null}
			{isLoading || isLoadingMutate ? (
				<section className={styles.textFrameLoader}>
					<div>
						<header>
							<h2>Loading...</h2>
						</header>
						<article>
							<span>Loading...</span>
						</article>
					</div>
					<Footer />
				</section>
			) : (
				<section className={styles.textFrame}>
					<div>
						<header className={styles.header}>
							<div>
								<h2
									className={styles.title}
									onClick={() => navigate(`/book/${bookId}`)}
									tabIndex={0}
									onKeyDown={event =>
										onKeyDownHandler_Enter(event, `/book/${bookId}`, navigate)
									}
								>
									{data?.name}
									<img
										src='/public/chapter-button/Chapter-arrow-light.svg'
										alt='arrow'
									/>
								</h2>
								<span>
									{data?.chapters?.length > 1
										? data?.chapters[
												data?.chapters?.findIndex(
													chapter => chapter.id === Number(chapterId)
												)
											]?.name
										: null}
								</span>
								<div style={{ width: `${width}%` }}></div>
							</div>
						</header>
						<article>
							{text === null ? (
								<span>Looks like something went wrong, sorry...</span>
							) : (
								text
									.split('\n')
									.map((paragraph, index) => <p key={index}>{paragraph}</p>)
							)}
						</article>
					</div>
					<Footer />
				</section>
			)}
		</>
	)
}

export default Chapter
