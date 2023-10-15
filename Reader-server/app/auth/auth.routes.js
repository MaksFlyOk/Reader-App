import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { authUser, deleteUser, registerUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)

router.route('/register').post(registerUser)

router.route('/delete').delete(protect, deleteUser)

export default router
