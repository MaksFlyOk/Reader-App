import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Add new book.
 * @request Need to transfer title, description, cover, genre, publication date, categories, number of pages. If you do not pass the image, it will be replaced by a standard image.
 * @response The book data will be passed as the response.
 *
 * @route POST /api/book
 * @access Admin
 */
export const addNewBook = asyncHandler(async (req, res) => {
	/**
	 * @type {{name: string, description: string, images: string, genre: string, publishDate: number, category: array<string>, pages: number}}
	 */
	const { name, description, images, genre, publishDate, category, pages } =
		req.body

	if (category.length > 2) {
		res.status(404)
		throw new Error('At most there can only be two categories')
	}

	const book = await prisma.book.create({
		data: {
			name,
			description,
			images,
			genre: {
				connectOrCreate: {
					where: { genre: genre },
					create: { genre: genre }
				}
			},
			publishDate,
			category: {
				connectOrCreate: [
					{
						where: { category: category[0] },
						create: { category: category[0] }
					},
					{
						where: { category: category[1] },
						create: { category: category[1] }
					}
				]
			},
			pages
		}
	})

	res.json(book)
})

/**
 * @description Delete book.
 * @request Pass in req.params the id of the book to be deleted.
 * @response The book data and a delete message will be transmitted as a response.
 *
 * @route DELETE /api/book/delete/:id
 * @access Admin
 */
export const deleteBookById = asyncHandler(async (req, res) => {
	/**
	 * @param {number} bookId - Book Id passed in req.params.
	 */
	const bookId = +req.params.id

	const book = await prisma.book.delete({
		where: {
			id: bookId
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
