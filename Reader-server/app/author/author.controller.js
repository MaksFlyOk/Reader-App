import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Add new author.
 * @request It is necessary to pass the author's name and images, if the image is not passed, but automatically replaced by a standard image.
 * @response As an answer, we get the author's data.
 *
 * @route POST /api/author
 * @access Admin
 */
export const addNewAuthor = asyncHandler(async (req, res) => {
	/**
	 * @type {{name: string, images: string}}
	 */
	const { name, images } = req.body

	const author = await prisma.author.create({
		data: {
			name,
			images
		}
	})

	res.json(author)
})

/**
 * @description Delete author.
 * @request It is necessary to pass to req.params the id of the author to be deleted.
 * @response As a response, we receive the author's data and a message to remove the author.
 *
 * @route DELETE /api/author/delete/:id
 * @access Admin
 */
export const deleteAuthor = asyncHandler(async (req, res) => {
	/**
	 * @param {number} authorId - Author Id passed in req.params.
	 */
	const authorId = +req.params.id

	const author = await prisma.author.delete({
		where: {
			id: authorId
		},
		select: {
			id: true,
			name: true,
			books: true
		}
	})

	if (!author) {
		res.status(404)
		throw new Error('Author not found')
	}

	res.json({ author, message: `Author with id:${req.params.id} delete!` })
})
