import jwt from 'jsonwebtoken'

/**
 * This function generates a JWT Token.
 * @param {number} userId - This is the user id.
 */
export const generateToken = userId =>
	jwt.sign(
		{
			userId
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '10d'
		}
	)
