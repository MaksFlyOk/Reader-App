import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Edit user name.
 * @request Pass the new username.
 * @response As a response we get user data and a message about successful name change.
 *
 * @route PATCH /api/user/edit/name
 * @access Private
 */
export const editNameUser = asyncHandler(async (req, res) => {
	/**
	 * @type {{name: string}}
	 */
	const { name } = req.body

	const user = await prisma.user.update({
		where: {
			id: req.user.id
		},
		data: {
			name: name
		}
	})

	res.json({ user, message: 'Name successfully changed' })
})

/**
 * @description Edit user password.
 * @request Pass the new password and the user's current password.
 * @response As a response we receive user data and a message about successful password change.
 *
 * @route PATCH /api/user/edit/password
 * @access Private
 */
export const editPasswordUser = asyncHandler(async (req, res) => {
	/**
	 * @type {{password: string, newPassword: string}}
	 */
	const { password, newPassword } = req.body

	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		}
	})

	const isValidPassword = await verify(user.password, password)
	if (user && isValidPassword) {
		const user = await prisma.user.update({
			where: {
				id: req.user.id
			},
			data: {
				password: await hash(newPassword)
			}
		})

		res.json({ user, message: 'Password has been successfully changed' })
	} else {
		res.status(401)
		throw new Error('Password are not correct')
	}
})
