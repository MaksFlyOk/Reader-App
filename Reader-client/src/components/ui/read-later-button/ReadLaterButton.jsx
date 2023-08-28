import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { useBookOnReadLater } from '../../../hooks/user/useBookOnReadLater'

import styles from './ReadLaterButton.module.scss'

import Alert from '../alert/Alert'
import Loader from '../loader/Loader'

import { useReadLaterButton } from './useReadLaterButton'

/**
 * Read Later add/delete button.
 * @component
 * @typedef PropType
 * @property {number} bookId - This is the id of the book.
 *
 * @param {PropType} props
 * @returns JSX component ReadLaterButton.
 */
const ReadLaterButton = ({ bookId }) => {
	const { data, isLoading, refetch } = useBookOnReadLater(bookId)

	const { isLoadingMutate, error, isAlertShow, mutate } = useReadLaterButton()

	useEffect(() => {
		refetch()
	})

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			<span
				className={styles.readLaterButton}
				onClick={() =>
					data?.bookOnList
						? mutate({ type: 'delete', bookId })
						: mutate({ type: 'add', bookId })
				}
			>
				{isLoadingMutate || isLoading ? (
					<Loader width='2vw' />
				) : (
					<img
						src={
							data?.bookOnList
								? '/public/read-later/Read-later-button-active.svg'
								: '/public/read-later/Read-later-button-passive.svg'
						}
						alt='Read later icon'
						draggable={false}
					/>
				)}
			</span>
		</>
	)
}

ReadLaterButton.propTypes = {
	bookId: PropTypes.number
}

export default ReadLaterButton
