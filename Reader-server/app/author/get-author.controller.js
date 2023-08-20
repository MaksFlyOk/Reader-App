import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Get author
// @route 	GET /api/author/:id
// @access  Private
export const getAuthor = asyncHandler(async (req, res) => {
	const authorId = +req.params.id

	const author = await prisma.author.findUnique({
		where: {
			id: authorId
		},
		select: {
			id: true,
			name: true,
			books: {
				select: {
					id: true,
					name: true,
					rate: true
				}
			}
		}
	})

	if (!author) {
		res.status(404)
		throw new Error('Author not found')
	}

	res.json(author)
})

// @desc    Get all authors
// @route 	GET /api/author/all
// @access  Private
export const getAuthors = asyncHandler(async (req, res) => {
	const authors = await prisma.author.findMany({
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			name: true,
			books: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	if (!authors) {
		res.status(404)
		throw new Error('Authors not found')
	}

	res.json(authors)
})
