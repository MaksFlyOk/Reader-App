/**
 * This function compares the filtering values when Submit is triggered and those stored in FilterState. If they are the same, then False, otherwise True.
 * @param {{category: number[], genre: number[], publish_date: [min: number, max: number], other: boolean}} filter
 * @param {{category: number[], genre: number[], publish_date: [min: number, max: number], other: boolean}} filterState
 * @returns {boolean} If they are the same, then False, otherwise True.
 */
export const isFilterChanged = (filter, filterState) => {
	const isEmptyFieldsOfFilter = []
	for (const key in filter) {
		if (key === 'category' || key === 'genre' || key === 'publish_date') {
			filter[key].toString() === filterState[key].toString()
				? isEmptyFieldsOfFilter.push(true)
				: isEmptyFieldsOfFilter.push(false)
		}

		if (key === 'other') {
			filter[key] === filterState[key]
				? isEmptyFieldsOfFilter.push(true)
				: isEmptyFieldsOfFilter.push(false)
		}
	}

	return !isEmptyFieldsOfFilter.includes(false)
}
