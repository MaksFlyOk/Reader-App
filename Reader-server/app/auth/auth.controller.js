import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { generateToken } from '../utils/generate-token.util.js'

import { prisma } from '../prisma.js'

/**
 * @description Login user.
 * @request The email and password need to be transferred.
 * @response We receive user data and a unique Token as a response.
 *
 * @route POST /api/auth/login
 * @access Public
 */
export const authUser = asyncHandler(async (req, res) => {
	/**
	 * @type {{email: string, password: string}}
	 */
	const { email, password } = req.body

	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})

	const isValidPassword = await verify(user.password, password)
	if (user && isValidPassword) {
		const token = generateToken(user.id)
		res.json({ user, token })
	} else {
		res.status(401)
		throw new Error('Email and password are not correct')
	}
})

/**
 * @description Register user.
 * @request Email, password and name need to be passed on.
 * @response We receive user data and a unique Token as a response.
 *
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
	/**
	 * @type {{name: string, email: string, password: string}}
	 */
	const { name, email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('Email already exists')
	}

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: await hash(password)
		}
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})

/**
 * @description Delete user.
 * @request The id of the authorized user is passed.
 * @response As a response we get user data and a message about deleting the user.
 *
 * @route DELETE /api/auth/delete
 * @access Private
 */
export const deleteUser = asyncHandler(async (req, res) => {
	/**
	 * @type {number} The id of the authorized user is passed.
	 */
	const userId = req.user.id

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			Ratings: true
		}
	})

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	if (user.Ratings.length !== 0) {
		for (const bookRating of user.Ratings) {
			await prisma.book.updateMany({
				where: {
					id: bookRating.bookId
				},
				data: {
					sumRate: {
						decrement: +bookRating.rating
					}
				}
			})
		}
	}

	await prisma.user.delete({
		where: {
			id: userId
		}
	})

	res.json({
		user,
		message: `The user account with id: ${user.id} (${user.name}) has been deleted.`
	})
})
