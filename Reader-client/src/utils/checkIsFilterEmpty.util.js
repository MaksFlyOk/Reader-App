/**
 * This function checks the object with the filter. If the object has standard filtering conditions, i.e. empty, without specified conditions, it returns True, otherwise it returns False.
 * @param {{category: array<number>, genre: array<number>, other: boolean, publish_date: [minDate: number, maxDate: number]}} filter - This is an object with filtering parameters.
 * @param {array} data - This is an array retrieved from the database, storing the maximum release date of the book and the minimum release date, respectively.
 * @returns {boolean} As a result, we check the array for True or False, the total values to check all filter fields and if there is at least one False, the values are set as False.
 */
export const isFilterEmpty = (filter, data) => {
	const isEmptyFieldsOfFilter = []
	for (const key in filter) {
		if (typeof filter[key] === 'object' && filter[key].length === 0) {
			isEmptyFieldsOfFilter.push(true)
		} else if (
			typeof filter[key] === 'object' &&
			filter[key].length !== 0 &&
			(filter[key][0] === data?.publishDatesRange?.at(0) ||
				filter[key][0] === undefined) &&
			(filter[key][1] === data?.publishDatesRange?.at(1) ||
				filter[key][1] === undefined)
		) {
			isEmptyFieldsOfFilter.push(true)
		} else if (typeof filter[key] === 'boolean' && filter[key] === false) {
			isEmptyFieldsOfFilter.push(true)
		} else {
			isEmptyFieldsOfFilter.push(false)
		}
	}

	return !isEmptyFieldsOfFilter.includes(false)
}
