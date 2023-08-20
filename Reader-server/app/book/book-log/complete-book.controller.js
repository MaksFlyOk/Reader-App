import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc    Complete the book
// @route 	PATCH /api/book/log/complete/:id
// @access  Private
export const completeBook = asyncHandler(async (req, res) => {
	const { isCompleted } = await prisma.bookLog.findUnique({
		where: {
			id: +req.params.id
		},
		select: {
			isCompleted: true
		}
	})

	const bookLog = await prisma.bookLog.update({
		where: {
			id: +req.params.id
		},
		include: {
			chaptersLogs: true
		},
		data: {
			isCompleted: {
				set: !isCompleted
			}
		}
	})

	if (!bookLog) {
		res.status(404)
		throw new Error('Book log not found')
	}

	res.json(bookLog)
})
