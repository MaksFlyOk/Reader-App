import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

/**
 * @description Complete the chapter.
 * @request Pass in req.params the identifier of the chapter to be completed. (Or if the chapter is completed make it not completed).
 * @response We get the chapter log as a response.
 *
 * @route PATCH /api/chapter/log/complete/:id
 * @access Private
 */
export const completeChapter = asyncHandler(async (req, res) => {
	/**
	 * @param {number} authorId - Chapter Id passed in req.params.
	 */
	const chapterId = +req.params.id

	const { isCompleted } = await prisma.chapterLog.findUnique({
		where: {
			id: chapterId
		},
		select: {
			isCompleted: true
		}
	})

	const chapterLog = await prisma.chapterLog.update({
		where: {
			id: chapterId
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
