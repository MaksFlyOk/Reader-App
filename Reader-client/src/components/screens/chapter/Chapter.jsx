import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBookByIdNotAuth } from '../../../hooks/book/useBookByIdNotAuth'

import { getFilePath } from '../../../utils/file/getFile.util'

import Alert from '../../ui/alert/Alert'
import Loader from '../../ui/loader/Loader'

import styles from './Chapter.module.scss'

import { $axios } from '../../../api'
import Footer from '../../layout/footer/Footer'

const Chapter = () => {
	const { pathname } = useLocation()

	const [bookId, chapterId] = [pathname.split('/')[2], pathname.split('/')[4]]

	const [text, setText] = useState('error')

	const [isAlertShow, setAlertShow] = useState(false)

	const { data, isLoading } = useBookByIdNotAuth(bookId)

	const {
		mutate,
		isLoading: isLoadingMutate,
		error
	} = useMutation(['get chapter'], async data => {
		if (data) {
			const chapterIndex = data?.chapters?.findIndex(
				chapter => chapter.id === Number(chapterId)
			)
			$axios
				.get(`${getFilePath(data?.chapters[chapterIndex].text)}`)
				.then(response => {
					setText(response.data)
				})
		}
	})

	const navigate = useNavigate()

	useEffect(() => {
		if (isLoading === false) {
			mutate(data)
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

	const [width, setWidth] = useState(0)

	const scrollHeight = () => {
		let el = document.documentElement,
			ScrollTop = document.body.scrollTop,
			ScrollHeight = document.body.scrollHeight
		let percent = (
			(ScrollTop / (ScrollHeight - el.clientHeight - 50)) *
			100
		).toFixed(0)
		setWidth(percent)
	}

	useEffect(() => {
		window.addEventListener('wheel', scrollHeight)
		return () => window.removeEventListener('wheel', scrollHeight)
	}, [])

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{String(error)}</Alert>
			) : null}
			{isLoading || isLoadingMutate ? (
				<Loader />
			) : (
				<div className={styles.textFrame}>
					<header className={styles.header}>
						<div>
							<h1 onClick={() => navigate(-1)}>
								{data?.name}
								<img
									src='/public/chapter-button/Chapter-arrow-light.svg'
									alt='arrow'
								/>
							</h1>
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
					<div>
						{text.split('\n').map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<Footer />
				</div>
			)}
		</>
	)
}

export default Chapter
