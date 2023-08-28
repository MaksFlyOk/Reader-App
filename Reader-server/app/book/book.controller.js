import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Add new book
// @route 	POST /api/book/
// @access  Private
export const addNewBook = asyncHandler(async (req, res) => {
	const { name, description, images, genre, publishDate, category, pages } =
		req.body

	const book = await prisma.book.create({
		data: {
			name,
			description,
			images,
			genre,
			publishDate,
			category,
			pages
		}
	})

	res.json(book)
})

// @desc    Delete book
// @route 	POST /api/book/delete/:id
// @access  Private
export const deleteBookById = asyncHandler(async (req, res) => {
	const book = await prisma.book.delete({
		where: {
			id: +req.params.id
		},
		select: {
			id: true,
			name: true,
			author: true,
			rate: true,
			chapters: true
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	book.chapters.forEach(
		async item =>
			await prisma.chapter.delete({
				where: {
					id: item.id
				}
			})
	)

	res.json({ ...book, message: 'Book & all book chapters deleted!' })
})
