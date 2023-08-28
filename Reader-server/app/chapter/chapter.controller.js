import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Get chapters
// @route 	GET /api/chapters
// @access  Admin
export const getChapters = asyncHandler(async (req, res) => {
	const chapters = await prisma.chapter.findMany({
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			name: true,
			bookId: true,
			text: true
		}
	})

	if (!chapters) {
		res.status(404)
		throw new Error('Book not found')
	}

	res.json(chapters)
})

// @desc    Delete chapter
// @route 	POST /api/chapter/delete/:id
// @access  Admin
export const deleteChapterById = asyncHandler(async (req, res) => {
	const chapter = await prisma.chapter.delete({
		where: {
			id: +req.params.id
		},
		select: {
			id: true,
			name: true,
			bookId: true,
			text: true
		}
	})

	if (!chapter) {
		res.status(404)
		throw new Error('Chapter not found')
	}

	res.json({ ...chapter, message: 'Chapter deleted!' })
})
