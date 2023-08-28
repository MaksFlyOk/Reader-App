import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Get book
// @route 	GET /api/book/:id
// @access  Public
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
			category: true,
			genre: true,
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

// @desc    Get book with bookLog
// @route 	GET /api/book/auth/:id
// @access  Private
export const getBookByIdAuth = asyncHandler(async (req, res) => {
	const bookId = +req.params.id
	const userId = req.user.id

	const bookLog = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			userId: {
				equals: userId
			},
			bookId: {
				equals: bookId
			}
		},
		select: {
			bookLogs: true
		}
	})

	if (!bookLog.bookLogs[0]) {
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

	const book = await prisma.book.findUnique({
		where: {
			id: bookId
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			category: true,
			genre: true,
			publishDate: true,
			pages: true,
			bookLogs: {
				select: {
					userId: {
						equals: userId
					},
					bookId: {
						equals: bookId
					}
				},
				select: {
					id: true,
					userId: true,
					bookId: true,
					isCompleted: true,
					chaptersLogs: {
						select: {
							chapterId: true,
							isCompleted: true
						}
					}
				}
			},
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
			}
		}
	})

	if (!book) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json(book)
})

// @desc    Get books by category
// @route 	GET /api/book/category
// @access  Public
export const getBooksByCategory = asyncHandler(async (req, res) => {
	const { categories } = req.body

	const book = await prisma.book.findMany({
		where: {
			category: {
				hasSome: categories
			}
		},
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

// @desc    Get books by CreatedAt
// @route 	POST /api/book/all/created-at
// @access  Public
export const getBooksByCreatedAt = asyncHandler(async (req, res) => {
	const books = await prisma.book.findMany({
		orderBy: {
			createdAt: 'desc'
		},
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

	if (!books) {
		res.status(404)
		throw new Error('Books not found')
	}

	res.json(books)
})

// @desc    Get last created book
// @route 	POST /api/book/last
// @access  Public
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

// @desc    Get books by Rate
// @route 	POST /api/book/all/rating
// @access  Public
export const getBooksByRate = asyncHandler(async (req, res) => {
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
