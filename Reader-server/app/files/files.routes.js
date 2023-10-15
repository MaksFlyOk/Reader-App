import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { uploadUserProfileImage } from './uploadUserImage.controller.js'

const router = express.Router()

router.route('/profileImage').post(protect, uploadUserProfileImage)

export default router
