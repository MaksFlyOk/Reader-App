/**
 * The function that simply translates a UTC date into a regular date of the format dd.mm.yyyy.
 * @param {String} date - This is the date that comes from the backend in UTC format.
 * @returns {String} Return the string, date in the format dd.mm.yyyy.
 */

export const dateRegister = date => {
	let arrDate = date.substring(0, 10).split('-')
	return [arrDate[2], arrDate[1], arrDate[0]].join('.')
}
