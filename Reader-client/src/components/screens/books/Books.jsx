import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetCategoriesAndGenres } from '../../../hooks/book/useGetCategoriesAndGenres'
import { useAlert } from '../../../hooks/useAlert'
import { useSetScrollHandlerEffect } from '../../../hooks/useSetEffectScrollHandler'

import getBook from '../../../services/book/getBook'

import { isFilterEmpty } from '../../../utils/checkIsFilterEmpty.util'
import { handelDebounce } from '../../../utils/handelDebounce'
import { isEmptyObject } from '../../../utils/isEmptyObject'
import { isFilterChanged } from '../../../utils/isFilterChanged'

import Alert from '../../ui/alert/Alert'
import BookCard from '../../ui/book-card/BookCard'
import BookCardLoaderLoop from '../../ui/loaders/BookCardLoaderLoop/BookCardLoaderLoop'
import RunningLine from '../../ui/running-line/RunningLine'

import styles from './Books.module.scss'

import { $axios } from '../../../api'
import Layout from '../../layout/layout'

import Category from './Fields/Category/Category'
import DoubleRange from './Fields/DoubleRange/DoubleRange'
import Genres from './Fields/Genres/Genres'
import Other from './Fields/Other/Other'

const Books = () => {
	/**
	 * @description This ref is for time tracking in the Debounce function.
	 */
	const timerDebounceRef = useRef()

	const [currentPage, setCurrentPage] = useState(1)
	const [booksArray, setBooksArray] = useState([])
	const [isFetching, setFetching] = useState(false)
	const [totalCount, setTotalCount] = useState(0)

	/**
	 * @description This state defines the array of filtered books displayed.
	 */
	const [booksArrayFilter, setBooksArrayFilter] = useState(
		/** @type {array<object>} */ ([])
	)
	/**
	 * @description This state determines the total number of books filtered.
	 */
	const [totalCountFilter, setTotalCountFilter] = useState(0)

	/**
	 * @description This state determines the presence of filtration.
	 */
	const [isFilterEmptyState, setFilterEmptyState] = useState(false)
	/**
	 * @description This state determines the filtering value.
	 */
	const [filterState, setFilterState] = useState(
		/** @type {{category: number[], genre: number[], publish_date: [min: number, max: number], other: boolean}} */ (
			false
		)
	)

	const [isAlertShow, setAlertShow] = useState(false)
	const [queryError, setQueryError] = useState('')

	const { data, isLoading: isLoadingCategoriesAndGenres } =
		useGetCategoriesAndGenres(setQueryError)

	/**
	 * @description This state defines an object with minimum and maximum publication date data.
	 */
	const [valueRange, setValueRange] = useState(
		/** @type {{min: number, max: number} */ ({
			min: data?.publishDatesRange?.at(0),
			max: data?.publishDatesRange?.at(1)
		})
	)

	/**
	 * @description It's an array with all the categories.
	 * @type {array<{id: number, category: string}>}
	 */
	const categoryOptions = data?.categories

	const { register, handleSubmit, reset, setValue, getValues } = useForm({
		mode: 'onChange'
	})

	/**
	 * This is the function that handles Submit From.
	 * @param {{category: number[] | false, genre: number[] | false, other: boolean}} data - Data coming from the form.
	 */
	const onSubmit = data => {
		if (!isEmptyObject(data)) {
			const filter = {
				category: !data.category
					? []
					: [...data.category.map(category => Number(category))],
				publish_date: [valueRange.min, valueRange.max],
				other: data.other,
				genre:
					data.genre === false
						? []
						: [...data.genre.map(genre => Number(genre))]
			}

			if (filterState === false || !isFilterChanged(filter, filterState)) {
				mutate(filter)
			}
		}
	}

	/**
	 * This function clears all fields on the form.
	 */
	const resetFilter = () => {
		reset({
			category: [],
			publish_date: [],
			other: false,
			genre: data.genre === []
		})
		setValue('publishDate_1', 0)
		setValue('publishDate_2', 2023)
		setValueRange({
			min: data?.publishDatesRange?.at(0),
			max: data?.publishDatesRange?.at(1)
		})
	}

	/**
	 * This function is executed when the Listener is triggered (When the end of the page is reached). Starts loading of a new Pagination page.
	 * @param {event} event
	 */
	const scrollHandler = event => {
		if (
			event.target.documentElement.scrollHeight -
				(event.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			booksArray.length < totalCount
		) {
			setFetching(true)
		}
	}

	useSetScrollHandlerEffect(scrollHandler)

	const { mutate, isLoading } = useMutation(
		['get books (Books page)'],
		/**
		 * This mutation sends a request to the server using axios. This request returns all the books that have been filtered.
		 * @param {{category: array<number>, genre: array<number>, other: boolean, publish_date: [minDate: number, maxDate: number]}} filter
		 */
		async filter => {
			if (isFilterEmpty(filter, data)) {
				if (booksArray.length < totalCount || booksArray.length === 0) {
					setFetching(true)
				}

				setFilterEmptyState(true)
			} else {
				setFilterEmptyState(false)
				const { data } = await $axios.post(`/book/all/filter`, filter)
				setBooksArrayFilter(data)
				setTotalCountFilter(data.length)
			}

			setFilterState(filter)
		},
		{
			onError: error => {
				setQueryError(error?.response?.data?.message)
			}
		}
	)

	useAlert(queryError, setAlertShow)

	useEffect(() => {
		setValueRange({
			min: data?.publishDatesRange?.at(0),
			max: data?.publishDatesRange?.at(1)
		})
	}, [isLoadingCategoriesAndGenres])

	useEffect(() => {
		handelDebounce(timerDebounceRef.current, handleSubmit(onSubmit))
	}, [valueRange])

	useEffect(() => {
		if (isFetching) {
			getBook
				.getBookByRate_Pagination(currentPage)
				.then(res => {
					setBooksArray([...booksArray, ...res.data.data])
					setCurrentPage(res.data.page + 1)
					setTotalCount(res.data.items)
				})
				.catch(error => setQueryError(error?.response?.data?.message))
				.finally(() => {
					setFetching(false)
				})
		}
	}, [isFetching])

	/**
	 * This function installs the Loader.
	 * @param {boolean} condition - You can write a condition inside that will return a Boolean.
	 * @returns {import('react').ComponentElement} Returns the markup from ReactElements.
	 */
	const setLoadingBooks = condition => {
		if (condition) {
			return (
				<BookCardLoaderLoop quantity={6} style='verticalLargeCard_Loader' />
			)
		} else {
			return (
				<>
					{booksArray?.map(book => (
						<BookCard style='verticalLargeCard' data={book} key={book?.id} />
					))}
					<BookCardLoaderLoop
						quantity={totalCount - 6 >= 6 ? 6 : totalCount - 6}
						style='verticalLargeCard_Loader'
					/>
				</>
			)
		}
	}

	/**
	 * This function installs the Book List.
	 * @param {boolean} isFilterEmptyState
	 * @returns {import('react').ComponentElement} Returns the markup from ReactElements.
	 */
	const setBooksList = isFilterEmptyState => {
		if (isFilterEmptyState) {
			return booksArray?.map(book => (
				<BookCard style='verticalLargeCard' data={book} key={book?.id} />
			))
		} else {
			return booksArrayFilter.length !== 0 ? (
				booksArrayFilter?.map(book => (
					<BookCard style='verticalLargeCard' data={book} key={book?.id} />
				))
			) : (
				<BookCard style='verticalLargeCard_Empty' />
			)
		}
	}

	return (
		<Layout>
			{queryError && isAlertShow ? (
				<Alert type='error'>{queryError}</Alert>
			) : null}
			<RunningLine text='All books' iconPath='none' />
			<section className={styles.wrapper}>
				<div>
					<div>
						<h2>Filter</h2>
						<span>
							{isFilterEmptyState ? totalCount : totalCountFilter}{' '}
							{totalCount === 1 || totalCountFilter === 1
								? 'result'
								: 'results'}
						</span>
					</div>
					<button form='filter' onClick={() => resetFilter()}>
						Reset all
					</button>
				</div>
				<div>
					{isLoadingCategoriesAndGenres ? (
						<aside className={styles.filterLoader}>
							<div>
								<div>
									<h2>Loading...</h2>
									<h2>Loading...</h2>
								</div>
								<div>
									<h2>Loading...</h2>
									<div>
										<h2>Loading...</h2>
										<h2>Loading...</h2>
										<h2>Loading...</h2>
									</div>
								</div>
								<div>
									<h2>Loading...</h2>
									<div>
										<h2>Loading...</h2>
										<h2>Loading...</h2>
									</div>
								</div>
								<div>
									<h2>Loading...</h2>
									<h2>Loading...</h2>
								</div>
							</div>
						</aside>
					) : (
						<aside>
							<form
								onSubmit={event => {
									event.preventDefault()
								}}
								onKeyDown={event => {
									if (event.key === 'Enter') event.preventDefault()
								}}
								onChange={() =>
									handelDebounce(
										timerDebounceRef.current,
										handleSubmit(onSubmit)
									)
								}
								id='filter'
							>
								<Category
									register={register}
									options={categoryOptions}
									setValue={setValue}
									getValues={getValues}
									onSubmit={() =>
										handelDebounce(
											timerDebounceRef.current,
											handleSubmit(onSubmit)
										)
									}
								/>
								<Genres
									genres={data?.genres}
									register={register}
									setValue={setValue}
									getValues={getValues}
									onSubmit={() =>
										handelDebounce(
											timerDebounceRef.current,
											handleSubmit(onSubmit)
										)
									}
								/>
								<div>
									<h2>Publish date</h2>
									{valueRange.min === undefined ||
									valueRange.max === undefined ? (
										<div className={styles.doubleRangeLoader}>
											<h2>Loading...</h2>
											<h2>Loading...</h2>
										</div>
									) : (
										<DoubleRange
											reset={reset}
											min={data?.publishDatesRange?.at(0)}
											max={data?.publishDatesRange?.at(1)}
											step={1}
											value={valueRange}
											onChange={setValueRange}
										/>
									)}
								</div>
								<Other
									register={register}
									setValue={setValue}
									onSubmit={() =>
										handelDebounce(
											timerDebounceRef.current,
											handleSubmit(onSubmit)
										)
									}
								/>
							</form>
						</aside>
					)}
					<div>
						<div>
							{isLoading || isFetching || isLoadingCategoriesAndGenres
								? setLoadingBooks(isLoading || booksArray.length === 0)
								: setBooksList(isFilterEmptyState)}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default Books
