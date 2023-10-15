import { useEffect } from 'react'

/**
 * This hook places an Event Listener ("scroll") on the document useEffect.
 * @hook
 *
 * @param {function} func - This is a function performed by the Listener.
 * @returns Hook useEffect.
 */
export const useSetScrollHandlerEffect = func =>
	useEffect(() => {
		document.addEventListener('scroll', func)

		return function () {
			document.removeEventListener('scroll', func)
		}
	})
