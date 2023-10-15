import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Get information on the genres and categories of all books, as well as the minimum and maximum publication date of the book.
 * @request None.
 * @response As an answer we get an object containing an array of categories, an array of genres and an array of two elements with minimum and maximum publication date.
 *
 * @route GET /api/book/all/categories-and-genres
 * @access Public
 */
export const getGenres_Categories_PublishDateRange = asyncHandler(
	async (req, res) => {
		const genres = await prisma.genre.findMany({
			orderBy: {
				id: 'desc'
			},
			select: {
				id: true,
				genre: true
			}
		})

		const categories = await prisma.category.findMany({
			orderBy: {
				id: 'desc'
			},
			select: {
				id: true,
				category: true
			}
		})

		const publishDates = await prisma.book.findMany({
			orderBy: {
				publishDate: 'asc'
			},
			select: {
				publishDate: true
			}
		})

		if (!genres && !categories && !publishDates) {
			res.status(404)
			throw new Error('Not found')
		}

		res.json({
			categories,
			genres,
			publishDatesRange: [
				publishDates[0].publishDate,
				publishDates.at(-1).publishDate
			]
		})
	}
)
