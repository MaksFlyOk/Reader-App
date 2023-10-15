import asyncHandler from 'express-async-handler'
import { paginate } from 'paginate-prisma'

import { prisma } from '../prisma.js'

const notDetailedAuthorFields = {
	id: true,
	name: true,
	images: true,
	_count: {
		select: {
			books: true
		}
	}
}

/**
 * @description Get author by Id.
 * @request It is necessary to pass in req.params the author id.
 * @response As an answer, we get the author's data.
 *
 * @route GET /api/author/:id
 * @access Public
 */
export const getAuthorById = asyncHandler(async (req, res) => {
	/**
	 * @param {number} authorId - Author Id passed in req.params.
	 */
	const authorId = +req.params.id

	const author = await prisma.author.findUnique({
		where: {
			id: authorId
		},
		select: {
			id: true,
			name: true,
			images: true,
			rate: true,
			books: {
				select: {
					id: true,
					name: true,
					images: true,
					sumRate: true,
					rate: {
						select: {
							userId: true,
							rating: true
						}
					}
				}
			}
		}
	})

	if (!author) {
		res.status(404)
		throw new Error('Author not found')
	}

	res.json(author)
})

/**
 * @description Get authors by Rating (Top authors).
 * @request None.
 * @response As an answer we get an array of authors consisting of 7 first ranked authors.
 *
 * @route GET /api/author/all/rating/top-authors
 * @access Public
 */
export const getAuthorsByRating_TopAuthors = asyncHandler(async (req, res) => {
	const authors = await prisma.author.findMany({
		orderBy: {
			rate: 'desc'
		},
		take: 7,
		select: notDetailedAuthorFields
	})

	if (!authors) {
		res.status(404)
		throw new Error('Authors not found')
	}

	res.json(authors)
})

/**
 * @description Get authors by Rating (Pagination).
 * @request In req.params it is necessary to pass the page number.
 * @response As an answer will come a page with authors sorted by rating, number of books and date of last update, the number of authors in one page is 8.
 *
 * @route GET /api/author/all/rating/authors/page/:page
 * @access Public
 */
export const getAuthorsByRating_Pagination = asyncHandler(async (req, res) => {
	/**
	 * @param {number} page - The page number passed in req.params.
	 */
	const page = +req.params.page

	const authorsPage = await paginate(prisma.author)(
		{},
		{
			page: page,
			limit: 8
		},
		{
			orderBy: [
				{
					rate: 'desc'
				},
				{
					books: {
						_count: 'desc'
					}
				},
				{
					updatedAt: 'desc'
				}
			],
			select: notDetailedAuthorFields
		}
	)

	if (!authorsPage) {
		res.status(404)
		throw new Error('Authors not found')
	}

	res.json(authorsPage)
})
