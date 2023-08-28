import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Get author
// @route 	GET /api/author/:id
// @access  Public
export const getAuthorById = asyncHandler(async (req, res) => {
	const authorId = +req.params.id

	const author = await prisma.author.findUnique({
		where: {
			id: authorId
		},
		select: {
			id: true,
			name: true,
			images: true,
			rate: true,
			books: {
				select: {
					id: true,
					name: true,
					images: true,
					sumRate: true,
					rate: {
						select: {
							userId: true,
							rating: true
						}
					}
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

// @desc    Get authors by CreatedAt
// @route 	GET /api/author/all/created-at
// @access  Public
export const getAuthorsByCreatedAt = asyncHandler(async (req, res) => {
	const authors = await prisma.author.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			images: true,
			rate: true,
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

// @desc    Get authors by Rating
// @route 	GET /api/author/all/created-at
// @access  Public
export const getAuthorsByRating = asyncHandler(async (req, res) => {
	const authors = await prisma.author.findMany({
		orderBy: {
			rate: 'desc'
		},
		select: {
			id: true,
			name: true,
			images: true,
			rate: true,
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

// @desc   	Get authors by the number of books
// @route 	GET /api/author/all/number-of-books
// @access  Public
export const getAuthorsByNumberOfBooks = asyncHandler(async (req, res) => {
	const authors = await prisma.author.findMany({
		orderBy: {
			books: {
				_count: 'desc'
			}
		},
		select: {
			id: true,
			name: true,
			images: true,
			rate: true,
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
