import asyncHandler from 'express-async-handler'

import { addBookId } from '../utils/add-book-author.util.js'
import { deleteBookId } from '../utils/delete-book-author.util.js'

import { prisma } from '../prisma.js'

const selectFields = {
	id: true,
	name: true,
	books: {
		select: {
			id: true,
			name: true
		}
	}
}

/**
 * @description Add to the author of the book.
 * @request It is necessary to pass in req.params the author id and pass bookId - book id.
 * @response As an answer, we get the author's data.
 *
 * @route PATCH /api/author/book/add:id
 * @access Admin
 */
export const addAuthorBook = asyncHandler(async (req, res) => {
	/**
	 * @param {number} authorId - Author Id passed in req.params.
	 */
	const authorId = +req.params.id

	/**
	 * @type {{bookId: number}}
	 */
	const { bookId } = req.body

	const isBook = await prisma.book.findUnique({
		where: {
			id: bookId
		}
	})

	if (!isBook) {
		res.status(404)
		throw new Error('Book not found')
	}

	const authorBooks = await prisma.author.findUnique({
		where: {
			id: authorId
		},
		select: {
			books: true
		}
	})

	if (addBookId(authorBooks, bookId) === true) {
		res.status(404)
		throw new Error(`There's already a book like this`)
	}

	const author = await prisma.author.update({
		where: {
			id: authorId
		},
		data: {
			books: {
				connect: addBookId(authorBooks, bookId).map(id => ({ id: +id }))
			}
		},
		select: selectFields
	})

	if (!author) {
		res.status(404)
		throw new Error('Author not found')
	}

	res.json(author)
})

/**
 * @description Delete to the author of the book.
 * @request It is necessary to pass in req.params the author id and pass bookId - book id.
 * @response As an answer, we get the author's data.
 *
 * @route PATCH /api/author/book/delete/:id
 * @access Admin
 */
export const deleteAuthorBook = asyncHandler(async (req, res) => {
	/**
	 * @param {number} authorId - Author Id passed in req.params.
	 */
	const authorId = +req.params.id

	/**
	 * @type {{bookId: number}}
	 */
	const { bookId } = req.body

	const authorBooks = await prisma.author.findUnique({
		where: {
			id: authorId
		},
		select: {
			books: true
		}
	})

	if (deleteBookId(authorBooks, bookId)) {
		res.status(404)
		throw new Error('There is no such book by this author')
	}

	const author = await prisma.author.update({
		where: {
			id: authorId
		},
		data: {
			books: {
				set: deleteBookId(authorBooks, bookId).map(id => ({ id: +id }))
			}
		},
		select: selectFields
	})

	res.json(author)
})
