import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc   Edit user name
// @route  PATCH /api/user/edit/name
// @access Private
export const editNameUser = asyncHandler(async (req, res) => {
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

// @desc   Edit user password
// @route  GET /api/user/edit/password
// @access Private
export const editNamePassword = asyncHandler(async (req, res) => {
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
		throw new Error('Password are not correct!')
	}
})
