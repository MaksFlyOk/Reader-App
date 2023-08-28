import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useBookByIdNotAuth } from '../../../../hooks/book/useBookByIdNotAuth'
import { useRateBook } from '../../../../hooks/user/useRateBook'

import { setNumberOfGrades } from '../../../../utils/file/setNumberOfGrades.util'
import { setRating } from '../../../../utils/file/setRating.util'

import styles from '../Rating.module.scss'

import Alert from '../../alert/Alert'
import Loader from '../../loader/Loader'
import Star from '../Star/Star'
import { useRating } from '../useRating'

/**
 * Rating active. This is a component that is available only to authorized users, to rate books.
 * @component
 * @typedef PropType
 * @property {number} bookId - This is the id of the book.
 *
 * @param {PropType} props
 * @returns JSX component RatingActive.
 */
const RatingActive = ({ bookId }) => {
	const { data, isLoading, refetch } = useBookByIdNotAuth(bookId)
	const {
		data: dataRate,
		isLoading: isLoadingRate,
		refetch: refetchRate
	} = useRateBook(bookId)

	const { isLoadingMutate, error, isAlertShow, mutate } = useRating()

	useEffect(() => {
		refetch()
		refetchRate()
	})

	const [isStarShow, setStarShow] = useState(undefined)

	const clickHandler = e => {
		const userRating = e.target.parentNode.getAttribute('data-value')
		mutate({ bookId, userRating })
	}

	return (
		<div
			className={styles.active}
			onMouseEnter={() => setStarShow(true)}
			onMouseLeave={() => {
				let timeShowStar = setTimeout(() => {
					setStarShow(false)
					clearTimeout(timeShowStar)
				}, 500)
			}}
		>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			{isLoading || isLoadingRate || isLoadingMutate ? (
				<Loader height='1.2vw' />
			) : (
				<div>
					<div
						className={
							isStarShow === undefined
								? styles.starShowInitial
								: isStarShow
								? styles.starShowEnabled
								: styles.starShowDisabled
						}
					>
						<Star dataRate={dataRate} clickHandler={clickHandler} />
					</div>
					<div
						className={
							isStarShow === undefined
								? styles.starShowRateInitial
								: isStarShow
								? styles.starShowRateEnabled
								: styles.starShowRateDisabled
						}
					>
						<span>{setRating(data?.sumRate, data?.rate.length)}</span>
						<span>({setNumberOfGrades(data?.rate.length)})</span>
					</div>
				</div>
			)}
		</div>
	)
}

RatingActive.propTypes = {
	bookId: PropTypes.number
}

export default RatingActive
