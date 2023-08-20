import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc   Get user profile
// @route  GET /api/user/profile
// @access Private
export const getProfile = asyncHandler(async (req, res) => {
	const profile = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: {
			id: true,
			name: true,
			email: true,
			profileImage: true,
			readLater: {
				select: {
					id: true,
					name: true,
					author: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
			isAdmin: true,
			createdAt: true,
			BookLog: true
		}
	})

	if (!profile) {
		res.status(404)
		throw new Error('You are not authorized!')
	}

	res.json(profile)
})

// @desc   Get all users
// @route  GET /api/user/all
// @access Private
export const getAllUser = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany({
		orderBy: {
			createdAt: 'asc'
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
