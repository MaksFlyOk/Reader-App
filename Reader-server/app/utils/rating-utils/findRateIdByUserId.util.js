/**
 * This function checks if the user has a rating for a particular book.
 * @param {array<{userId: number, rating: number}>} allRate - This is an array of all of the book's grades.
 * @param {number} userId
 * @returns {number} - Returns the index of the book.
 */
export const findRateIdByUserId = (allRate, userId) => {
	return allRate.rate.findIndex(elem => elem.userId === userId)
}
