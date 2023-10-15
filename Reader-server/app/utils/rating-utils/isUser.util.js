/**
 * This function checks if a user is in the list of users who have rated a particular book.
 * @param {array<{userId: number, rating: number}>} allRate
 * @param {number} userId
 * @returns {boolean}
 */
export const isUser = (allRate, userId) => {
	return allRate.rate.map(elem => elem.userId).includes(userId)
}
