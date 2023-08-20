import express from 'express'
import { admin } from '../middleware/admin.middleware.js'
import { grantAdmin } from './grant-admin.controller.js'

const router = express.Router()

router.route('/grant/:id').patch(admin, grantAdmin)

export default router
