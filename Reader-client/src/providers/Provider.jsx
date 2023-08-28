import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

import { TOKEN } from '../app.constants'

export const Context = createContext()

/**
 * Context component. This is the component into which the whole application will be wrapped, it is used to get the global state.
 * @component
 * @typedef PropType
 * @property {component} children - The entire application will be swiped.
 *
 * @param {PropType} props
 * @returns JSX component Context.
 */
const Provider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN))
	const [isAdmin, setIsAdmin] = useState(false)

	return (
		<Context.Provider value={{ isAuth, setIsAuth, isAdmin, setIsAdmin }}>
			{children}
		</Context.Provider>
	)
}

Provider.propTypes = {
	children: PropTypes.element
}

export default Provider
