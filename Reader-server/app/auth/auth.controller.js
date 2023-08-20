import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { generateToken } from '../utils/generate-token.util.js'

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
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
		throw new Error('Email and password are not correct!')
	}
})

// @des 	 Register user
// @route  POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
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
		},
		select: {
			id: true,
			name: true,
			email: true,
			isAdmin: true
		}
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})

// @des 	 Delete user
// @route  POST /api/auth/delete
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.delete({
		where: {
			id: req.user.id
		},
		select: {
			id: true,
			name: true,
			email: true,
			isAdmin: true
		}
	})

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	res.json({ user, message: `User delete!` })
})
