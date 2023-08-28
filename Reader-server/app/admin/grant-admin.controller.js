import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc   Granting admin rights
// @route  Patch /api/admin/grant/:id
// @access Public && If there's no admin || Admin && If there's even one admin
export const grantAdmin = asyncHandler(async (req, res) => {
	const userId = +req.params.id

	const { isAdmin } = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: {
			isAdmin: true
		}
	})

	if (isAdmin === undefined) {
		res.status(404)
		throw new Error('User not found')
	}

	const user = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			isAdmin: !isAdmin
		},
		select: {
			id: true,
			name: true,
			email: true,
			isAdmin: true
		}
	})

	res.json(user)
})
