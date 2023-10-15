import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useGetReadLaterList } from '../../../hooks/user/useGetReadLaterList'

import bookUserService from '../../../services/user/book-user.service'

import styles from './ReadLaterPanel.module.scss'

import BookCard from '../book-card/BookCard'
import BookCardLoaderLoop from '../loaders/BookCardLoaderLoop/BookCardLoaderLoop'

/**
 * The section with the list read later.
 * @component
 * @typedef PropType
 * @property {"readLaterPage" | "readLaterProfile"} style - These are styles for Read Later list: "readLaterPage" - styles with large blocks for ReadLater Page, "readLaterProfile" - styles with small blocks (maximum 3) for Profile Page.
 *
 * @param {PropType} props
 * @returns JSX component ReadLaterPanel.
 */
const ReadLaterPanel = ({ style }) => {
	const [isBook, setIsBook] = useState(true)
	const [quantityBooks, setQuantityBooks] = useState(null)
	const [isReverse, setIsReverse] = useState(false)

	const { data, isFetching } = useGetReadLaterList()
	const queryClient = useQueryClient()

	const arrayReadLater = []

	const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
		['delete book to read later '],
		async bookId => {
			if (bookId) {
				await bookUserService.bookToReadLater('delete', bookId)
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['get read later list'])
			}
		}
	)

	useEffect(() => {
		if (data) {
			setQuantityBooks(data?.length)
		}
	}, [data, mutateAsync])

	const createBookListReadLaterProfile = (array, data) => {
		if (data === false) {
			array.push(
				<BookCard
					style='horizontalLittleCardTag_Li_Empty'
					functionOptionally={() =>
						isBook ? setIsBook(false) : setIsBook(true)
					}
					stateOptionally={isBook}
					key={'empty_list'}
				/>
			)

			return array
		} else {
			for (let i = 0; i < 3; i++) {
				if (data[i] !== undefined) {
					array.push(
						<BookCard
							key={data[i]?.id}
							style='horizontalLittleCardTag_Li'
							data={data}
							functionOptionally={mutateAsync}
							indexOptionally={i}
						/>
					)
				} else {
					return array
				}
			}

			return array
		}
	}

	const createBookListReadLaterPage = (array, data) => {
		if (data === false) {
			array.push(
				<BookCard
					style='horizontalLargeCardTag_Li_Empty'
					functionOptionally={() =>
						isBook ? setIsBook(false) : setIsBook(true)
					}
					stateOptionally={isBook}
					key={'empty_list'}
				/>
			)

			return array
		} else {
			for (let i = 0; i < data.length; i++) {
				array.push(
					<BookCard
						key={data[i]?.id}
						style='horizontalLargeCardTag_Li'
						data={data}
						functionOptionally={mutateAsync}
						indexOptionally={i}
					/>
				)
			}

			return array
		}
	}

	const readLaterListLoading = {
		readLaterProfile: (
			<ul className={styles[style]}>
				<BookCardLoaderLoop
					style='horizontalLittleCardTag_Li_Loader'
					quantity={
						quantityBooks > 3 || quantityBooks === null ? 3 : quantityBooks
					}
				/>
			</ul>
		),
		readLaterPage: (
			<ul className={styles[style]}>
				<BookCardLoaderLoop
					style='horizontalLargeCardTag_Li_Loader'
					quantity={quantityBooks === null ? 4 : quantityBooks}
				/>
			</ul>
		)
	}

	return (
		<div className={styles[`wrapper_${style}`]}>
			{style === 'readLaterProfile' || data === false ? null : (
				<div>
					<span
						onClick={() => setIsReverse(isReverse === false ? true : false)}
						className={styles.buttonReverse}
						tabIndex={0}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								setIsReverse(isReverse === false ? true : false)
							}
						}}
					>
						{isReverse === false ? 'First the new ones' : 'First the old ones'}
						<img
							src='/public/button/Button-arrow.svg'
							alt='Button arrow'
							style={
								isReverse === false
									? { transform: 'rotate(0deg)' }
									: { transform: 'rotate(-90deg)' }
							}
						/>
					</span>
				</div>
			)}
			{isFetching || isLoadingMutate ? (
				readLaterListLoading[style]
			) : (
				<>
					<ul className={styles[style]}>
						{style === 'readLaterProfile'
							? createBookListReadLaterProfile(arrayReadLater, data)
							: isReverse === false
							? createBookListReadLaterPage(arrayReadLater, data)
							: createBookListReadLaterPage(arrayReadLater, data).reverse()}
					</ul>
				</>
			)}
		</div>
	)
}

ReadLaterPanel.propTypes = {
	style: PropTypes.oneOf(['readLaterPage', 'readLaterProfile'])
}

export default ReadLaterPanel
