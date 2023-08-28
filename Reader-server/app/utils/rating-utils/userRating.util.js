export const userRating = (allRate, userId) => {
	return allRate.rate[allRate.rate.findIndex(elem => elem.userId === userId)]
		.rating
}
