import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Add new chapter to the book
// @route 	PATCH /api/book/chapter/add/:id
// @access  Private
export const addNewChapterToBook = asyncHandler(async (req, res) => {
	const chapters = req.body
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

	const newBookChapters = chapters.forEach(
		async item =>
			await prisma.chapter.create({
				data: {
					name: item.name,
					text: item.text,
					bookId: bookId
				}
			})
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
				set: [...bookChapters.chapters, newBookChapters]
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

// @desc    Delete chapter to the book
// @route 	PATCH /api/book/chapter/delete/:id
// @access  Private
export const deleteChapterToBook = asyncHandler(async (req, res) => {
	const { delChapter } = req.body
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
