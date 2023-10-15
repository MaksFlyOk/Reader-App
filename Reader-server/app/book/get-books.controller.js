import asyncHandler from 'express-async-handler'
import { paginate } from 'paginate-prisma'

import { prisma } from '../prisma.js'

/**
 * @description This is a request to retrieve a book for an unauthorized user, no chapters will be retrieved here and no book log will be created for the user.
 * @request In req.params we pass the Id of the book.
 * @response As an answer we receive the data of the book.
 *
 * @route GET /api/book/:id
 * @access Public
 */
export const getBookByIdNotAuth = asyncHandler(async (req, res) => {
	/**
	 * @param {number} bookId - Book Id passed in req.params.
	 */
	const bookId = +req.params.id

	const book = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			category: {
				select: {
					id: true,
					category: true
				}
			},
			genre: {
				select: {
					id: true,
					genre: true
				}
			},
			publishDate: true,
			pages: true,
			author: {
				select: {
					id: true,
					name: true,
					books: {
						select: {
							author: {
								select: {
									id: true,
									name: true
								}
							},
							name: true,
							images: true,
							id: true
						}
					}
				}
			},
			chapters: {
				select: {
					id: true,
					name: true,
					text: true
				}
			},
			sumRate: true,
			rate: {
				select: {
					rating: true,
					userId: true
				}
			},
			chapters: {
				select: {
					id: true,
					name: true,
					text: true
				}
			}
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json(book)
})

/**
 * @description This is a request to retrieve a book for an authorized user, chapters will be retrieved here and a book log will be created for the user.
 * @request In req.params we pass the Id of the book, and the id of the authorized user is taken.
 * @response As a response, we get book data with book logs for the authorized user.
 *
 * @route GET /api/book/auth/:id
 * @access Private
 */
export const getBookByIdAuth = asyncHandler(async (req, res) => {
	/**
	 * @param {number} bookId - Book Id passed in req.params.
	 */
	const bookId = +req.params.id

	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const bookLog = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			bookLogs: {
				select: {
					id: true,
					bookId: true,
					userId: true,
					chaptersLogs: {
						select: {
							id: true,
							chapterId: true
						}
					}
				}
			}
		}
	})

	const userBookLog = bookLog.bookLogs.find(
		bookLog => bookLog.userId === userId
	)

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

	if (!!!userBookLog) {
		await prisma.bookLog.create({
			data: {
				user: {
					connect: {
						id: userId
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
								id: userId
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
	}

	if (
		!!userBookLog &&
		book?.chapters?.length !== userBookLog?.chaptersLogs?.length
	) {
		const newChapters = book.chapters.filter(item => {
			if (
				userBookLog.chaptersLogs.find(
					logItem => logItem.chapterId !== item.id
				) ||
				userBookLog.chaptersLogs.length === 0
			) {
				return item
			}
		})

		await prisma.bookLog.update({
			where: {
				id: userBookLog.id
			},
			data: {
				chaptersLogs: {
					create: newChapters.map(chapter => ({
						user: {
							connect: {
								id: userId
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
	}

	const bookWithBookLogs = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		include: {
			author: {
				select: {
					id: true,
					name: true,
					books: {
						select: {
							author: {
								select: {
									id: true,
									name: true
								}
							},
							name: true,
							images: true,
							id: true
						}
					}
				}
			},
			chapters: {
				select: {
					id: true,
					name: true
				}
			},
			category: true,
			genre: true,
			rate: true,
			bookLogs: {
				where: {
					userId: userId,
					bookId: bookId
				}
			}
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json(bookWithBookLogs)
})

/**
 * @description Get books by category.
 * @request Pass an array of category id's.
 * @response As an answer we get an array of books, maximum number of books is 6.
 *
 * @route GET /api/book/category
 * @access Public
 */
export const getBooksByCategory = asyncHandler(async (req, res) => {
	/**
	 * @type {{categories: array<number>}}
	 */
	const { categories } = req.body

	if (!categories) {
		res.status(404)
		throw new Error('Categories not found')
	}

	const book = await prisma.book.findMany({
		where: {
			category: {
				some: {
					id: { in: categories }
				}
			}
		},
		take: 6,
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			category: true,
			publishDate: true,
			pages: true,
			author: {
				select: {
					id: true,
					name: true,
					books: {
						select: {
							author: true,
							name: true,
							images: true,
							id: true
						}
					}
				}
			},
			sumRate: true,
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

	res.json(book)
})

/**
 * @description Get last created book.
 * @request None.
 * @response As an answer we get the last added book.
 *
 * @route GET /api/book/last
 * @access Public
 */
export const getLastCreatedBook = asyncHandler(async (req, res) => {
	const book = await prisma.book.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		take: 1,
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			author: true,
			sumRate: true,
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

	res.json(book[0])
})

/**
 * @description Get books by Rate (Top Books).
 * @request None.
 * @response The answer is an array of 5 books sorted by rating.
 *
 * @route GET /api/book/all/rating/top-book
 * @access Public
 */
export const getBooksByRate_TopBooks = asyncHandler(async (req, res) => {
	const books = await prisma.book.findMany({
		orderBy: [
			{
				Rating: 'desc'
			},
			{
				rate: {
					_count: 'desc'
				}
			}
		],
		take: 5,
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			author: true,
			Rating: true,
			sumRate: true,
			rate: true,
			chapters: {
				select: {
					id: true,
					name: true,
					text: true
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

/**
 * @description Get books by Rating (Pagination).
 * @request In req.params it is necessary to pass the page number.
 * @response A page with books sorted by rating and date of last update will appear as an answer, the number of books on one page is 6.
 *
 * @route GET /api/books/all/rating/page/:page
 * @access Public
 */
export const getBooksByRating_Pagination = asyncHandler(async (req, res) => {
	/**
	 * @param {number} page - The page number passed in req.params.
	 */
	const page = +req.params.page

	const booksPage = await paginate(prisma.book)(
		{},
		{
			page: page,
			limit: 6
		},
		{
			orderBy: [
				{
					Rating: 'desc'
				},
				{
					rate: {
						_count: 'desc'
					}
				},
				{
					updatedAt: 'desc'
				}
			],
			select: {
				id: true,
				name: true,
				images: true,
				author: true,
				Rating: true,
				sumRate: true,
				rate: true
			}
		}
	)

	if (booksPage.data.length === 0 && booksPage.page <= booksPage.pages) {
		res.status(404)
		throw new Error('Books not found')
	}

	res.json(booksPage)
})

/**
 * @description Get books with a filter.
 * @request Pass categories, genres, publication date range, and other parameters.
 * @response As an answer we get an array of filtered books.
 *
 * @route GET /api/books/all/filter
 * @access Public
 */
export const getBooksFilter = asyncHandler(async (req, res) => {
	/**
	 * @type {{category: array<number>, genre: array<number>, publish_date: [maxDate: number, minDate: number], other: boolean }}
	 */
	const { category, genre, publish_date, other } = req.body

	const date = new Date()

	let categories = await prisma.category.findMany({
		orderBy: {
			id: 'desc'
		},
		select: {
			id: true
		}
	})
	categories = categories.map(category => (category = category.id))

	let genres = await prisma.genre.findMany({
		orderBy: {
			id: 'desc'
		},
		select: {
			id: true
		}
	})
	genres = genres.map(genre => (genre = genre.id))

	const books = await prisma.book.findMany({
		where: {
			category: {
				...(category.length === 0
					? {
							some: {
								id: { in: categories }
							}
					  }
					: category.length === 1 || category.length > 2
					? {
							some: {
								id: { in: category }
							}
					  }
					: {
							every: {
								id: { in: category }
							}
					  })
			},
			publishDate: !publish_date.length
				? { gte: '0', lte: date.getFullYear() }
				: publish_date.length === 1
				? String(publish_date[0])
				: { gte: publish_date[0], lte: publish_date[1] },
			Rating: other ? { gte: '4', lte: '5' } : { gte: '0', lte: '5' },
			genre: {
				...(genre.length === 0
					? {
							id: { in: genres }
					  }
					: {
							id: { in: genre }
					  })
			}
		},
		orderBy: [
			{
				Rating: 'desc'
			},
			{
				rate: {
					_count: 'desc'
				}
			}
		],
		select: {
			id: true,
			name: true,
			images: true,
			category: true,
			publishDate: true,
			genre: true,
			author: true,
			Rating: true,
			sumRate: true,
			rate: true
		}
	})

	if (!books) {
		res.status(404)
		throw new Error('The filtering request was not successful')
	}

	res.json(books)
})

/**
 * @description With this query you can retrieve a book(s) by text query that is tracked in the book title, author name and book description, and books can be sorted by rating, creation date and number of pages.
 * @request In req.params you need to pass the page number, as well as the search text query and sort type.
 * @response As an answer we get an object with a page with books,
containing the text query, sorted by the specified sorting type, the number of authors on one page is 8. Also the sorting type and the length of the array of books in the page.
 *
 * @route GET /api/books/all/search/page/:page
 * @access Public
 */
export const getBooksWithSearch = asyncHandler(async (req, res) => {
	/**
	 * @type {{search: string, sort: "rate" | "created-at" | "pages"}}
	 */
	const { search, sort } = req.body

	/**
	 * @param {number} page - The page number passed in req.params.
	 */
	const page = +req.params.page

	const booksPage = await paginate(prisma.book)(
		{},
		{
			page: page,
			limit: 8
		},
		{
			orderBy: [
				...(sort === 'rate'
					? [
							{
								Rating: 'desc'
							},
							{ createdAt: 'desc' }
					  ]
					: sort === 'created-at'
					? [{ createdAt: 'desc' }]
					: [
							{
								pages: 'desc'
							},
							{ createdAt: 'desc' }
					  ])
			],
			where: {
				...(!!!search
					? {}
					: {
							OR: [
								{
									name: {
										contains: String(search),
										mode: 'insensitive'
									}
								},
								{
									author: {
										name: {
											contains: String(search),
											mode: 'insensitive'
										}
									}
								},
								{
									description: {
										contains: String(search),
										mode: 'insensitive'
									}
								}
							]
					  })
			},
			select: {
				id: true,
				name: true,
				images: true,
				category: true,
				publishDate: true,
				genre: true,
				author: true,
				Rating: true,
				sumRate: true,
				rate: true
			}
		}
	)

	res.json({ booksPage, sort, length: booksPage?.length })
})
