import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Granting admin rights.
 * @request Pass in req.params Id of the user to whom you want to give admin rights.
 * @response As a response we get user data and a message about granting or revoking admin rights.
 *
 * @route Patch /api/admin/grant/:id
 * @access Public && If there's no admin || Admin && If there's even one admin
 */
export const grantAdmin = asyncHandler(async (req, res) => {
	/**
	 * @param {number} userId - User Id passed in req.params.
	 */
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

	res.json({
		user,
		message: user.isAdmin
			? `The user with id: ${user.id} (${user.name}) now has administrator rights.`
			: `The user with id: ${user.id} (${user.name}) has now been stripped of admin rights.`
	})
})
