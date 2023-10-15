/**
 * This function returns the grade of the book given by the user.
 * @param {array<{userId: number, rating: number}>} allRate
 * @param {number} userId
 * @returns {number}
 */
export const userRating = (allRate, userId) => {
	return allRate.rate[allRate.rate.findIndex(elem => elem.userId === userId)]
		.rating
}
