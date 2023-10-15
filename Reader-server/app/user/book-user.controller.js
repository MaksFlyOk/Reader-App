import asyncHandler from 'express-async-handler'

import { findRateIdByUserId } from '../utils/rating-utils/findRateIdByUserId.util.js'
import { isUser } from '../utils/rating-utils/isUser.util.js'
import { userRating } from '../utils/rating-utils/userRating.util.js'
import { readLaterFind } from '../utils/read-later-find.util.js'

import { prisma } from '../prisma.js'

/**
 * @description Add the book to read later.
 * @request We pass in req.params the id of the book and the id of the authorized user is passed in.
 * @response As a response we get user data and a message that the book has been added.
 *
 * @route Patch /api/user/book/add/:id
 * @access Private
 */
export const addBookToReadLater = asyncHandler(async (req, res) => {
	/**
	 * @type {number}
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const { readLater } = await prisma.user.findUnique({
		where: {
			id: userId
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

	const user = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			readLater: {
				set: [book.id, ...readLater]
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

/**
 * @description Delete the book to read later.
 * @request We pass in req.params the id of the book and the id of the authorized user is passed in.
 * @response As a response we get user data and a message that the book has been deleted.
 *
 * @route Patch /api/user/book/delete/:id
 * @access Private
 */
export const deleteBookToReadLater = asyncHandler(async (req, res) => {
	/**
	 * @type {number}
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const { readLater } = await prisma.user.findUnique({
		where: {
			id: userId
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
			id: userId
		},
		data: {
			readLater: {
				set: readLater.filter(elem => elem !== bookId)
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

/**
 * @description Check for the book on the list Read Later.
 * @request We pass in req.params the id of the book and the id of the authorized user is passed in.
 * @response As a response we get an object with the property bookOnList - which stores True if the book is in the list, otherwise False.
 *
 * @route GET /api/user/book/check/:id
 * @access Private
 */
export const checkBookOnReadLater = asyncHandler(async (req, res) => {
	/**
	 * @type {number}
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const { readLater } = await prisma.user.findUnique({
		where: {
			id: userId
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
			id: true
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	if (!readLater) {
		res.status(404)
		throw new Error('User not found')
	}

	if (readLaterFind(readLater, bookId)) {
		res.json({ bookOnList: true })
	}

	res.json({ bookOnList: false })
})

/**
 * @description Rate the book.
 * @request Pass in req.params the id of the book, also pass in the id of the authorized user and pass in the rating.
 * @response As an answer we get the data of the book and the author, because when the rating of the book changes, the rating of the author also changes.
 *
 * @route Patch /api/user/book/rate/:id
 * @access Private
 */
export const rateBook = asyncHandler(async (req, res) => {
	/**
	 * @type {number}
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	/**
	 * @type {{rating: number}}
	 */
	const { rating } = req.body

	let rate

	if (rating < 0 || rating > 5) {
		res.status(404)
		throw new Error('The rating should be between 0 and 5')
	}

	const allRate = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			rate: true
		}
	})

	if (allRate === null) {
		res.status(404)
		throw new Error('Book not found')
	}

	if (isUser(allRate, userId)) {
		if (userRating(allRate, userId) === rating) {
			rate = await prisma.ratings.update({
				where: {
					id: allRate.rate[findRateIdByUserId(allRate, userId)].id
				},
				data: {
					rating: 0
				}
			})
		} else {
			rate = await prisma.ratings.update({
				where: {
					id: allRate.rate[findRateIdByUserId(allRate, userId)].id
				},
				data: {
					rating
				}
			})
		}
	} else {
		rate = await prisma.ratings.create({
			data: {
				rating,
				userId: req.user.id,
				bookId: bookId
			}
		})
	}

	const bookRating = await prisma.book.update({
		where: {
			id: bookId
		},
		data: {
			sumRate: {
				increment: +(
					rate.rating -
					(allRate.rate[findRateIdByUserId(allRate, userId)]?.rating ===
					undefined
						? 0
						: allRate.rate[findRateIdByUserId(allRate, userId)]?.rating)
				)
			}
		},
		select: {
			id: true,
			name: true,
			authorId: true,
			sumRate: true,
			rate: {
				select: {
					id: true,
					userId: true,
					rating: true
				}
			}
		}
	})

	const authorBooks = await prisma.author.findUnique({
		where: {
			id: bookRating.authorId
		},
		select: {
			books: {
				select: {
					sumRate: true,
					rate: true
				}
			}
		}
	})

	const author = await prisma.author.update({
		where: {
			id: bookRating.authorId
		},
		data: {
			rate: (
				authorBooks.books.reduce(
					(acc, elem) =>
						(acc += isNaN(elem.sumRate / elem.rate.length)
							? 0
							: elem.sumRate / elem.rate.length),
					0
				) / authorBooks.books.filter(elem => elem.rate.length !== 0).length
			).toFixed(1)
		}
	})

	const book = await prisma.book.update({
		where: {
			id: bookId
		},
		data: {
			Rating: (bookRating.sumRate / bookRating.rate.length).toFixed(1)
		},
		select: {
			id: true,
			name: true,
			authorId: true,
			sumRate: true,
			rate: {
				select: {
					id: true,
					userId: true,
					rating: true
				}
			}
		}
	})

	res.json({ book, author })
})

/**
 * @description Check if the user has a rating for this book.
 * @request We pass in req.params the id of the book and the id of the authorized user is passed in.
 * @response As a response, we get the book's title supplied by the authorized user, otherwise False.
 *
 * @route Patch /api/user/book/check/rate/:id
 * @access Private
 */
export const checkRateBook = asyncHandler(async (req, res) => {
	/**
	 * @type {number}
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const bookRatings = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			rate: {
				select: {
					userId: true,
					rating: true
				}
			}
		}
	})

	const userRating = bookRatings.rate.findIndex(elem => elem.userId === userId)

	res.json(userRating !== -1 ? bookRatings.rate[userRating].rating : false)
})
