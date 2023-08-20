import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Get book
// @route 	POST /api/book/:id
// @access  Private
export const getBookById = asyncHandler(async (req, res) => {
	const book = await prisma.book.findUnique({
		where: {
			id: +req.params.id
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			author: true,
			rate: true,
			chapters: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json({ ...book })
})

// @desc    Get books
// @route 	POST /api/book/all
// @access  Private
export const getBooks = asyncHandler(async (req, res) => {
	const books = await prisma.book.findMany({
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			author: true,
			rate: true,
			chapters: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	if (!books) {
		res.status(404)
		throw new Error('Books not found')
	}

	res.json(books)
})
