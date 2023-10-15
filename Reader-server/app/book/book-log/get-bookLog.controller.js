import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

/**
 * @description Get book log.
 * @request In req.params you need to pass the id of the book log.
 * @response As an answer we get the log of the book.
 *
 * @route GET /api/book/log/:id
 * @access Private
 */
export const getBookLogById = asyncHandler(async (req, res) => {
	/**
	 * @param {number} bookLogId - Id of the book log , passed in req.params.
	 */
	const bookLogId = +req.params.id

	const bookLog = await prisma.bookLog.findUnique({
		where: {
			id: bookLogId
		},
		include: {
			chaptersLogs: {
				orderBy: {
					id: 'desc'
				}
			}
		}
	})

	if (!bookLog) {
		res.status(404)
		throw new Error('Book log not found')
	}

	res.json(bookLog)
})
