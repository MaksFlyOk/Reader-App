import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { completeChapter } from './chapter-log/chapterLogs.js'

const router = express.Router()

router.route('/log/complete/:id').patch(protect, completeChapter)

export default router
