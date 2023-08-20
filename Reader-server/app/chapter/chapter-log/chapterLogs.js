import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc    Get chapters logs
// @route 	GET /api/chapters/log/all
// @access  Private
export const getChaptersLogs = asyncHandler(async (req, res) => {
	const chaptersLogs = await prisma.chapterLog.findMany({
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			bookLogId: true,
			chapterId: true,
			userId: true,
			isCompleted: true
		}
	})

	if (!chaptersLogs) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json(chaptersLogs)
})

// @desc    Complete the chapter
// @route 	PATCH /api/chapter/log/complete/:id
// @access  Private
export const completeChapter = asyncHandler(async (req, res) => {
	const { isCompleted } = await prisma.chapterLog.findUnique({
		where: {
			id: +req.params.id
		},
		select: {
			isCompleted: true
		}
	})

	const chapterLog = await prisma.chapterLog.update({
		where: {
			id: +req.params.id
		},
		data: {
			isCompleted: {
				set: !isCompleted
			}
		},
		select: {
			id: true,
			bookLogId: true,
			chapterId: true,
			userId: true,
			isCompleted: true
		}
	})

	if (!chapterLog) {
		res.status(404)
		throw new Error('Chapter log not found')
	}

	res.json(chapterLog)
})
