export const isUser = (allRate, userId) => {
	return allRate.rate.map(elem => elem.userId).includes(userId)
}
