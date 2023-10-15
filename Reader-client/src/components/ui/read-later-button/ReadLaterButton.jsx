import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { useCheckBookOnReadLater } from '../../../hooks/user/useCheckBookOnReadLater'

import styles from './ReadLaterButton.module.scss'

import { COLORS } from '../../../app.constants'
import Alert from '../alert/Alert'

import { useReadLaterButton } from './useReadLaterButton'

/**
 * Read Later add/delete button.
 * @component
 * @typedef PropType
 * @property {number} bookId - This is the id of the book.
 * @property {"onlyDeleteReadLaterButton" | "readLaterButton"} type - The type defines the button style, "onlyDeleteReadLaterButton" - needed for Read Later type components, only for deleting a book from the list, "readLaterButton" - can both add and delete a book.
 * @property {function} functionOptionally - Allows you to throw a function in the button type - "onlyDeleteReadLaterButton".
 *
 * @param {PropType} props
 * @returns JSX component ReadLaterButton.
 */
const ReadLaterButton = ({ bookId, type, functionOptionally }) => {
	const { data, isLoading } = useCheckBookOnReadLater(bookId)

	const { isLoadingMutate, error, isAlertShow, mutate } = useReadLaterButton()

	const queryClient = useQueryClient()

	useEffect(() => {
		if (bookId) {
			queryClient.invalidateQueries([
				'check the book on list Read Later',
				bookId
			])
		}
	})

	return (
		<>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			{type === 'onlyDeleteReadLaterButton' ? (
				<span
					className={styles.readLaterButton}
					onClick={functionOptionally}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							event.preventDefault()

							functionOptionally()
						}
					}}
					tabIndex={0}
				>
					<div>
						<svg
							width='16.7'
							height='20'
							viewBox='0 0 20 24'
							fill={COLORS.accent}
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.712 1.39406C18.0327 1.55017 19 2.70989 19 4.06409V23L10 18.4167L1 23V4.0641C1 2.70989 1.9673 1.55017 3.28802 1.39406C5.48987 1.13379 7.7296 1 10 1C12.2704 1 14.5101 1.13379 16.712 1.39406Z'
								stroke={COLORS.accent}
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
						</svg>
					</div>
				</span>
			) : (
				<span
					className={styles.readLaterButton}
					onClick={() =>
						data?.bookOnList
							? mutate({ type: 'delete', bookId })
							: mutate({ type: 'add', bookId })
					}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							event.preventDefault()

							data?.bookOnList
								? mutate({ type: 'delete', bookId })
								: mutate({ type: 'add', bookId })
						}
					}}
					tabIndex={0}
				>
					<div>
						{isLoadingMutate || isLoading ? (
							<svg
								className={styles.loader}
								width='16.7'
								height='20'
								viewBox='0 0 20 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M16.712 1.39406C18.0327 1.55017 19 2.70989 19 4.06409V23L10 18.4167L1 23V4.0641C1 2.70989 1.9673 1.55017 3.28802 1.39406C5.48987 1.13379 7.7296 1 10 1C12.2704 1 14.5101 1.13379 16.712 1.39406Z'
									stroke={COLORS.white}
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								></path>
							</svg>
						) : (
							<svg
								width='16.7'
								height='20'
								viewBox='0 0 20 24'
								fill={data?.bookOnList ? COLORS.accent : 'none'}
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M16.712 1.39406C18.0327 1.55017 19 2.70989 19 4.06409V23L10 18.4167L1 23V4.0641C1 2.70989 1.9673 1.55017 3.28802 1.39406C5.48987 1.13379 7.7296 1 10 1C12.2704 1 14.5101 1.13379 16.712 1.39406Z'
									stroke={data?.bookOnList ? COLORS.accent : COLORS.white}
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								></path>
							</svg>
						)}
					</div>
				</span>
			)}
		</>
	)
}

ReadLaterButton.propTypes = {
	bookId: PropTypes.number,
	type: PropTypes.oneOf(['onlyDeleteReadLaterButton', 'readLaterButton']),
	functionOptionally: PropTypes.func
}

export default ReadLaterButton
