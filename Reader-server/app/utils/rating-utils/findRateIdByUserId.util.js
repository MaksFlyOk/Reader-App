export const findRateIdByUserId = (allRate, userId) => {
	return allRate.rate.findIndex(elem => elem.userId === userId)
}
