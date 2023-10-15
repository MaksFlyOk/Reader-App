import { useEffect } from 'react'

export const useAlert = (error, setAlertShow) => {
	return useEffect(() => {
		if (error) {
			setAlertShow(true)
			let time = setTimeout(() => {
				setAlertShow(false)
				clearTimeout(time)
			}, 4000)
		}
	}, [error])
}
