import express from 'express'
import { admin } from '../middleware/admin.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import { completeChapter, getChaptersLogs } from './chapter-log/chapterLogs.js'
import { deleteChapterById, getChapters } from './chapter.controller.js'

const router = express.Router()

router.route('/all').get(admin, getChapters)

router.route('/delete/:id').post(admin, deleteChapterById)

router.route('/log/all').get(admin, getChaptersLogs)

router.route('/log/complete/:id').patch(protect, completeChapter)

export default router
