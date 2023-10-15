import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handelDebounce } from '../../../utils/handelDebounce'

import BookCard from '../../ui/book-card/BookCard'
import Field from '../../ui/field/Field'
import BookCardLoaderLoop from '../../ui/loaders/BookCardLoaderLoop/BookCardLoaderLoop'
import PopUpList from '../../ui/pop-up-list/PopUpList'

import styles from './Search.module.scss'

import { $axios } from '../../../api'
import Layout from '../../layout/layout'

import { sortOption } from './sortOption'

const Search = () => {
	const timerDebounceRef = useRef()

	const { register, handleSubmit, getValues, setValue } = useForm({
		mode: 'onChange'
	})

	const [booksArray, setBooksArray] = useState([])
	const [totalCount, setTotalCount] = useState(0)
	/**
	 * @description This state determines the type of sorting.
	 */
	const [sort, setSort] = useState(
		/** @type {"rate" | "created-at" | "pages"} */ ('rate')
	)
	/**
	 * @description This state determines the next page number.
	 */
	const [pageBooks, setPage] = useState(1)
	/**
	 * @description This state determines the total number of pages.
	 */
	const [totalPagesBooks, setTotalPagesBooks] = useState(1)
	/**
	 * @description This state determines the search values.
	 */
	const [searchValueState, setSearchValue] = useState('')

	const setStates = (data, searchValue) => {
		setTotalCount(data?.booksPage?.items)
		setSort(data?.sort)
		setSearchValue(searchValue.search)
	}

	const { mutate, isLoading } = useMutation(
		['get books (Books page)'],
		/**
		 * This mutation sends a request to the server using axios. This request returns all books that satisfy the search condition.
		 * @param {{search: string, sort: "rate" | "created-at" | "pages"}} searchValue
		 */
		async searchValue => {
			if (
				searchValue.sort !== sort ||
				searchValue.search !== searchValueState
			) {
				const { data } = await $axios.post(
					`/book/all/search/page/${1}`,
					searchValue
				)

				setPage(data?.booksPage?.items >= 8 ? 2 : 1)
				setBooksArray(data?.booksPage?.data)
				setStates(data, searchValue)
				setTotalPagesBooks(data?.booksPage?.pages)
			} else {
				const { data } = await $axios.post(
					`/book/all/search/page/${pageBooks}`,
					searchValue
				)

				if (data?.booksPage?.page <= pageBooks) {
					setPage(pageBooks + 1)
					setBooksArray(booksArray.concat(data?.booksPage?.data))
					setStates(data, searchValue)
					setTotalPagesBooks(data?.booksPage?.pages)
				}
			}
		}
	)

	const onSubmit = data => {
		mutate(data)
	}

	useEffect(() => {
		if (!getValues('search') && pageBooks === 1) {
			onSubmit({
				search: '',
				sort: 'rate'
			})
		}
	}, [])

	/**
	 * This function handles the Listener ("Scroll"), for dynamic pagination.
	 * @param {event} event
	 */
	const scrollHandler = event => {
		if (
			event.target.documentElement.scrollHeight -
				(event.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			booksArray.length < totalCount &&
			booksArray.length >= 8 &&
			pageBooks <= totalPagesBooks &&
			!isLoading
		) {
			onSubmit({ search: searchValueState, sort: sort })
		}
	}

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)

		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	})

	const setLoadingBooks = condition => {
		if (condition) {
			return (
				<BookCardLoaderLoop
					quantity={getValues('search') ? totalCount : 8}
					style={'verticalLargeCard_Loader'}
				/>
			)
		} else {
			return (
				<>
					{booksArray?.map(book => (
						<BookCard style='verticalLargeCard' data={book} key={book?.id} />
					))}
					<BookCardLoaderLoop
						quantity={totalCount - 8 >= 8 ? 8 : totalCount - 8}
						style={'verticalLargeCard_Loader'}
					/>
				</>
			)
		}
	}

	const setBooksList = booksArrayLength => {
		if (booksArrayLength === 0) {
			return <BookCard style='verticalLargeCard_Empty' />
		} else {
			return booksArray?.map(book => (
				<BookCard style='verticalLargeCard' data={book} key={book?.id} />
			))
		}
	}

	return (
		<Layout>
			<div className={styles.wrapper}>
				<div>
					<div>
						<form
							onSubmit={event => {
								event.preventDefault()
							}}
							onKeyDown={event => {
								if (event.key === 'Enter') event.preventDefault()
							}}
							onChange={() =>
								handelDebounce(timerDebounceRef.current, handleSubmit(onSubmit))
							}
						>
							<Field
								name='search'
								register={register}
								type='text'
								placeholder='Find the right book'
							/>
							<PopUpList
								register={register}
								name='sort'
								options={sortOption}
								state={sort}
								setValue={setValue}
								onSubmit={handleSubmit(onSubmit)}
							/>
						</form>
					</div>
				</div>
				<div>
					{isLoading
						? setLoadingBooks(booksArray?.length === 0 || searchValueState)
						: setBooksList(booksArray?.length)}
				</div>
			</div>
		</Layout>
	)
}

export default Search
