import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc    Get book log
// @route 	GET /api/book/log/:id
// @access  Private
export const getBookLogById = asyncHandler(async (req, res) => {
	const bookLog = await prisma.bookLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			chaptersLogs: true
		}
	})

	if (!bookLog) {
		res.status(404)
		throw new Error('Book log not found')
	}

	res.json(bookLog)
})

// @desc    Get books logs for user
// @route 	GET /api/book/log/all
// @access  Private
export const getBookLogForUser = asyncHandler(async (req, res) => {
	const bookLogs = await prisma.bookLog.findMany({
		where: {
			userId: req.user.id
		},
		include: {
			chaptersLogs: true
		}
	})

	if (!bookLogs) {
		res.status(404)
		throw new Error('Books logs not found')
	}

	res.json(bookLogs)
})
