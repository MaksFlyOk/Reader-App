import express from 'express'
import { admin } from '../middleware/admin.middleware.js'
import { addNewAuthor, deleteAuthor } from './author.controller.js'
import { addAuthorBook, deleteAuthorBook } from './book-author.controller.js'
import {
	getAuthorById,
	getAuthorsByCreatedAt,
	getAuthorsByNumberOfBooks,
	getAuthorsByRating
} from './get-author.controller.js'

const router = express.Router()

router.route('/').post(admin, addNewAuthor)

router.route('/all/created-at').get(getAuthorsByCreatedAt)

router.route('/all/rating').get(getAuthorsByRating)

router.route('/all/number-of-books').get(getAuthorsByNumberOfBooks)

router.route('/:id').get(getAuthorById)

router.route('/book/add/:id').patch(admin, addAuthorBook)

router.route('/delete/:id').delete(admin, deleteAuthor)

router.route('/book/delete/:id').patch(admin, deleteAuthorBook)

export default router
