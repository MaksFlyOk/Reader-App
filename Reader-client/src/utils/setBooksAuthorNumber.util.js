/**
 * This is a function to format the number of books by the author - format "00".
 * @param {number} number - This is the number of books by the author, data from the database.
 * @returns {string} Return the string in the format "00".
 */
export const setBookAuthorNumber = number => {
	if (String(number).length < 2) {
		return `0${number}`
	}

	return `${number}`
}
