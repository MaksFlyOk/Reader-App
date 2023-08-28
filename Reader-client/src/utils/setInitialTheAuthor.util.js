/**
 * This function sets the author's initials instead of the full name in case the full name length is greater than the given value.
 * @param {string} authorName - This is the author's full name.
 * @param {number} maxLength - This is the maximum allowable name length.
 * @returns {string} If the conditions match, returns the converted author name, otherwise the full author name.
 */
export const setInitialTheAuthor = (authorName, maxLength) => {
	if (authorName.length > maxLength && authorName.split(' ').length > 2) {
		const initialAuthor = authorName.split(' ').map((elem, index) => {
			if (index < 2) {
				elem = elem.substring(0, 1)
			}
			return elem
		})
		return initialAuthor[0] + '.' + initialAuthor[1] + '. ' + initialAuthor[2]
	}

	return authorName
}
