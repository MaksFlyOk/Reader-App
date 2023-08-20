import 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import path from 'path'
import adminRoutes from './app/admin/admin.routes.js'
import authRoutes from './app/auth/auth.routes.js'
import authorRoutes from './app/author/author.routes.js'
import bookRoutes from './app/book/book.routes.js'
import chapterRoutes from './app/chapter/chapter.routes.js'
import fileRoutes from './app/files/files.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'
import userRoutes from './app/user/user.routes.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())

	const __dirname = path.resolve()

	app.use(fileUpload({ extended: true, createParentPath: true }))

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

	app.use('/api/upload', fileRoutes)

	app.use('/api/auth', authRoutes)

	app.use('/api/user', userRoutes)

	app.use('/api/author', authorRoutes)

	app.use('/api/book', bookRoutes)

	app.use('/api/chapter', chapterRoutes)

	app.use('/api/admin', adminRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`☠️💀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
				.white.bold.underline
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
