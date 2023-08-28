export const setReadTime = pages => {
	let time1 = pages * 2
	let time2 = pages * 3
	if (time2 > 60 && time1 > 60) {
		return `${(time1 / 60).toFixed(0)}-${(time2 / 60).toFixed(0)} hr`
	} else if (time2 > 60 && time1 < 60) {
		return `${(time1 / 60).toFixed(0)} min - ${(time2 / 60).toFixed(0)} hr`
	} else {
		return `${time1}-${time2} min`
	}
}
