import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Get user profile.
 * @request The id of the authorized user is passed.
 * @response As a response, we get the profile of an authorized user.
 *
 * @route GET /api/user/profile
 * @access Private
 */
export const getProfile = asyncHandler(async (req, res) => {
	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const profile = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			name: true,
			email: true,
			profileImage: true,
			isAdmin: true,
			createdAt: true
		}
	})

	if (!profile) {
		res.status(404)
		throw new Error('You are not authorized!')
	}

	res.json(profile)
})

/**
 * @description Get a list of read later user.
 * @request The id of the authorized user is passed.
 * @response As a response, we get a list of read later authorized user.
 *
 * @route GET /api/user/profile/read-later
 * @access Private
 */
export const getReadLaterList = asyncHandler(async (req, res) => {
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

	if (!readLater) {
		res.status(404)
		throw new Error('You are not authorized!')
	}

	if (readLater.length === 0) {
		res.json(false)
	}

	let listReadLaterBooks

	if (readLater.length < 2) {
		listReadLaterBooks = await prisma.book.findUnique({
			where: {
				id: readLater[0]
			},
			select: {
				id: true,
				name: true,
				genre: true,
				sumRate: true,
				images: true,
				author: {
					select: {
						id: true,
						name: true
					}
				},
				rate: true
			}
		})

		listReadLaterBooks = [listReadLaterBooks]
	} else {
		listReadLaterBooks = await prisma.book.findMany({
			where: {
				id: { in: readLater }
			},
			select: {
				id: true,
				name: true,
				genre: true,
				sumRate: true,
				images: true,
				author: {
					select: {
						id: true,
						name: true
					}
				},
				rate: true
			}
		})
	}

	res.json(
		listReadLaterBooks.sort(
			(a, b) => readLater.indexOf(a.id) - readLater.indexOf(b.id)
		)
	)
})

/**
 * @description Get all users.
 * @request None
 * @response As an answer we get a list of all users.
 *
 * @route GET /api/user/all
 * @access Admin
 */
export const getAllUser = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			email: true,
			isAdmin: true
		}
	})

	if (!users) {
		res.status(404)
		throw new Error('The users array is empty...')
	}

	res.json(users)
})
