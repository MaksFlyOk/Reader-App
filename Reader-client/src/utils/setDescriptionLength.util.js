/**
 * This function shortens the length of the description if its length is greater than the specified value.
 * @param {string} description - This is a description of the book.
 * @param {number} maxLength - This is the maximum allowable length of the book description.
 * @returns {string} If the condition is true, it returns an abbreviated description in the "Description..." style, otherwise it returns the full description unchanged.
 */
export const setDescriptionLength = (description, maxLength) => {
	if (description.length > maxLength) {
		const shortDescription = description.split(' ')

		let sum = 0
		let i = 0
		for (i; i < shortDescription.length; i++) {
			if (sum < maxLength) {
				sum += shortDescription[i].length
			} else {
				break
			}
		}

		return shortDescription.slice(0, i).join(' ') + '...'
	}

	return description
}
