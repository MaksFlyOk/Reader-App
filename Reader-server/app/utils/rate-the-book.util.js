export const rateTheBook = (rate, score, userId) => {
	const isFind = rate.findIndex(item => item.id === userId)

	if (isFind === -1) {
		return [...rate, { id: userId, score }]
	} else {
		rate[isFind] = { id: userId, score }
		return rate
	}
}
