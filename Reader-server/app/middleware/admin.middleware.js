import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

export const admin = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId
			}
		})

		const admins = await prisma.user.findMany({
			where: {
				isAdmin: true
			},
			select: {
				isAdmin: true
			}
		})

		if (userFound && (admins.length === 0 || userFound.isAdmin === true)) {
			req.user = userFound
			next()
		} else {
			if (admins.length !== 0) {
				res.status(401)
				throw new Error(`You don't have admin rights`)
			}
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, I do not nave a token')
	}
})
