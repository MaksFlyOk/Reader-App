import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc    Create new book log
// @route 	POST /api/book/log/:id
// @access  Private
export const createNewBookLog = asyncHandler(async (req, res) => {
	const bookId = +req.params.id

	const book = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		include: {
			chapters: true
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found!')
	}

	const bookLog = await prisma.bookLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			book: {
				connect: {
					id: bookId
				}
			},
			chaptersLogs: {
				create: book.chapters.map(chapter => ({
					user: {
						connect: {
							id: req.user.id
						}
					},
					chapter: {
						connect: {
							id: chapter.id
						}
					}
				}))
			}
		},
		include: {
			chaptersLogs: true
		}
	})

	res.json(bookLog)
})
