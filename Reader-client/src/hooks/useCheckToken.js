import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { TOKEN } from '../app.constants'

import { useContextStates } from './useContextStates'

/**
 * This hook checks the user token, if it is missing change user authorization to false.
 * @hook
 */

export const useCheckToken = () => {
	const { isAuth, setIsAuth } = useContextStates()
	const { pathName } = useLocation()

	useEffect(() => {
		const token = Cookies.get(TOKEN)
		if (!token) setIsAuth(false)
	}, [isAuth, pathName])
}
