import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useGetBookByIdNotAuth } from '../../../../hooks/book/useGetBookByIdNotAuth'
import { useCheckRateBook } from '../../../../hooks/user/useCheckRateBook'

import { setNumberOfGrades } from '../../../../utils/file/setNumberOfGrades.util'
import { setRating } from '../../../../utils/file/setRating.util'

import styles from '../Rating.module.scss'

import Alert from '../../alert/Alert'
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
	const { data, isLoading, refetch } = useGetBookByIdNotAuth(bookId)
	const { data: dataRate, isLoading: isLoadingRate } = useCheckRateBook(bookId)

	const [isStarShow, setStarShow] = useState(undefined)

	const { isLoadingMutate, error, isAlertShow, mutate } = useRating()

	useEffect(() => {
		refetch()
	})

	const clickHandler = event => {
		let userRating

		if (event.type === 'click') {
			userRating =
				+event.target.parentNode.attributes.getNamedItem('data-value')?.value
		} else {
			userRating = +event.target.attributes.getNamedItem('data-value')?.value
		}

		setStarShow(undefined)
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
			onFocus={() => setStarShow(true)}
			onBlur={event => {
				if (event.target.attributes.getNamedItem('data-value')?.value === '4') {
					let timeShowStar = setTimeout(() => {
						setStarShow(false)
						clearTimeout(timeShowStar)
					}, 500)
				}
			}}
			tabIndex={0}
		>
			{error && isAlertShow ? (
				<Alert type='error'>{error?.response?.data?.message}</Alert>
			) : null}
			{isLoading || isLoadingRate || isLoadingMutate ? (
				<div className={styles.ratingLoader}>
					<span>Loading...</span>
				</div>
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
