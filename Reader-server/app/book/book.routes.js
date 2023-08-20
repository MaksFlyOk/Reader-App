import express from 'express'
import { admin } from '../middleware/admin.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import { completeBook } from './book-log/complete-book.controller.js'
import { createNewBookLog } from './book-log/create-bookLog.controller.js'
import {
	getBookLogById,
	getBookLogForUser
} from './book-log/get-bookLog.controller.js'
import { addNewBook, deleteBookById } from './book.controller.js'
import {
	addNewChapterToBook,
	deleteChapterToBook
} from './chapter-book.controller.js'
import { getBookById, getBooks } from './get-books.controller.js'

const router = express.Router()

router.route('/').post(admin, addNewBook)

router.route('/all').all(getBooks)

router.route('/:id').get(getBookById)

router.route('/delete/:id').delete(admin, deleteBookById)

router.route('/chapter/add/:id').patch(admin, addNewChapterToBook)

router.route('/chapter/delete/:id').patch(admin, deleteChapterToBook)

router.route('/log/all').get(protect, getBookLogForUser)

router
	.route('/log/:id')
	.post(protect, createNewBookLog)
	.get(protect, getBookLogById)

router.route('/log/complete/:id').patch(protect, completeBook)

export default router
