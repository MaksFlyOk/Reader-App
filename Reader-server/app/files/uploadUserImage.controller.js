import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/**
 * @description Upload user image.
 * @request Transferring a file, an image.
 * @response As a response we get an object with information about the request. Status, a message that the file has been downloaded, as well as file data, name, type and size.
 *
 * @route POST /api/upload/profileImage
 * @access Private
 */
export const uploadUserProfileImage = asyncHandler(async (req, res) => {
	try {
		if (!req.files) {
			res.json({
				message: 'No file uploaded'
			})
		} else {
			let file = req.files.file

			file.mv(`./uploads/users/${req.user.id}/` + file.name)

			await prisma.user.update({
				where: {
					id: req.user.id
				},
				data: {
					profileImage: `/uploads/users/${req.user.id}/${file.name}`
				}
			})

			res.json({
				status: true,
				message: 'File is uploaded',
				data: {
					name: file.name,
					mimetype: file.mimetype,
					size: file.size
				}
			})
		}
	} catch (err) {
		res.status(500).json({ message: 'Upload error' })
	}
})
