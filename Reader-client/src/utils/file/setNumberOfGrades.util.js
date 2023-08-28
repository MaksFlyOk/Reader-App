/**
 * This function to convert the number of rated users to "000".
 * @param {number} rateLength - This is the number of users who have given a rating.
 * @returns {string} We get a string in the format "000".
 */
export const setNumberOfGrades = rateLength => {
	switch (String(rateLength).length) {
		case 1:
			return '00' + String(rateLength)
		case 2:
			return '0' + String(rateLength)
		default:
			return String(rateLength)
	}
}
