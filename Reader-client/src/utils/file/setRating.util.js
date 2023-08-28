/**
 * This function allows you to calculate the rating for a book from the data received from the server.
 * @param {number} sumRate - This is the total sum of all grades.
 * @param {number} rateLength - This is the number of users who have given a rating.
 * @returns {string} The output is a string in the style "0.0".
 */
export const setRating = (sumRate, rateLength) => {
	let score = isNaN(sumRate / rateLength)
		? '0'
		: (sumRate / rateLength).toFixed(1)
	return String(score).split('.').length > 1 ? score : score + '.0'
}
