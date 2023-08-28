import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { useReadLaterList } from '../../../hooks/user/useReadLaterList'

import bookUserService from '../../../services/user/book-user.service'

import styles from './ReadLaterPanel.module.scss'

import Loader from '../loader/Loader'

/**
 * The section with the list read later.
 * @component
 * @typedef PropType
 * @property {string} style - ...
 *
 * @param {PropType} props
 * @returns JSX component ReadLaterPanel.
 */
const ReadLaterPanel = ({ style }) => {
	const [isBook, setIsBook] = useState(true)
	const { data, isLoading } = useReadLaterList()
	const queryClient = useQueryClient()

	const {
		mutateAsync,
		isLoading: isLoadingMutate,
		error
	} = useMutation(
		['delete book to read later '],
		async bookId => {
			if (bookId) {
				await bookUserService.bookToReadLater('delete', bookId)
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['get read later list'])
			},
			onError: () => {
				console.log(error)
			}
		}
	)

	const bookFunc = data => {
		if (data.length === 0) {
			return (
				<li style={isBook ? { display: 'flex' } : { display: 'none' }}>
					<div>
						<span>{`There aren't any books here`}</span>
					</div>
					<span
						className={styles.readLaterButton}
						onClick={() => (isBook ? setIsBook(false) : setIsBook(true))}
					>
						<img
							src='/public/read-later/Read-later-button-active.svg'
							alt='Read later icon'
							draggable={false}
						/>
					</span>
				</li>
			)
		} else {
			return data?.map((book, index) =>
				index < 3 ? (
					<li key={book?.id}>
						<div>
							<span>{book?.name} </span>
							<span>{book?.author?.name}</span>
						</div>
						<span
							className={styles.readLaterButton}
							onClick={() => mutateAsync(book?.id)}
						>
							<img
								src='/public/read-later/Read-later-button-active.svg'
								alt='Read later icon'
								draggable={false}
							/>
						</span>
					</li>
				) : null
			)
		}
	}

	return (
		<ul className={styles.wrapper}>
			{isLoading || isLoadingMutate ? (
				<Loader />
			) : (
				<>{style === 'profile' ? bookFunc(data?.readLater) : null}</>
			)}
		</ul>
	)
}

ReadLaterPanel.propTypes = {
	style: PropTypes.string
}

export default ReadLaterPanel
