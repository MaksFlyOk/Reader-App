import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Add new author
// @route 	POST /api/author
// @access  Private
export const addNewAuthor = asyncHandler(async (req, res) => {
	const { name } = req.body

	const author = await prisma.author.create({
		data: {
			name
		},
		select: {
			id: true,
			name: true,
			books: true
		}
	})

	res.json(author)
})

// @desc    Delete author
// @route 	Post /api/author/delete/:id
// @access  Private
export const deleteAuthor = asyncHandler(async (req, res) => {
	const author = await prisma.author.delete({
		where: {
			id: +req.params.id
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
