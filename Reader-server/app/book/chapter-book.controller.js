import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Add new chapter(s) to the book.
 * @request Pass in req.params id of the book, as well as an array of chapters that need to be added, if the book has one chapter, that is, it is written uni without chapters, then just pass an array of one chapter.
 * @response As an answer we get the data of the book.
 *
 * @route PATCH /api/book/chapter/add/:id
 * @access Admin
 */
export const addNewChapterToBook = asyncHandler(async (req, res) => {
	/**
	 * @type {array<{name: string, text: string}>}
	 */
	const chapters = req.body

	/**
	 * @param {number} bookId - Book Id passed in req.params.
	 */
	const bookId = +req.params.id

	const bookFind = await prisma.book.findUnique({
		where: {
			id: bookId
		}
	})

	if (!bookFind) {
		res.status(404)
		throw new Error('Book not found')
	}

	if (chapters.length === 0) {
		res.status(404)
		throw new Error('No chapter(s) found')
	}

	const newBookChapters = await prisma.$transaction(
		chapters.map(item =>
			prisma.chapter.create({
				data: {
					name: item.name,
					text: item.text,
					bookId: bookId
				}
			})
		)
	)

	const bookChapters = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		include: {
			chapters: true
		}
	})

	const book = await prisma.book.update({
		where: {
			id: bookId
		},
		data: {
			chapters: {
				set: [...bookChapters.chapters, ...newBookChapters]
			}
		},
		select: {
			id: true,
			name: true,
			author: true,
			chapters: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	res.json(book)
})
/**
 * @description Delete chapter to the book.
 * @request Pass in req.params the id of the book, and the Id of the chapter to be deleted.
 * @response As an answer we get the data of the book.
 *
 * @route PATCH /api/book/chapter/delete/:id
 * @access Admin
 */
export const deleteChapterToBook = asyncHandler(async (req, res) => {
	/**
	 * @type {{delChapter: number}}
	 */
	const { delChapter } = req.body

	/**
	 * @param {number} bookId - Book Id passed in req.params.
	 */
	const bookId = +req.params.id

	const { chapters } = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			id: true,
			name: true,
			author: true,
			chapters: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	if (chapters.filter(item => item.id === delChapter).length === 0) {
		res.status(404)
		throw new Error('No chapter found')
	}

	const book = await prisma.book.update({
		where: {
			id: bookId
		},
		include: {
			chapters: true
		},
		data: {
			chapters: {
				set: chapters.filter(item => item.id !== delChapter)
			}
		}
	})

	res.json(book)
})
