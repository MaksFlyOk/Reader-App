import express from 'express'
import { admin } from '../middleware/admin.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import {
	addBookToReadLater,
	deleteBookToReadLater,
	rateBook
} from './book-user.controller.js'
import { editNamePassword, editNameUser } from './edit-user.controller.js'
import { getAllUser, getProfile } from './get-user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getProfile)

router.route('/all').get(admin, getAllUser)

router.route('/edit/name').patch(protect, editNameUser)

router.route('/edit/password').patch(protect, editNamePassword)

router.route('/book/add/:id').patch(protect, addBookToReadLater)

router.route('/book/delete/:id').patch(protect, deleteBookToReadLater)

router.route('/book/rate/:id').patch(protect, rateBook)

export default router
