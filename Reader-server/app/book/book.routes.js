import express from 'express'

import { admin } from '../middleware/admin.middleware.js'
import { protect } from '../middleware/auth.middleware.js'

import { getBookLogById } from './book-log/get-bookLog.controller.js'
import { addNewBook, deleteBookById } from './book.controller.js'
import {
	addNewChapterToBook,
	deleteChapterToBook
} from './chapter-book.controller.js'
import { getGenres_Categories_PublishDateRange } from './genres-and-categories.js'
import {
	getBookByIdAuth,
	getBookByIdNotAuth,
	getBooksByCategory,
	getBooksByRate_TopBooks,
	getBooksByRating_Pagination,
	getBooksFilter,
	getBooksWithSearch,
	getLastCreatedBook
} from './get-books.controller.js'

const router = express.Router()

router.route('/').post(admin, addNewBook)

router.route('/last').get(getLastCreatedBook)

router.route('/:id').get(getBookByIdNotAuth)

router.route('/auth/:id').get(protect, getBookByIdAuth)

router.route('/all/rating/top-books').get(getBooksByRate_TopBooks)

router.route('/all/rating/page/:page').get(getBooksByRating_Pagination)

router
	.route('/all/categories-and-genres')
	.get(getGenres_Categories_PublishDateRange)

router.route('/all/search/page/:page').post(getBooksWithSearch)

router.route('/all/filter').post(getBooksFilter)

router.route('/category').all(getBooksByCategory)

router.route('/delete/:id').delete(admin, deleteBookById)

router.route('/chapter/add/:id').patch(admin, addNewChapterToBook)

router.route('/chapter/delete/:id').patch(admin, deleteChapterToBook)

router.route('/log/:id').get(protect, getBookLogById)

export default router
