import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { rateTheBook } from '../utils/rate-the-book.util.js'
import { readLaterFind } from '../utils/read-later-find.util.js'

// @desc   Add the book to read later
// @route  Patch /api/user/book/add/:id
// @access Private
export const addBookToReadLater = asyncHandler(async (req, res) => {
	const bookId = +req.params.id

	const { readLater } = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: {
			readLater: true
		}
	})

	const book = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			id: true,
			name: true
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	if (readLaterFind(readLater, bookId)) {
		res.status(404)
		throw new Error('The book has already been added ')
	}

	console.log([...readLater, bookId].map(elem => ({ id: +elem.id })))

	const user = await prisma.user.update({
		where: {
			id: req.user.id
		},
		data: {
			readLater: {
				set: [...readLater, book].map(elem => ({ id: +elem.id }))
			}
		},
		select: {
			id: true,
			name: true,
			email: true,
			readLater: true
		}
	})

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	res.json({ user, message: `Book with id:${bookId} added!` })
})

// @desc   Delete the book to read later
// @route  Patch /api/user/book/delete/:id
// @access Private
export const deleteBookToReadLater = asyncHandler(async (req, res) => {
	const bookId = +req.params.id

	const { readLater } = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: {
			readLater: true
		}
	})

	if (!readLaterFind(readLater, bookId)) {
		res.status(404)
		throw new Error('Book not found')
	}

	const user = await prisma.user.update({
		where: {
			id: req.user.id
		},
		data: {
			readLater: {
				set: readLater
					.filter(elem => elem.id !== bookId)
					.map(elem => ({ id: +elem.id }))
			}
		},
		select: {
			id: true,
			name: true,
			email: true,
			readLater: true
		}
	})

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	res.json({ user, message: `Book with id:${bookId} delete!` })
})

// @desc   Rate the book
// @route  Patch /api/user/book/rate/:id
// @access Private
export const rateBook = asyncHandler(async (req, res) => {
	const bookId = +req.params.id
	const { rating } = req.body

	if (rating < 0 || rating > 5) {
		res.status(404)
		throw new Error('The rating should be between 0 and 5')
	}

	const { rate } = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			rate: true
		}
	})

	const book = await prisma.book.update({
		where: {
			id: bookId
		},
		data: {
			rate: rateTheBook(rate, rating, req.user.id)
		},
		select: {
			id: true,
			name: true,
			author: true,
			rate: true
		}
	})

	res.json(book)
})
